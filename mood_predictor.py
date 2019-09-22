import sys


text=sys.argv[1]

dict={
    'Happy':['not sad','happy','cheerful','contented','delighted','ecstatic','elated','glad','joyful','joyous','jubilant','lively','good','light'],
    'Sad':['not good','sad','low','depressed','bitter','dismal','heartbroken','melancholy','mournful','pessimistic','somber','sorrowful','sorry','wistful','not happy','not cheerful','not contented','not delighted','not ecstatic','not elated','not glad','not joyful','not joyous','not jubilant','not lively','not good','not light'],
    'Angry':['angry','annoyed','bitter','enraged','exasperated','furious','heated','impassioned','indignant','irate','irritable','irritated']

}

for emo,val in dict.items():    # for name, age in dictionary.iteritems():  (for Python 2.x)
    for i in val:
        if(i in text):
            print(emo)
            break
sys.stdout.flush()
