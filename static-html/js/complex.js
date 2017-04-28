const graphConfig = new GitGraph.Template({
    branch: {
        colors: ["#000", "red", "green", "yellow", "orange", "blue", "foreset green", "grey"],
        lineWidth: 3,
        spacingX: 60,
        mergeStyle: "straight",
        showLabel: true,
        labelFont: "normal 10pt Arial",
        labelRotation: 0
    },
    commit: {
        showMessage: false,
        sha1:"Dev Team",
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
            display: false
        }
    },
    arrow: {
        size: 8,
        offset: 0
    },
    shouldDisplayTooltipsInCompactMode: true, // default = true
    tooltipHTMLFormatter: function ( commit ) {
        return "Dev team: "+commit.message;
    }
});

const config = {
    template: graphConfig,
    mode: "extended",
    orientation: "vertical-reverse",
    elementId: "current-pattern",
    mode:"compact"
};

const masterCol = 7;
const prodSupportCol = 6;
const prodSupportFeatureCol = 5;
const stagingCol = 4;
const stagingFeatureCol = 3;
const developCol = 2;
const developFeatureCol = 1;

const blackarrow = new GitGraph(config);

const masterBranch = blackarrow.branch({
    name: "master",
    column: masterCol
});
masterBranch.commit("Created new repo");
masterBranch.tag({
    tag: "v1.1.0.0", tagColor: "green"
});

const developBranch = blackarrow.branch({
    name: "development",
    parentBranch: masterBranch,
    column: developCol
});
developBranch.commit("creating dev branch");

const stagingBranch = blackarrow.branch({
    name: "staging",
    parentBranch: developBranch,
    column: stagingCol
});
stagingBranch.commit("Added unit tests");

const prodSupportBranch = blackarrow.branch({
    name: "production-support",
    parentBranch: masterBranch,
    column: prodSupportCol
});
prodSupportBranch.commit("Added unit tests");


//DEVOLOPMENT
// fixing a develop 1.2 feature
const feature0002Branch = blackarrow.branch({
    name: "feature/DEV-1231",
    parentBranch: developBranch,
    column: developFeatureCol
});
feature0002Branch.commit("Fixed feature");
feature0002Branch.merge(developBranch);

//PRODUCTION SUPPORT BRANCH
// Scenario 1 - fixing a critical bug in production
const prodBug0001Branch = blackarrow.branch({
    name: "hotfix/DEV-2132",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureCol
});
prodBug0001Branch.commit("Fixed bug");
prodBug0001Branch.merge(prodSupportBranch);
prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.0.1 tagged",
    tag: "v1.1.0.1"
});

// fixing a develop 1.2 feature
const feature0003Branch = blackarrow.branch({
    name: "feature/DEV-1232",
    parentBranch: developBranch,
    column: developFeatureCol
});
feature0003Branch.commit("Fixed feature");
feature0003Branch.merge(developBranch);

//STAGING BRANCH
const stagingBug0001Branch = blackarrow.branch({
    name: "bug/DEV-1212",
    parentBranch: stagingBranch,
    column: stagingFeatureCol
});
stagingBug0001Branch.commit("Fixed bug");
stagingBug0001Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);

// fixing a develop 1.2 bug
const bug0004Branch = blackarrow.branch({
    name: "bug/DEV-1234",
    parentBranch: developBranch,
    column: developFeatureCol
});
bug0004Branch.commit("Fixed feature");
bug0004Branch.merge(developBranch);

//STAGING BRANCH
const stagingBug0002Branch = blackarrow.branch({
    name: "bug/DEV-1213",
    parentBranch: stagingBranch,
    column: stagingFeatureCol
});
stagingBug0002Branch.commit("Fixed bug");
stagingBug0002Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);

//PRODUCTION SUPPORT BRANCH
const prodBug0002Branch = blackarrow.branch({
    name: "hotfix/DEV-2133",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureCol
});
prodBug0002Branch.commit("Fixed bug");
prodBug0002Branch.merge(prodSupportBranch);
prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.0.2 tagged",
    tag: "v1.1.0.2"
});

// fixing a develop 1.2 feature
const feature0004Branch = blackarrow.branch({
    name: "feature/DEV-1236",
    parentBranch: developBranch,
    column: developFeatureCol
});
feature0004Branch.commit("Fixed feature");
feature0004Branch.merge(developBranch);

//STAGING BRANCH
const stagingFeature0003Branch = blackarrow.branch({
    name: "feature/DEV-1422",
    parentBranch: stagingBranch,
    column: stagingFeatureCol
});
stagingFeature0003Branch.commit("Fixed feature");
stagingFeature0003Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);

// fixing a develop 1.2 bug
const devBug0005Branch = blackarrow.branch({
    name: "bug/DEV-5312",
    parentBranch: developBranch,
    column: developFeatureCol
});
devBug0005Branch.commit("Fixed feature");
devBug0005Branch.merge(developBranch);

//STAGING BRANCH
const stagingFeature0004Branch = blackarrow.branch({
    name: "feature/DEV-2137",
    parentBranch: stagingBranch,
    column: stagingFeatureCol
});
stagingFeature0004Branch.commit("Fixed feature");
stagingFeature0004Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);


const prodBug0003Branch = blackarrow.branch({
    name: "hotfix/DEV-2134",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureCol
});
prodBug0003Branch.commit("Fixed bug");
prodBug0003Branch.merge(prodSupportBranch);

prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.0.3 tagged",
    tag: "v1.1.0.3"
});

stagingBranch.tag({
    displayTagBox: true,
    tag: "v1.1.1.0",
    tagColor: "orange"
});
stagingBranch.merge(masterBranch,{
    dotStrokeWidth: 10,
    message: "Release v1.1.1.0 tagged",
    tag: "v1.1.1.0"
});

// fixing a develop 1.2 bug
const devBug0006Branch = blackarrow.branch({
    name: "bug/DEV-4876",
    parentBranch: developBranch,
    column: developFeatureCol
});
devBug0006Branch.commit("Fixed bug");
devBug0006Branch.merge(developBranch);

const prodBug0004Branch = blackarrow.branch({
    name: "hotfix/DEV-2134",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureCol
});
prodBug0004Branch.commit("Fixed bug");
prodBug0004Branch.merge(prodSupportBranch);
prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.1.1 tagged",
    tag: "v1.1.1.1",
    tagColor:"green"
});

developBranch.merge(stagingBranch,{
    displayTagBox: true,
    tag: "v1.2.0.0",
    tagColor: "orange"
});

const stagingFeature0005Branch = blackarrow.branch({
    name: "feature/DEV-3212",
    parentBranch: stagingBranch,
    column: stagingFeatureCol
});
stagingFeature0005Branch.commit("Hot fix for 1.2.0.1");
stagingFeature0005Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);
stagingBranch.merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.2.0.1 tagged",
    tag: "v1.2.0.1",
    tagColor:"green"

});

stagingBranch.tag({
    displayTagBox: true,
    tag: "v1.2.1.0",
    tagColor: "orange"
});

