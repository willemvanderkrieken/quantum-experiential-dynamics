import pyreadr, math
import statistics as st

B='/sessions/great-determined-einstein/mnt/AI-autonome-system/data/empirie/EmotionTimeSeries-master/DataClean/'

DATASETS=[
 ('Bringmann2013','Bringmann2013/data_Bringmann2013.RDS',['Excited','Worried','Anxious','Sad','Relaxed'],['dayno','beepno']),
 ('Bringmann2016','Bringmann2016/data_Bringmann2016.RDS',['Angry','Depressed','Dysphoric','Anxious','Relaxed','Happy'],[]),
 ('Rowland2020','Rowland2020/data_Rowland2020.RDS',['happy','excited','relaxed','satisfied','angry','anxious','depressed','sad'],['dayno','beep']),
 ('Wright2017','Wright2017/data_Wright2017.RDS',['Afraid','Ashamed','Distressed','Guilty','Hostile','Irritable','Jittery','Nervous'],['day','beep']),
 ('Fisher2017','Fisher2017/data_Fisher2017.RDS',['energetic','enthusiastic','content','irritable','restless','worried','guilty','afraid','angry','hopeless','down','positive'],[]),
 ('Fried2021','Fried2021/data_Fried2021.RDS',['Relax','Irritable','Worry','Nervous','Anhedonia','Angry'],['dayvar','beepvar']),
]
# Vrijen2018 uitgesloten: hergebruik vereist toestemming van de auteurs.

def autocorr(xs):
    n=len(xs)
    if n<10: return None
    m=sum(xs)/n
    var=sum((v-m)**2 for v in xs)
    if var==0: return None
    num=sum((xs[i]-m)*(xs[i+1]-m) for i in range(n-1))
    return num/var

def pearson(x,y):
    mx,my=st.mean(x),st.mean(y)
    num=sum((a-mx)*(b-my) for a,b in zip(x,y))
    den=math.sqrt(sum((a-mx)**2 for a in x)*sum((b-my)**2 for b in y))
    return num/den if den else 0

print('%-15s %5s | inertie: gem [bereik]      | r(inertie, variabiliteit)' % ('dataset','pp'))
alle_inert=[]; alle_rs=[]
for naam,pad,items,sortcols in DATASETS:
    df=list(pyreadr.read_r(B+pad).values())[0]
    personen=[]
    for sid,gr in df.groupby('subj_id'):
        if sortcols: gr=gr.sort_values(sortcols)
        acs=[]; sds=[]
        for it in items:
            if it not in gr.columns: continue
            xs=gr[it].dropna().tolist()
            if len(xs)<20: continue
            ac=autocorr(xs)
            if ac is None: continue
            m=sum(xs)/len(xs)
            sd=math.sqrt(sum((v-m)**2 for v in xs)/len(xs))
            # normaliseer sd op de schaalbreedte van het item binnen deze dataset
            rng=df[it].max()-df[it].min()
            if rng>0:
                acs.append(ac); sds.append(sd/rng)
        if len(acs)>=3:
            personen.append({'inert':st.mean(acs),'sd':st.mean(sds)})
    if len(personen)<8:
        print('%-15s %5d | te weinig personen' % (naam,len(personen))); continue
    iv=[p['inert'] for p in personen]; sv=[p['sd'] for p in personen]
    r=pearson(iv,sv)
    alle_inert.extend(iv); alle_rs.append((r,len(personen)))
    print('%-15s %5d | %5.2f [%5.2f .. %4.2f] | r = %+.2f' % (naam,len(personen),st.mean(iv),min(iv),max(iv),r))

wt=sum(n for _,n in alle_rs)
print()
print('MENS totaal: %d personen | inertie gem %.2f, 10e-90e percentiel: %.2f .. %.2f' % (
    len(alle_inert),st.mean(alle_inert),sorted(alle_inert)[int(len(alle_inert)*0.1)],sorted(alle_inert)[int(len(alle_inert)*0.9)]))
print('MENS gewogen r(inertie, variabiliteit) = %+.2f' % (sum(r*n for r,n in alle_rs)/wt))
print()
print('MODEL (na retentie-term): inertie 0.21 .. 0.55 | observabele r(inertie, sd) = +0.29')
