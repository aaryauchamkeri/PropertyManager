export async function getTemplates(accountId, authToken) {
    let templates = await fetch('http://localhost:3000/media/templates', {
        method: 'GET',
        headers: {
            accountId: accountId,
            'Authorization': `Bearer ${authToken}`
        }
    });

    return await templates.json();
}

export async function uploadTemplate(file, accountId, authToken) {
    try {
        let formData = new FormData();
        formData.append('template', file);
        let res = await fetch('http://localhost:3000/media/template', {
            method: 'POST',
            headers: {
                accountId: accountId,
                'Authorization': `Bearer ${authToken}`
            },
            body: formData
        });
        console.log(await res.json());
        return true;
    } catch (err) {
        return false;
    }
}