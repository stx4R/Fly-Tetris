@echo off
rem 7단계 Phase B 체인 — 지금 돌고 있는 N1 이 끝나기를 기다렸다가 N1(이어하기) → N2 → N3 를 순차 실행한다.
rem  * train-phaseb.js 는 data/stage7-n{i}.json 이 있으면 그 모델을 건너뛴다 → 끝난 것은 즉시 통과.
rem  * N1 이 중간에 죽었으면 라운드 체크포인트에서 이어서 마친 뒤 N2 로 넘어간다.
rem  * 한 모델이 실패해도 다음 모델은 돌린다 (실패는 로그의 EXIT 코드로 남는다).
rem
rem 주의: 대기 판정에 `find /c` 를 쓰면 안 된다 — /c 는 매치가 0 이어도 errorlevel 0 을 돌려줘서
rem 대기를 건너뛰고 N1 을 중복 실행한다 (2026-09-19 실제로 발생). findstr 은 매치 없으면 1 을 돌려준다.
cd /d C:\fly

echo CHAIN START %DATE% %TIME% >> data\stage7\phaseb-n23.log

:wait
if exist data\stage7-n1.json goto go
if not exist data\stage7\phaseb-n1.log goto sleep
findstr /c:"EXIT " data\stage7\phaseb-n1.log >nul 2>&1
if not errorlevel 1 goto go
:sleep
ping -n 61 127.0.0.1 >nul
goto wait

:go
echo CHAIN: N1 종료 감지 %DATE% %TIME% >> data\stage7\phaseb-n23.log

echo CHAIN N1 (resume) %DATE% %TIME% >> data\stage7\phaseb-n23.log
node scripts\train-phaseb.js --teacher 1ply-hold-garbage --force-phase-b --only N1 >> data\stage7\phaseb-n23.log 2>&1
echo EXIT-N1 %ERRORLEVEL% %DATE% %TIME% >> data\stage7\phaseb-n23.log

echo CHAIN N2 %DATE% %TIME% >> data\stage7\phaseb-n23.log
node scripts\train-phaseb.js --teacher 1ply-hold-garbage --force-phase-b --only N2 >> data\stage7\phaseb-n23.log 2>&1
echo EXIT-N2 %ERRORLEVEL% %DATE% %TIME% >> data\stage7\phaseb-n23.log

echo CHAIN N3 %DATE% %TIME% >> data\stage7\phaseb-n23.log
node scripts\train-phaseb.js --teacher 1ply-hold-garbage --force-phase-b --only N3 >> data\stage7\phaseb-n23.log 2>&1
echo EXIT-N3 %ERRORLEVEL% %DATE% %TIME% >> data\stage7\phaseb-n23.log

echo CHAIN END %DATE% %TIME% >> data\stage7\phaseb-n23.log
