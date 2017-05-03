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
const prodSupportFeatureColumn = 5;
const stagingColumn = 4;
const stagingFeatureColumn = 3;
const developColumn = 2;
const developFeatureColumn = 1;

const masterColour = "#00A4A7";             // DLR
const hotfixFeatureColour = "#F3A9BB"; // Hammersmith & City line
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
    tag: "v1.1.0",
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
    parentBranch: masterBranch,
    column: stagingColumn,
    color: stagingColour
});
stagingBranch.commit({
    message: "Created staging branch",
    color: stagingColour
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
const hotfix0001Branch = blackarrow.branch({
    name: "hotfix/DEV-2132",
    parentBranch: masterBranch,
    column: prodSupportFeatureColumn,
    color: hotfixFeatureColour
});
hotfix0001Branch.commit({
    message: "Fixed bug",
    color: masterColour
});
hotfix0001Branch.merge(stagingBranch, {color: masterColour});
stagingBranch
    .merge(developBranch, {color: developColour})
    .merge(masterBranch, {
        color: masterColour,
        dotStrokeWidth: 10,
        message: "Release v1.1.1 tagged",
        tag: "v1.1.1",
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
feature0003Branch.merge(developBranch, {color: developColour});

//STAGING BRANCH
const stagingBug0001Branch = blackarrow.branch({
    name: "bug/DEV-1212",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingBug0001Branch.commit({
    message: "Fixed bug",
    color: stagingFeatureColour
});
stagingBug0001Branch.merge(stagingBranch, {color: stagingColour});
stagingBranch.merge(developBranch, {color: developColour});

// fixing a develop 1.2 bug
const bug0004Branch = blackarrow.branch({
    name: "bug/DEV-1234",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
bug0004Branch.commit({
    message: "Fixed feature",
    color: developFeatureColour
});
bug0004Branch.merge(developBranch, {color: developColour});

//STAGING BRANCH
const stagingBug0002Branch = blackarrow.branch({
    name: "bug/DEV-1213",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingBug0002Branch.commit({
    message: "Fixed bug",
    color: stagingFeatureColour
});
stagingBug0002Branch.merge(stagingBranch, {color: stagingColour});
stagingBranch.merge(developBranch, {color: developColour});

//PRODUCTION SUPPORT BRANCH
const hotfix0002Branch = blackarrow.branch({
    name: "hotfix/DEV-2133",
    parentBranch: masterBranch,
    column: prodSupportFeatureColumn,
    color: hotfixFeatureColour
});
hotfix0002Branch.commit({
    color: hotfixFeatureColour,
    message: "Fixed bug"
});
hotfix0002Branch.merge(stagingBranch, {color: masterColour});
stagingBranch.merge(developBranch, {color: developColour})
    .merge(masterBranch, {
        dotStrokeWidth: 10,
        message: "Release v1.1.2 tagged",
        tag: "v1.1.2",
        tagColor: masterColour,
        color: masterColour
    });

// fixing a develop 1.2 feature
const feature0004Branch = blackarrow.branch({
    name: "feature/DEV-1236",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
feature0004Branch.commit({
    color: developFeatureColour,
    message: "Fixed feature"
});
feature0004Branch.merge(developBranch, {color: developColour});

//STAGING BRANCH
const stagingFeature0003Branch = blackarrow.branch({
    name: "feature/DEV-1422",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingFeature0003Branch.commit({
    message: "Fixed feature",
    color: stagingFeatureColour
});
stagingFeature0003Branch.merge(stagingBranch, {color: stagingColour});
stagingBranch.merge(developBranch, {color: developColour});

// fixing a develop 1.2 bug
const devBug0005Branch = blackarrow.branch({
    name: "bug/DEV-5312",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
devBug0005Branch.commit({
    message: "Fixed feature",
    color: developFeatureColour
});
devBug0005Branch.merge(developBranch, {color: developColour});

//STAGING BRANCH
const stagingFeature0004Branch = blackarrow.branch({
    name: "feature/DEV-2137",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingFeature0004Branch.commit({
    message: "Fixed feature",
    color: stagingFeatureColour
});
stagingFeature0004Branch.merge(stagingBranch, {color: stagingColour});
stagingBranch.merge(developBranch, {color: developColour});


const hotfix0003Branch = blackarrow.branch({
    name: "hotfix/DEV-2134",
    parentBranch: masterBranch,
    column: prodSupportFeatureColumn,
    color: hotfixFeatureColour
});
hotfix0003Branch.commit({
    message: "Fixed bug",
    color: hotfixFeatureColour
});
hotfix0003Branch.merge(stagingBranch, {color: masterColour});

stagingBranch.merge(developBranch, {color: developColour})
    .merge(masterBranch, {
        dotStrokeWidth: 10,
        message: "Release v1.1.3 tagged",
        tag: "v1.1.3",
        tagColor: masterColour,
        color: masterColour
    });

// fixing a develop 1.2 bug
const devBug0006Branch = blackarrow.branch({
    name: "bug/DEV-4876",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
devBug0006Branch.commit({
    message: "Fixed bug",
    color: developFeatureColour
});
devBug0006Branch.merge(developBranch, {color: developColour});

const hotfix0004Branch = blackarrow.branch({
    name: "hotfix/DEV-2134",
    parentBranch: masterBranch,
    column: prodSupportFeatureColumn,
    color: hotfixFeatureColour
});
hotfix0004Branch.commit({
    message: "Fixed bug",
    color: hotfixFeatureColour
});
hotfix0004Branch.merge(stagingBranch, {color: masterColour});
stagingBranch.merge(developBranch, {color: developColour})
    .merge(masterBranch, {
        dotStrokeWidth: 10,
        message: "Release v1.1.4 tagged",
        tag: "v1.1.4",
        tagColor: masterColour,
        color: masterColour
    });

developBranch.merge(stagingBranch,{
    displayTagBox: true,
    tag: "v1.2.0",
    tagColor: stagingColour,
    color: stagingColour
});

const stagingFeature0005Branch = blackarrow.branch({
    name: "feature/DEV-3212",
    parentBranch: stagingBranch,
    column: stagingFeatureColumn,
    color: stagingFeatureColour
});
stagingFeature0005Branch.commit({
    message: "Hot fix for 1.2.1",
    color: stagingFeatureColour
});
stagingFeature0005Branch.merge(stagingBranch, {color: stagingColour});
stagingBranch.merge(developBranch, {color: developColour});
stagingBranch.merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.2.1 tagged",
    tag: "v1.2.1",
    tagColor: masterColour,
    color: masterColour
});