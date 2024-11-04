[![Build & test](https://github.com/przemek83/bkble-online/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/przemek83/bkble-online/actions/workflows/build-and-test.yml)
[![CodeQL](https://github.com/przemek83/bkble-online/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/przemek83/bkble-online/actions/workflows/github-code-scanning/codeql)
[![codecov](https://codecov.io/github/przemek83/bkble-online/graph/badge.svg?token=25DETP2QR1)](https://codecov.io/github/przemek83/bkble-online)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=przemek83_bkble-online&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=przemek83_bkble-online)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=przemek83_bkble-online&metric=bugs)](https://sonarcloud.io/summary/new_code?id=przemek83_bkble-online)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=przemek83_bkble-online&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=przemek83_bkble-online)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=przemek83_bkble-online&metric=coverage)](https://sonarcloud.io/summary/new_code?id=przemek83_bkble-online)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=przemek83_bkble-online&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=przemek83_bkble-online)

# About project
 Online tool for browser game BattleKnight in form of web page with logic in Java Script. It allows to monitor changes in ranking and helps in decision whom to challenge to the duel.  

# Screenshots
![Alt text](screenshot2.png?raw=true "Greeting screen.")![Alt text](screenshot1.png?raw=true "Table with changes.")

# How it works
Battleknight players copies ranking page and paste into tool. Each time new ranking is pasted, tool calculates changes of so called loot (inner Battleknight currency). Additional button called "Checkpoint!" is used for treating current state as reference one and counting future loot increase based on it.  
Of course same thing can be done using pencil + paper or spreadsheet but web tool is lite, quick and available everywhere.  
Tool in web form is used by players since 2013, Java standalone app (Bkble) since 2006.  

# Technicalities
Bbkble online is a mix of HTML, CSS and Java Script.   
Visuals are based on free template found in web around 2013, tabbing mechanism on Yetii (Yet (E)Another JavaScript Tab Interface Implementation). Logic is created in JS and there are also some JS script injections from Facebook, Twitter, Google+ (when it was alive), Google Analytics and Google Ads.  
Main logic can be found in `js/ops.js`.

# Licensing
Software is released under the MIT license.

The project uses the following open-source software:
| Name | License | Home | Description |
| --- | --- | --- | --- |
| Yetii | BSD | https://github.com/kminek/Yetii | JavaScript tab interface implementation |
| Jest | MIT | https://github.com/jestjs/jest | JavaScript testing solution |

# Testing
Test are located in `test` dir and can be run using `jest` tool. Examnple run:

    $ npx jest
    PASS  test/ops.test.js (7.785 s)
    Knight
        ✓ Knight in order creation (2 ms)
        ✓ Knight without order creation (1 ms)
        ✓ should calculate loot difference correctly
    Output
        ✓ should create row correctly for knight with order (1 ms)
        ✓ should create row correctly for knight without order
        ✓ should create table with 2 knights (1 ms)
    Data pasting
        ✓ should process pasted data and set "" as textarea content (66 ms)
        ✓ should create table with 100 knights (50 ms)
        ✓ paste second time rank without changes (41 ms)
        ✓ should update loots after loading updated data (62 ms)
        ✓ should update loots after checkpoint and pasting second update (97 ms)
        ✓ should ignore (44 ms)
    Big ranks
        ✓ should create table with 2000 knights (2180 ms)
        ✓ should update loots after loading updated data (5009 ms)

    Test Suites: 1 passed, 1 total
    Tests:       14 passed, 14 total
    Snapshots:   0 total
    Time:        8.125 s
    Ran all test suites.