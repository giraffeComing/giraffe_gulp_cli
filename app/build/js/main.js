/* @update: 2017-10-11 11:21:21 */ 
seajs.config({comboExcludes:/.*/,paths:{project:"../js/"}}),seajs.use(["project/jsFileOne","project/jsFileTwo"],function(e,s){e(),s()});