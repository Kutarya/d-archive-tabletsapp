"""Compatibility entry point for the syntax-aware native adapter."""
from pathlib import Path
import subprocess
root=Path(__file__).resolve().parents[1]
subprocess.run(["node",str(root/"scripts/patch_app.cjs")],cwd=root,check=True)
