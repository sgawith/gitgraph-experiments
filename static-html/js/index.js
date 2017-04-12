var blackarrow = new GitGraph({
    template: "metro",
    mode: "compact",
    elementId: "current-pattern"
});

// var bamaster = blackarrow.branch("master").commit().commit();
// var badevelop = blackarrow.branch("develop").commit();
// bamaster.commit();
// badevelop.commit().commit();
// badevelop.merge(bamaster)

var masterBranch = blackarrow.branch("master");
masterBranch.commit("Created new repo");
masterBranch.commit("Set up project structure");

var developBranch = blackarrow.branch("develop").commit();

var firstFeatureBranch = blackarrow.branch({
    name: "feature1",
    parentBranch: developBranch
});

firstFeatureBranch.commit("Added unit tests");

var secondFeatureBranch = blackarrow.branch({
    name: "feature2",
    parentBranch: developBranch
});
secondFeatureBranch.commit("Updated UI");
firstFeatureBranch.commit("Implemented new feature.");
firstFeatureBranch.merge(developBranch);

developBranch.merge(secondFeatureBranch);

var bugFixBranch = blackarrow.branch({
    name: "bugFix",
    parentBranch: developBranch
});
bugFixBranch.commit("Fixed bug");
bugFixBranch.merge(developBranch);
developBranch.merge(secondFeatureBranch);
secondFeatureBranch.merge(developBranch);

developBranch.merge(masterBranch);