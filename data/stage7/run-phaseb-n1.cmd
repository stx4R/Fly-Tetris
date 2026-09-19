@echo off
cd /d C:\fly
echo RUNNER START %DATE% %TIME% >> data\stage7\phaseb-n1.log
node scripts\train-phaseb.js --teacher 1ply-hold-garbage --force-phase-b --only N1 >> data\stage7\phaseb-n1.log 2>&1
echo EXIT %ERRORLEVEL% %DATE% %TIME% >> data\stage7\phaseb-n1.log
