@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found in PATH.
  echo Please install Node.js, then run this file again.
  pause
  exit /b 1
)

set "SOURCE=Dataset\Description_example.json"
set "INDEX=Dataset\example_embeddings.json"
set "NEED_RAG_BUILD=0"

if not exist "%INDEX%" (
  set "NEED_RAG_BUILD=1"
) else (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "if ((Get-Item -LiteralPath '%SOURCE%').LastWriteTime -gt (Get-Item -LiteralPath '%INDEX%').LastWriteTime) { exit 1 } else { exit 0 }" >nul 2>nul
  if errorlevel 1 set "NEED_RAG_BUILD=1"
)

if "%NEED_RAG_BUILD%"=="1" (
  echo Building RAG embedding index with DashScope...
  node prompt\build_example_embeddings.js
  if errorlevel 1 (
    echo.
    echo RAG embedding index build failed. Please check DASHSCOPE_API_KEY in .env.
    pause
    exit /b 1
  )
  echo RAG embedding index is ready.
)

start "AIWardrobe local server" cmd /k node server.js
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4173"
