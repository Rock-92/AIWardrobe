@echo off
setlocal
cd /d "%~dp0.."
python ".\qwen_tools\qwen_probe.py" all --timeout 12
echo.
pause
