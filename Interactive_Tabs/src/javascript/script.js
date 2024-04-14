const tabs = document.querySelectorAll('.tab-btn') // btns

tabs.forEach(tab => tab.addEventListener('click', () => tabClicked(tab)))

if (tabs.length > 0){
    tabs[0].focus() // focus start on first element
}

const tabClicked = (tab) => {


    const contents = document.querySelectorAll('.content')
    contents.forEach(content => content.classList.remove('show')) // removal of starting element
    const contentId = tab.getAttribute('content-id') // content-id="{content}" of the btn
    const content = document.getElementById(contentId) // getting id
    content.classList.add('show')
}