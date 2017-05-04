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
        sha1: "Dev Team",
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
    tooltipHTMLFormatter: function (commit) {
        return "Dev team: " + commit.message;
    }
});

const config = {
    template: graphConfig,
    mode: "extended",
    orientation: "vertical-reverse",
    elementId: "current-pattern",
    mode: "compact"
};

const masterColumn = 6;
const hotfixColumn = 5;
const releaseColumn = 4;
const releaseFeatureColumn = 3;
const developColumn = 2;
const developFeatureColumn = 1;

const masterColour = "#00A4A7";             // DLR
const hotfixColour = "#e32017";      // Central line
const hotfixLabelColour = "#f3a9bb";        // Hammersmith & City line
const releaseColour = "#ffd300";            // Circle line
const releaseFeatureColour = "#a0a5a9";     // Jubilee line
const developColour = "#0098d4";            // Victoria line
const developFeatureColour = "#ee7c0e";     // Overground

const gitGraph = new GitGraph(config);

const masterBranch = gitGraph.branch({
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

const developBranch = gitGraph.branch({
    name: "development",
    parentBranch: masterBranch,
    column: developColumn,
    color: developColour
});
developBranch.commit({
    message: "creating dev branch",
    color: developColour
});

const releaseBranch = gitGraph.branch({
    name: "release",
    parentBranch: masterBranch,
    column: releaseColumn,
    color: releaseColour
});
releaseBranch.commit({
    message: "Created release branch",
    color: releaseColour
});


//DEVELOPMENT
// fixing a develop 1.2 feature
const feature0002Branch = gitGraph.branch({
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
const hotfix2132Branch = gitGraph.branch({
    name: "hotfix/DEV-2132",
    parentBranch: releaseBranch,
    column: hotfixColumn,
    color: hotfixColour
});
hotfix2132Branch.commit({
    message: "Fixed bug",
    color: hotfixLabelColour
});
hotfix2132Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch
    .merge(developBranch, {color: developColour})
    .merge(masterBranch, {
        color: masterColour,
        dotStrokeWidth: 10,
        message: "Release v1.1.1 tagged",
        tag: "v1.1.1",
        tagColor: masterColour
    });

// implementing a develop 1.2 feature
const feature1232Branch = gitGraph.branch({
    name: "feature/DEV-1232",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
feature1232Branch.commit({
    color: developFeatureColour,
    message: "Fixed feature"
});
feature1232Branch.merge(developBranch, {color: developColour});

// fixing a non-critical 1.1 bug
const bug1212Branch = gitGraph.branch({
    name: "bugfix/DEV-1212",
    parentBranch: releaseBranch,
    column: releaseFeatureColumn,
    color: releaseFeatureColour
});
bug1212Branch.commit({
    message: "Fixed bug",
    color: releaseFeatureColour
});
bug1212Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch.merge(developBranch, {color: developColour});

// fixing a 1.2 bug
const bug1234Branch = gitGraph.branch({
    name: "bugfix/DEV-1234",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
bug1234Branch.commit({
    message: "Fixed bug",
    color: developFeatureColour
});
bug1234Branch.merge(developBranch, {color: developColour});

// fixing a non-critical 1.1 bug
const bug1213Branch = gitGraph.branch({
    name: "bug/DEV-1213",
    parentBranch: releaseBranch,
    column: releaseFeatureColumn,
    color: releaseFeatureColour
});
bug1213Branch.commit({
    message: "Fixed bug",
    color: releaseFeatureColour
});
bug1213Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch.merge(developBranch, {color: developColour});

// Fixing a critical 1.1 bug
const hotfix2133Branch = gitGraph.branch({
    name: "hotfix/DEV-2133",
    parentBranch: releaseBranch,
    column: hotfixColumn,
    color: hotfixColour
});
hotfix2133Branch.commit({
    color: hotfixLabelColour,
    message: "Fixed bug"
});
hotfix2133Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch.merge(developBranch, {color: developColour})
    .merge(masterBranch, {
        dotStrokeWidth: 10,
        message: "Release v1.1.2 tagged",
        tag: "v1.1.2",
        tagColor: masterColour,
        color: masterColour
    });

// implementing a 1.2 story
const feature1236Branch = gitGraph.branch({
    name: "feature/DEV-1236",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
feature1236Branch.commit({
    color: developFeatureColour,
    message: "Added new feature"
});
feature1236Branch.commit({
    color: developFeatureColour,
    message: "Added unit tests"
});
feature1236Branch.merge(developBranch, {color: developColour});

// implementing a 1.1 story
const feature1422Branch = gitGraph.branch({
    name: "feature/DEV-1422",
    parentBranch: releaseBranch,
    column: releaseFeatureColumn,
    color: releaseFeatureColour
});
feature1422Branch.commit({
    message: "Fixed feature",
    color: releaseFeatureColour
});
feature1422Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch.merge(developBranch, {color: developColour});

// fixing a 1.2 bug
const bug5312Branch = gitGraph.branch({
    name: "bug/DEV-5312",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
bug5312Branch.commit({
    message: "Fixed bug",
    color: developFeatureColour
});
bug5312Branch.merge(developBranch, {color: developColour});

// implementing a 1.1 story
const feature2137Branch = gitGraph.branch({
    name: "feature/DEV-2137",
    parentBranch: releaseBranch,
    column: releaseFeatureColumn,
    color: releaseFeatureColour
});
feature2137Branch.commit({
    message: "Updated UI",
    color: releaseFeatureColour
});
feature2137Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch.merge(developBranch, {color: developColour});

// fixing a critical 1.1 bug
const hotfix2134Branch = gitGraph.branch({
    name: "hotfix/DEV-2134",
    parentBranch: releaseBranch,
    column: hotfixColumn,
    color: hotfixColour
});
hotfix2134Branch.commit({
    message: "Fixed bug",
    color: hotfixLabelColour
});
hotfix2134Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch.merge(developBranch, {color: developColour});
releaseBranch.merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.3 tagged",
    tag: "v1.1.3",
    tagColor: masterColour,
    color: masterColour
});

// fixing a 1.2 bug
const bug4876Branch = gitGraph.branch({
    name: "bug/DEV-4876",
    parentBranch: developBranch,
    column: developFeatureColumn,
    color: developFeatureColour
});
bug4876Branch.commit({
    message: "Fixed bug",
    color: developFeatureColour
});
bug4876Branch.merge(developBranch, {color: developColour});

// fixing a critical 1.1 bug
const hotfix2764Branch = gitGraph.branch({
    name: "hotfix/DEV-2764",
    parentBranch: releaseBranch,
    column: hotfixColumn,
    color: hotfixColour
});
hotfix2764Branch.commit({
    message: "Fixed bug",
    color: hotfixLabelColour
});
hotfix2764Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch.merge(developBranch, {color: developColour});
releaseBranch.merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.1.4 tagged",
    tag: "v1.1.4",
    tagColor: masterColour,
    color: masterColour
});

// preparing a 1.2 release candidate
developBranch.merge(releaseBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.2.0-rc1 tagged",
    tag: "v1.2.0-rc1",
    tagColor: releaseColour,
    color: releaseColour
});

// fixing a bug found in 1.2 UAT
const bug3212Branch = gitGraph.branch({
    name: "bugfix/DEV-3212",
    parentBranch: releaseBranch,
    column: releaseFeatureColumn,
    color: releaseFeatureColour
});
bug3212Branch.commit({
    message: "Screen no longer flipped vertically.",
    color: releaseFeatureColour
});

// releasing 1.2
bug3212Branch.merge(releaseBranch, {color: releaseColour});
releaseBranch.merge(developBranch, {color: developColour});
releaseBranch.merge(masterBranch, {
    dotStrokeWidth: 10,
    message: "Release v1.2.0 tagged",
    tag: "v1.2.0",
    tagColor: masterColour,
    color: masterColour
});