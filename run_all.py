#!/usr/bin/env python
import subprocess
import sys

def sh(cmd):
    """Run a shell command on any OS, printing it first."""
    command_str = " ".join(cmd)
    print(f"\n$ {command_str}")
    # Use shell=True so Windows can find npm, pip, etc.
    subprocess.run(command_str, shell=True, check=True)

def main():
    # 1. Install dependencies
    sh(["npm", "install"])
    sh([sys.executable, "-m", "pip", "install",
        "--upgrade",
        "scikit-learn", "flask", "boto3",
        "pillow", "pycryptodome", "pytest"
    ])

    # 2. Run JavaScript modules
    js_cmds = [
        ["node", "src/encryption/encryption.js"],
        ["node", "src/ai/contextSuggestions.js"],
        ["node", "src/blockchain/blockchain.js"],
        ["npm", "run", "start:p2p"],
        ["node", "src/privacy_mode/privacy_mode.js"],
        ["node", "src/dynamic_fingerprint/dynamic_fingerprint.js"],
        ["node", "src/behavioral_biometrics/behavioral_biometrics.js"],
    ]
    for cmd in js_cmds:
        sh(cmd)

    # 3. Run Python modules
    py_cmds = [
        ["python", "src/anomalyDetection/anomalyDetection.py"],
        ["python", "src/self_learning_encryption/self_learning_encryption.py"],
        ["python", "src/qkd_simulation/qkd_simulation.py"],
        ["python", "src/steganography/steganography.py"],
        ["python", "src/offline_messaging/offline_messaging.py"],
        ["python", "src/risk_scoring/risk_scoring.py"],
    ]
    for cmd in py_cmds:
        sh(cmd)

    # 4. Inline one-offs
    sh(["python", "-c",
        "from src.post_delivery_deletion.post_delivery_deletion import delete_key; "
        "delete_key('testKey', {'testKey':'dummy'})"
    ])
    sh(["python", "-c",
        "from src.cloud_backup.cloud_backup import backup; "
        "backup('my-bucket','test.obj', b'hello world')"
    ])
    sh(["python", "-c",
        "from datetime import datetime; "
        "from src.temporal_key_validity.temporal_key_validity import is_valid; "
        "print('Key valid?', is_valid(datetime.utcnow()))"
    ])
    sh(["python", "-c",
        "from src.zero_knowledge.zero_knowledge import gen, verify; "
        "p = gen('secret'); print('ZKP ok?', verify(p,'challenge'))"
    ])
    sh(["python", "-c",
        "from src/threat_intel.threat_intel import block_if_malicious; "
        "block_if_malicious('1.2.3.4', {'1.2.3.4'})"
    ])

    # 5. Tests
    sh(["npm", "test", "--", "--passWithNoTests"])
    sh(["pytest", "--maxfail=1", "--disable-warnings"])

if __name__ == "__main__":
    main()
