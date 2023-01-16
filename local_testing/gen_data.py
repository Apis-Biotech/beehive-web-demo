import random
import json

data = []


for i in range(2,7):
    for j in range(60):
        d = (i*0.1) + random.uniform(-0.1, 0.01)

        if j == 0:
            new = True
        else:
            new = False

        data.append({"hive_name":"test1", "data_point": d, "new_reading": new})


with open("new.json", "w") as f:
    for d in data:
        f.write(json.dumps(d))
        f.write("\n")




