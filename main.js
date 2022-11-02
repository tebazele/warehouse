const packages = [{
    pic: '1.png',
    priorityLevel: 'express',
    isFragile: false,
    weight: 2,
    to: 'Sir Harrington IV',
    trackingNumber: '1324kjs',
    id: "sir-harr"
},
{
    pic: '2.png',
    priorityLevel: 'standard',
    isFragile: true,
    weight: .5,
    to: 'Master Mercutio',
    trackingNumber: '1325sdk',
    id: "master-m"
},
{
    pic: '3.png',
    priorityLevel: 'free',
    isFragile: true,
    weight: .5,
    to: 'Mistress Ravenfeather',
    trackingNumber: 'jffd147',
    id: "mis-rav"
},
{
    pic: '1.png',
    priorityLevel: 'standard',
    isFragile: false,
    weight: 4,
    to: 'B. Robert Brown',
    trackingNumber: 'acdc145',
    id: "b-robert"
},
{
    pic: '2.png',
    priorityLevel: 'express',
    isFragile: true,
    weight: 6,
    to: 'Chancellor Wallace',
    trackingNumber: '994latb',
    id: "chan-wal"
},
{
    pic: '3.png',
    priorityLevel: 'standard',
    isFragile: false,
    weight: 5,
    to: 'Sarah Sharm',
    trackingNumber: '8081baz',
    id: "sar-sharm"
},
{
    pic: '1.png',
    priorityLevel: 'free',
    isFragile: true,
    weight: 12,
    to: 'Tae Lien',
    trackingNumber: 'suz2367',
    id: "tae-lie"
}]

//console.log('js loaded')

let packagePictures = ["1.png", "2.png", "3.png"];

// SECTION filters

function heavyPackages() {
    let heavyArray = packages.filter(package => package.weight >= 5);
    //console.log(heavyArray);
    drawPackages(heavyArray);
}

function priorityPackages(type) {
    let priorityArray = [];
    if (type == 'express') {
        let expressArray = packages.filter(package => package.priorityLevel == 'express');
        priorityArray = expressArray;
    } else if (type == 'standard') {
        let standardArray = packages.filter(package => package.priorityLevel == 'standard');
        priorityArray = standardArray;
    } else {
        let freeArray = packages.filter(package => package.priorityLevel == 'free');
        priorityArray = freeArray;
    }
    console.log(priorityArray);
    drawPackages(priorityArray);
}

function fragilePackages() {
    let fragilePackages = packages.filter(package => package.isFragile == true);
    console.log(fragilePackages);
    drawPackages(fragilePackages);
}

function sortByWeight() {
    packages.sort((p1, p2) => p1.weight - p2.weight);
    //console.log(packages);
    drawPackages(packages);
}

// SECTION game logic

function getLost() {
    let randomPackage = packages[Math.floor(Math.random() * packages.length)];
    randomPackage.trackingNumber = 'missing';
    console.log(randomPackage)
}

function getClue() {
    let missingPackage = packages.find(package => package.trackingNumber == 'missing');
    console.log(missingPackage);

    let cluesKeys = ['weight', 'priorityLevel', 'isFragile'];
    let randomClue = cluesKeys[Math.floor(Math.random() * cluesKeys.length)];

    let clueElem = document.getElementById('clue-elem');

    switch (randomClue) {
        case 'weight':
            console.log('weight was selected');
            clueElem.innerHTML = `The missing package weighs ${missingPackage['weight']} pounds.`;
            break;
        case 'priorityLevel':
            console.log('priorityLevel was selected');
            clueElem.innerHTML = `The missing package is priority level ${missingPackage['priorityLevel']}.`;
            break;
        case 'isFragile':
            console.log('isFragile was selected')
            clueElem.innerHTML = `The missing package is ${missingPackage.isFragile ? 'fragile' : 'not fragile'}`;
            break;

    }
}

// function guessPackage() {
//     let guess = window.confirm('Ready to guess which package is missing');
//     console.log(guess);

//     let missingPackage = packages.find(package => package.trackingNumber == 'missing');

//     if (guess == missingPackage.to) {
//         window.alert('You found the missing package!');
//     } else {
//         window.alert('Nope, guess again!');
//         getClue()
//     }

// }

function selectPackage() {
    drawAllPackages();
    let sirHarr = document.getElementById('sir-harr');
    let masterM = document.getElementById('master-m');
    let misRav = document.getElementById('mis-rav');
    let bRobert = document.getElementById('b-robert');
    let chanWal = document.getElementById('chan-wal');
    let sarSharm = document.getElementById('sar-sharm');
    let taeLie = document.getElementById('tae-lie');

    // console.log("SirHarr:" + sirHarr);
    // console.log(masterM);
    // console.log(misRav);
    // console.log(bRobert);
    // console.log(chanWal);
    // console.log(sarSharm);
    // console.log(taeLie);
    let yesOrNo = window.confirm('Ready to guess which package is missing? \nClick the package to submit your guess.');

    if (yesOrNo) {

        sirHarr.addEventListener("click", compareGuess, { once: true });
        masterM.addEventListener("click", compareGuess, { once: true });
        misRav.addEventListener("click", compareGuess, { once: true });
        bRobert.addEventListener("click", compareGuess, { once: true });
        chanWal.addEventListener("click", compareGuess, { once: true });
        sarSharm.addEventListener("click", compareGuess, { once: true });
        taeLie.addEventListener("click", compareGuess, { once: true });
    }
}

function compareGuess() {
    let missingPackage = packages.find(package => package.trackingNumber == 'missing');

    let guessPackage = event.target;

    if (missingPackage.id == guessPackage.id) {
        console.log(guessPackage.id)
        window.alert('Nice job! You found the missing package.')
    } else {
        window.alert('Nope. Try again!');
        getClue();
    }


}

// SECTION draw stuff to the page

function drawPackages(packagesArray) {
    let packageSection = document.getElementById('package-section');
    let template = '';


    packagesArray.forEach(package => {

        template +=
            `<div class="col-md-2 col-10 card p-2 m-5 bg-dark">
            <h4 class="text-light text-center">To: ${package.to}</h4>
            <img src="${package.pic}" id="${package.id}">
            </div>`;
    })

    //console.log(template)
    //console.log(packageSection)
    packageSection.innerHTML = template;
}

function drawAllPackages() {
    drawPackages(packages);
}

drawAllPackages();
getLost();