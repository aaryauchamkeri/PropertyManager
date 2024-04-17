export async function getTemplates(accountId, authToken) {
    let templates = await fetch('https://propertymanager.onrender.com/media/templates', {
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
        let res = await fetch('https://propertymanager.onrender.com/media/template', {
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