// 
const HOW_MANY_TO_SET = 5
const GET_URL = ''
const POST_URL = ''
// 

function getRandomItemFromArray(items) {
    return items[Math.floor(Math.random() * items.length)];
}

async function runMain() {
    if (!GET_URL || !POST_URL) {
        throw Error('Please ensure this is setup correctly')
    }

    const json = await fetch(GET_URL).then(_ => _.json())

    const promises = new Array(HOW_MANY_TO_SET).fill({}).map(() => {
        const item = getRandomItemFromArray(json)

        return fetch(POST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "Start": item.Start,
                "End": item.End,
                "Comments": "",
                "Patient": {
                    "Name": "patient name",
                    "SecondName": "last name",
                    "Email": "email",
                    "Phone": "0283"
                }
            })
        })
    })

    await Promise.all(promises);

    console.log('done', GET_URL)
}

await runMain();
