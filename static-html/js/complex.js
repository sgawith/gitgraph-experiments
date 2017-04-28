const graphConfig = new GitGraph.Template({
    branch: {
        lineWidth: 8,
        spacingX: 60,
        mergeStyle: "bezier",
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
            strokeWidth: 0,
            strokeColor: "#000"
        },
        tag: {
            font: "normal 10pt Arial"
        },
        message: {
            display: false
        }
    },
    arrow: {
        size: 1,
        offset: 5
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

const masterColumn = 7;
const prodSupportColumn = 6;
const prodSupportFeatureColumn = 5;
const stagingColumn = 4;
const stagingFeatureColumn = 3;
const developColumn = 2;
const developFeatureColumn = 1;

const masterColour = "#00A4A7";             // DLR
const prodSupportColour = "#b36305";        // Bakerloo line
const prodSupportFeatureColour = "#F3A9BB"; // Hammersmith & City line
const stagingColour = "#ffd300";            // Circle line
const stagingFeatureColour = "#a0a5a9";     // Jubilee line
const developColour = "#0098d4";            // Victoria line
const developFeatureColour = "#ee7c0e";     // Overground

const blackarrow = new GitGraph(config);

const masterBranch = blackarrow.branch({
    name: "master",
    column: masterColumn,
    color: masterColour,
    labelColor: masterColour
});
masterBranch.commit({
    color: masterColour,
    message: "Created new repo"
});
masterBranch.tag({
    tag: "v1.1.0.0",
    tagColor: masterColour
});

const developBranch = blackarrow.branch({
    name: "development",
    parentBranch: masterBranch,
    column: developColumn,
    color: developColour
});
developBranch.commit({
    message: "creating dev branch",
    color: developColour
});

const stagingBranch = blackarrow.branch({
    name: "staging",
    parentBranch: developBranch,
    column: stagingColumn,
    color: stagingColour
});
stagingBranch.commit({
    message: "Created staging branch",
    color: stagingColour
});

const prodSupportBranch = blackarrow.branch({
    name: "production-support",
    parentBranch: masterBranch,
    column: prodSupportColumn,
    color: prodSupportColour
});
prodSupportBranch.commit({
    message: "Added unit tests",
    color: prodSupportColour
});


//DEVELOPMENT
// fixing a develop 1.2 feature
const feature0002Branch = blackarrow.branch({
    name: "feature/DEV-1231",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
feature0002Branch.commit({
    message: "Fixed feature",
    color: developFeatureColour
});
feature0002Branch.merge(developBranch, {color: developColour});

//PRODUCTION SUPPORT BRANCH
// Scenario 1 - fixing a critical bug in production
const prodBug0001Branch = blackarrow.branch({
    name: "hotfix/DEV-2132",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureColumn,
    color: prodSupportFeatureColour
});
prodBug0001Branch.commit({
    message: "Fixed bug",
    color: prodSupportFeatureColour
});
prodBug0001Branch.merge(prodSupportBranch, {color: prodSupportColour});
prodSupportBranch
    .merge(developBranch, {color: developColour})
    .merge(stagingBranch, {color: stagingColour})
    .merge(masterBranch, {
        dotStrokeWidth: 10,
        message: "Release v1.1.0.1 tagged",
        tag: "v1.1.0.1",
        tagColor: masterColour
    });

// fixing a develop 1.2 feature
const feature0003Branch = blackarrow.branch({
    name: "feature/DEV-1232",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
feature0003Branch.commit({
    color: developFeatureColour,
    message: "Fixed feature"
});
feature0003Branch.merge(developBranch);

//STAGING BRANCH
const stagingBug0001Branch = blackarrow.branch({
    name: "bug/DEV-1212",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingBug0001Branch.commit("Fixed bug");
stagingBug0001Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);

// fixing a develop 1.2 bug
const bug0004Branch = blackarrow.branch({
    name: "bug/DEV-1234",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
bug0004Branch.commit("Fixed feature");
bug0004Branch.merge(developBranch);

//STAGING BRANCH
const stagingBug0002Branch = blackarrow.branch({
    name: "bug/DEV-1213",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingBug0002Branch.commit("Fixed bug");
stagingBug0002Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);

//PRODUCTION SUPPORT BRANCH
const prodBug0002Branch = blackarrow.branch({
    name: "hotfix/DEV-2133",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureColumn,
    color: prodSupportFeatureColour
});
prodBug0002Branch.commit("Fixed bug");
prodBug0002Branch.merge(prodSupportBranch);
prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.0.2 tagged",
    tag: "v1.1.0.2",
    tagColor: masterColour
});

// fixing a develop 1.2 feature
const feature0004Branch = blackarrow.branch({
    name: "feature/DEV-1236",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
feature0004Branch.commit("Fixed feature");
feature0004Branch.merge(developBranch);

//STAGING BRANCH
const stagingFeature0003Branch = blackarrow.branch({
    name: "feature/DEV-1422",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingFeature0003Branch.commit("Fixed feature");
stagingFeature0003Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);

// fixing a develop 1.2 bug
const devBug0005Branch = blackarrow.branch({
    name: "bug/DEV-5312",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
devBug0005Branch.commit("Fixed feature");
devBug0005Branch.merge(developBranch);

//STAGING BRANCH
const stagingFeature0004Branch = blackarrow.branch({
    name: "feature/DEV-2137",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingFeature0004Branch.commit("Fixed feature");
stagingFeature0004Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);


const prodBug0003Branch = blackarrow.branch({
    name: "hotfix/DEV-2134",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureColumn,
    color: prodSupportFeatureColour
});
prodBug0003Branch.commit("Fixed bug");
prodBug0003Branch.merge(prodSupportBranch);

prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.0.3 tagged",
    tag: "v1.1.0.3",
    tagColor: masterColour
});

stagingBranch.tag({
    displayTagBox: true,
    tag: "v1.1.1.0",
    tagColor: stagingColour
});
stagingBranch.merge(masterBranch,{
    dotStrokeWidth: 10,
    message: "Release v1.1.1.0 tagged",
    tag: "v1.1.1.0",
    tagColor: masterColour
});

// fixing a develop 1.2 bug
const devBug0006Branch = blackarrow.branch({
    name: "bug/DEV-4876",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
devBug0006Branch.commit("Fixed bug");
devBug0006Branch.merge(developBranch);

const prodBug0004Branch = blackarrow.branch({
    name: "hotfix/DEV-2134",
    parentBranch: prodSupportBranch,
    column: prodSupportFeatureColumn,
    color: prodSupportFeatureColour
});
prodBug0004Branch.commit("Fixed bug");
prodBug0004Branch.merge(prodSupportBranch);
prodSupportBranch.merge(developBranch).merge(stagingBranch).merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.1.1 tagged",
    tag: "v1.1.1.1",
    tagColor: masterColour
});

developBranch.merge(stagingBranch,{
    displayTagBox: true,
    tag: "v1.2.0.0",
    tagColor: stagingColour
});

const stagingFeature0005Branch = blackarrow.branch({
    name: "feature/DEV-3212",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingFeature0005Branch.commit("Hot fix for 1.2.0.1");
stagingFeature0005Branch.merge(stagingBranch);
stagingBranch.merge(developBranch);
stagingBranch.merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.2.0.1 tagged",
    tag: "v1.2.0.1",
    tagColor: masterColour

});

stagingBranch.tag({
    displayTagBox: true,
    tag: "v1.2.1.0",
    tagColor: stagingColour
});

