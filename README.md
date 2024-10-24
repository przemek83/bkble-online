[![Build & test](https://github.com/przemek83/bkble-online/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/przemek83/bkble-online/actions/workflows/build-and-test.yml)
[![CodeQL](https://github.com/przemek83/bkble-online/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/przemek83/bkble-online/actions/workflows/github-code-scanning/codeql)
[![codecov](https://codecov.io/github/przemek83/bkble-online/graph/badge.svg?token=25DETP2QR1)](https://codecov.io/github/przemek83/bkble-online)

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