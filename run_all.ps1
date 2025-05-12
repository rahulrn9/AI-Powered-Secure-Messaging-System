# run_all.ps1
Write-Host "=== Installing Dependencies ==="
npm install
pip install --upgrade scikit-learn flask boto3 pillow pycryptodome pytest --user

Write-Host "`n=== Running JavaScript Modules ==="
node src/encryption/encryption.js
node src/ai/contextSuggestions.js
node src/blockchain/blockchain.js
node src/p2p/p2p_network.js
node src/privacy_mode/privacy_mode.js
node src/dynamic_fingerprint/dynamic_fingerprint.js
node src/behavioral_biometrics/behavioral_biometrics.js

Write-Host "`n=== Running Python Modules ==="
python src/anomalyDetection/anomalyDetection.py
python src/self_learning_encryption/self_learning_encryption.py

# Inline calls for small stubs:
python - <<EOF
from src.post_delivery_deletion.post_delivery_deletion import delete_key
delete_key('testKey', {'testKey':'dummy'})
EOF

python - <<EOF
from src/cloud_backup.cloud_backup import backup
backup('my-bucket','test.obj',b'hello world')
EOF

python - <<EOF
from datetime import datetime
from src.temporal_key_validity.temporal_key_validity import is_valid
print("Key valid?", is_valid(datetime.utcnow()))
EOF

python - <<EOF
from src.zero_knowledge.zero_knowledge import gen, verify
p = gen('secret'); print("ZKP verify?", verify(p,'challenge'))
EOF

python - <<EOF
from src/threat_intel.threat_intel import block_if_malicious
block_if_malicious('1.2.3.4', {'1.2.3.4'})
EOF

python src/qkd_simulation/qkd_simulation.py
python src/steganography/steganography.py

# The honeypot will run as a long-running service;  
# if you don’t want to block the script, comment out this line:
# flask --app src/honeypot/honeypot.py run --port 8888

python src/offline_messaging/offline_messaging.py
python src/risk_scoring/risk_scoring.py

Write-Host "`n=== Running Test Suites ==="
npm test -- --passWithNoTests
pytest --maxfail=1 --disable-warnings
