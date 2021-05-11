google.charts.load('current', { 'packages': ['bar'] })
google.charts.load('current', {'packages':['corechart']})

google.charts.setOnLoadCallback(drawStuff)

const adjust = () => {
    let width
    if(window.innerWidth <= 900){
        width = "100%"
    }
    else{
        width = "50%"
    }

    let graphs = document.getElementsByClassName('graph')
    for(const graph of graphs){
        graph.style.width = width
    }

}

function options(label){
    let op = {
        is3d: true,
        title: label,
        // colors: ['rgb(255, 81, 0)'],
        width: 400,
        length: 300,
        legend: { position: 'none' },
        chart: {
            title: label,
            // subtitle: 'Npm'
        },
        bars: 'vertical',
        axes: {
            x: {
                0: { side: 'bottom', label: 'Date' }
            },
            y: {
                0: { side: 'left', label: 'Downloads' }
            }
        },
        bar: { groupWidth: "90%" }
    }

    return op
}

function drawStuff() {

    //  Npm ----
    adjust()
    npm = npm.split(',')
    let npmData = []
    npmData.push(['Date', 'Downloads'])
    for (let i = 0; i < npm.length; i += 2) {
        npmData.push([npm[i], parseInt(npm[i + 1], 10)])
    }
    // console.log(npmData)
    let data = new google.visualization.arrayToDataTable(npmData)

    let chart = new google.charts.Bar(document.getElementById('npm'))
    chart.draw(data, options('npm downloads (juice-shop-ctf-cli)'))
    // Npm ----

    // SourceForge ----
    sf = sf.split(',')
    let sfData = []
    sfData.push(['Date', 'Downloads'])
    for (let i = 0; i < sf.length; i += 2) {
        sfData.push([sf[i].split(' ')[0], parseInt(sf[i + 1], 10)])
    }
    // console.log(sfData)
    data = new google.visualization.arrayToDataTable(sfData)
    chart = new google.visualization.LineChart(document.getElementById('sf'));
    chart.draw(data, {
        title: 'SourceForge downloads (juice-shop)',
        curveType: 'function',
        legend: { position: 'bottom' }
    })
    // SourceForge ----

    // Docker Juice-shop ----
    docJs = docJs.split(',')
    let docJsData = []
    docJsData.push(['Date', 'Downloads'])
    for (let i = 0; i < docJs.length; i += 2) {
        docJsData.push([docJs[i], parseInt(docJs[i + 1], 10)])
    }
    // console.log(docJsData)
    data = new google.visualization.arrayToDataTable(docJsData)

    chart = new google.charts.Bar(document.getElementById('docJs'))
    chart.draw(data, options('Docker pulls (bkimminich/juice-shop)'))

    // Docker Juice-shop ----

    // Docker Juice-shop Ctf ----
    docJsCtf = docJsCtf.split(',')
    let docJsCtfData = []
    docJsCtfData.push(['Date', 'Downloads'])
    for (let i = 0; i < docJsCtf.length; i += 2) {
        docJsCtfData.push([docJsCtf[i], parseInt(docJsCtf[i + 1], 10)])
    }
    // console.log(docJsCtfData)
    data = new google.visualization.arrayToDataTable(docJsCtfData)

    chart = new google.charts.Bar(document.getElementById('docJsCtf'))
    chart.draw(data, options('Docker pulls (bkimminich/juice-shop-ctf)'))
    // Docker Juice-shop Ctf ----

    // Github Juice-shop ----

    // console.log(github)

    github = github.split(',')
    let githubData = []
    let releases = ["Date"]
    for(let i=0;i<githubReleases;i++){
        releases.push(github[i])
    }
    githubData.push(releases)
    for(let i=githubReleases;i<github.length;i++){
        let currData = []
        let x=i
        let isDateColumn = true
        for(let j=i;j<=x+githubReleases && j<github.length;j++){
            if(isDateColumn) {
                currData.push(github[j])
            } else {
                const dailyDownloads = parseInt(github[j],10)
                currData.push(dailyDownloads)
            }
            isDateColumn = false
            i=j
        }
        githubData.push(currData)
    }
    // console.log(github)
    // console.log(githubData)
    data = new google.visualization.arrayToDataTable(githubData)
    chart = new google.visualization.ComboChart(document.getElementById('gh'))
    chart.draw(data, {
        title: 'GitHub release downloads (juice-shop)',
        vAxis: { title: 'Downloads' },
        hAxis: { title: 'Date' },
        seriesType: 'bars',
        isStacked: true
    })
    // Github Juice-shop ----
    
};


document.onload = adjust
window.onresize = adjust