let arr = [];
const btns = document.querySelectorAll('.dropdown-item');
const checkVal = document.querySelectorAll('.dropdown ul li input[type="checkbox"]');
const select = document.querySelector('.dropdown ul');
let form = document.querySelector('.categories #form-control ul');
const refresh = document.querySelector('.refresh');


refresh.addEventListener('click', function(){
    arr = [];
    form.innerHTML = "No item selected";
    checkVal.forEach((item)=>{
        item.checked = false;
    })
    grid.arrange({
        filter: '*'
    })
})
const grid = new Isotope('.filter-content', {
    itemSelector: '.filter-content .wrapper',
    layoutMode: 'fitRows',
    filter: "*"
});

btns.forEach((btn)=>{
    btn.addEventListener('click', function(){
       
        // console.log(btn.getAttribute('data-fiter'));
    })
    })

checkVal.forEach((item) => {
    item.addEventListener('change', function () {
        arr = [];
        form.innerHTML = "";
        checkVal.forEach((item) => {
            if (item.checked) {
                arr.push(item.value);
            }
        })
        if (arr.length) {

            arr.forEach((item, index) => {
                var html = '<li>' +
                    '<span>%name%</span>' +
                    '<small class="close" data-index="%index%">X</small>' +
                    '</li>';

                html = html.replace('%name%', item);
                html = html.replace('%index%', index);

                form.insertAdjacentHTML('beforeend', html);

                form.querySelector('[data-index="' + index + '"]').addEventListener('click', function () {
                    form.removeChild(this.parentNode)
                    arr = arr.filter((a)=>{
                        return a != item;
                    })
                    select.querySelector('[value="'+ item +'"').checked = false;
                    if(!arr.length){
                        form.innerHTML = "No item selected"
                    }
                    const stack = arr.map((item)=>{
                        return '.' + item
                    })
                    grid.arrange({
                        filter: arr.length ? stack.join('') : '*'
                    })
                })
                
            })
        }else{
            form.innerHTML = "No item selected"
        }
        const stack = arr.map((item)=>{
            return '.' + item
        })
        grid.arrange({
            filter: arr.length ? stack.join('') : '*'
        })
    })
})


