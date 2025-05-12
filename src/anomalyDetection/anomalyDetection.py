from sklearn.ensemble import IsolationForest
import numpy as np

data = np.array([[1,5],[2,3],[3,6],[4,7],[5,8]])
model = IsolationForest().fit(data)
print('Anomaly:', model.predict([[2,4]]) == -1)
