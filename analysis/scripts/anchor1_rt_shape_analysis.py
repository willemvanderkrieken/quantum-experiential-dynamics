import csv, math, os
import statistics as st

BASE = '/sessions/great-determined-einstein/mnt/AI-autonome-system/data/empirie/OSF data/'

def skew(a):
    m = st.mean(a); s = st.stdev(a)
    return sum((x-m)**3 for x in a)/len(a)/s**3 if s > 0 else 0

def pearson(x, y):
    mx, my = st.mean(x), st.mean(y)
    num = sum((a-mx)*(b-my) for a, b in zip(x, y))
    den = math.sqrt(sum((a-mx)**2 for a in x)*sum((b-my)**2 for b in y))
    return num/den if den else 0

CONFIGS = [
    ('data_Adler_2018_Expt1.csv', 'RT_decConf', 'Difficulty', 'hoger=moeilijker'),
    ('data_Adler_2018_Expt2.csv', 'RT_dec', 'Difficulty', 'hoger=moeilijker'),
    ('data_Adler_2018_Expt3.csv', 'RT_decConf', 'Difficulty', 'hoger=moeilijker'),
    ('data_Arbuzova_2021_expt1.csv', 'RT_dec', None, None),
    ('data_Bang_2019_Exp1.csv', 'RT_dec', None, None),
    ('data_Hellmann_2023_Exp2.csv', 'RT_decConf', 'Coherence', 'hoger=makkelijker'),
]

alle_pp = []
vorm = [0, 0]

def verwerk(fname, rtcol, diffcol, coding, subjcol='Subj_idx'):
    path = BASE + fname
    if not os.path.exists(path): return
    per = {}; diffs = {}
    with open(path, encoding='utf-8-sig') as f:
        for row in csv.DictReader(f):
            try: v = float(row[rtcol])
            except Exception: continue
            if not (0.15 < v < 30): continue
            per.setdefault(row[subjcol], []).append(v)
            if diffcol:
                try:
                    d = round(float(row[diffcol]), 3)
                    diffs.setdefault(d, []).append(v)
                except Exception: pass
    pool = [v for a in per.values() for v in a]
    if len(pool) < 100: return
    lp = [math.log(v) for v in pool]
    label = fname.replace('data_','').replace('.csv','')+('' if rtcol.count('_')<2 else ' '+rtcol)
    n_pp = 0
    for s, a in per.items():
        if len(a) < 60: continue
        l = [math.log(v) for v in a]
        d = {'ds': label, 'med': st.median(a), 'sr': skew(a), 'sl': skew(l),
             'sd_log': st.stdev(l), 'tail': sorted(a)[int(len(a)*0.95)]/st.median(a)}
        alle_pp.append(d); n_pp += 1
        vorm[1] += 1
        if abs(d['sl']) < abs(d['sr'])/2: vorm[0] += 1
    difftxt = '-'
    if diffs and len(diffs) > 2:
        niveaus = sorted(diffs)
        meds = [st.median(diffs[n]) for n in niveaus]
        r = pearson(list(range(len(niveaus))), meds)
        difftxt = 'r(niveau,medRT)=%+.2f (%s)' % (r, coding)
    print('%-34s %6d %4d | %5.1f -> %5.2f | %s' % (label, len(pool), n_pp, skew(pool), skew(lp), difftxt))

print('%-34s %6s %4s | %-16s | %s' % ('dataset','trials','pp','skew ruw->log','moeilijkheid'))
for c in CONFIGS: verwerk(*c)
verwerk('data_Konishi_2019.csv', 'RT_dec_Motion', 'Coherence_Motion', 'hoger=makkelijker')
verwerk('data_Konishi_2019.csv', 'RT_dec_Color', 'Difficulty_Color', 'codering onbekend')

print()
print('=== VORM: log-transformatie halveert scheefheid bij %d/%d proefpersonen ===' % tuple(vorm))
print()
print('=== INDIVIDUELE VERSCHILLEN (binnen dataset) ===')
per_ds = {}
for p in alle_pp: per_ds.setdefault(p['ds'], []).append(p)
rs_t = []; rs_s = []
for ds, ps in sorted(per_ds.items()):
    if len(ps) < 8: continue
    med = [p['med'] for p in ps]
    r1 = pearson(med, [p['tail'] for p in ps])
    r2 = pearson(med, [p['sd_log'] for p in ps])
    rs_t.append((r1, len(ps))); rs_s.append((r2, len(ps)))
    print('%-34s n_pp=%3d  r(med,staart)=%+.2f  r(med,sd_log)=%+.2f' % (ds, len(ps), r1, r2))
if rs_t:
    wt = sum(n for _, n in rs_t)
    print()
    print('GEWOGEN GEMIDDELD over %d proefpersonen: r(med,staart)=%+.2f  r(med,sd_log)=%+.2f' % (
        wt, sum(r*n for r, n in rs_t)/wt, sum(r*n for r, n in rs_s)/wt))
