var graphConfig = new GitGraph.Template({
    branch: {
        colors: ["#000", "red", "green", "yellow", "orange", "purple", "pink", "grey"],
        lineWidth: 3,
        spacingX: 60,
        // mergeStyle: "straight",
        showLabel: true,                // display branch names on graph
        labelFont: "normal 10pt Arial",
        labelRotation: 0
    },
    commit: {
        showMessage: false,
        spacingY: -30,
        dot: {
            size: 8,
            strokeColor: "#000000",
            strokeWidth: 4
        },
        tag: {
            font: "normal 10pt Arial",
            color: "yellow"
        },
        message: {
            color: "black",
            font: "normal 12pt Arial",
            displayAuthor: false,
            displayBranch: false,
            displayHash: false,
            display:false
        }
    },
    arrow: {
        size: 8,
        offset: 3
    }
});

var config = {
    template: graphConfig,
    mode: "extended",
    orientation: "vertical-reverse",
    elementId: "current-pattern"
};

var masterCol = 7;
var prodSupportCol = 6;
var prodSupportFeatureCol = 5;
var stagingCol = 4;
var stagingFeatureCol = 3;
var developCol = 2;
var developFeatureCol = 1;

var blackarrow = new GitGraph(config);

var masterBranch = blackarrow.branch({
    name: "master",
    column: masterCol
});
masterBranch.commit("Created new repo");
masterBranch.tag({
    tag :"v1.1.0.0",tagColor:"yellow"
});

var developBranch = blackarrow.branch({
    name: "development",
    parentBranch: masterBranch,
    column: developCol
});
developBranch.commit("Added unit tests");

var stagingBranch = blackarrow.branch({
    name: "staging",
    parentBranch: developBranch,
    column: stagingCol
});
stagingBranch.commit("Added unit tests");

var prodSupportBranch = blackarrow.branch({
    name: "production-support",
    parentBranch: masterBranch,
    column: prodSupportCol
});
prodSupportBranch.commit("Added unit tests");

// fixing a develop 1.2 feature
var feature0002Branch = blackarrow.branch({
    name: "feature/DEV-0002",
    parentBranch: developBranch,
    column: developFeatureCol
});
feature0002Branch.commit("Fixed feature");
feature0002Branch.merge(developBranch);

// fixing a develop 1.2 feature
var feature0003Branch = blackarrow.branch({
    name: "feature/DEV-0003",
    parentBranch: developBranch,
    column: developFeatureCol
});
feature0003Branch.commit("Fixed feature");
feature0003Branch.merge(developBranch);

// fixing a develop 1.2 bug
var bug0004Branch = blackarrow.branch({
    name: "bug/DEV-0004",
    parentBranch: developBranch,
    column: developFeatureCol
});
bug0004Branch.commit("Fixed feature");
bug0004Branch.merge(developBranch);

//PRODUCTION SUPPORT BRANCH

// Scenario 1 - fixing a critical bug in production
var prodBug0001Branch = blackarrow.branch({
    name: "hotfix/DEV-0001",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureCol
});
prodBug0001Branch.commit("Fixed bug");
prodBug0001Branch.merge(prodSupportBranch);


var prodBug0002Branch = blackarrow.branch({
    name: "hotfix/DEV-1332",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureCol
});
prodBug0002Branch.commit("Fixed bug");
prodBug0002Branch.merge(prodSupportBranch);


var prodBug0003Branch = blackarrow.branch({
    name: "hotfix/DEV-0001",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureCol
});
prodBug0003Branch.commit("Fixed bug");
prodBug0003Branch.merge(prodSupportBranch);

prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.0.1 tagged",
    tag: "v1.1.0.1"
});



//STAGING BRANCH
var stagingFeature0001Branch = blackarrow.branch({
    name: "feature/DEV-1212",
    parentBranch: stagingBranch,
    column: stagingFeatureCol
});
stagingFeature0001Branch.commit("Fixed feature");
stagingFeature0001Branch.merge(stagingBranch);

var stagingFeature0001Branch = blackarrow.branch({
    name: "feature/DEV-1212",
    parentBranch: stagingBranch,
    column: stagingFeatureCol
});
stagingFeature0001Branch.commit("Fixed feature");
stagingFeature0001Branch.merge(stagingBranch);

var stagingFeature0001Branch = blackarrow.branch({
    name: "feature/DEV-1212",
    parentBranch: stagingBranch,
    column: stagingFeatureCol
});
stagingFeature0001Branch.commit("Fixed feature");
stagingFeature0001Branch.merge(stagingBranch);



prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.0.1 tagged",
    tag: "v1.1.0.1"
});


