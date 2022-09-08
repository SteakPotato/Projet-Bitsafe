//when mobile menu is open, if we click outside of it, close the menu.
window.addEventListener("load",() => {
	window.addEventListener('click', function(e){  
		const menu_btn = document.querySelector('.menu-btn');
        const menu_label = document.querySelector('.menu label');
		if(menu_btn.checked == true){
			if (!document.querySelector('.menu label').contains(e.target)){
                    menu_label.click()
			}
			
		} 
		
	  });
})