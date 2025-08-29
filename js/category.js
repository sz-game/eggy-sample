function loadAllGame(cat){
    var tmp_cat = capitalizeFirstLetter(cat);
    fetch("game/all.json",{
        headers: {
            'Content-Type': 'application/json',
            },
        }).then(response => response.json())
    .then(data => {
        listGame = data;
        for (var j=0; j<listGame.length; j++) {
            if (listGame[j].cat.indexOf(tmp_cat) >= 0) {
                var item = listGame[j];
                var img = "/images/logo/"+item.slug+".png";
                if(item.img){
                    img = "/images/logo/"+item.img;
                    if(item.img.indexOf("https://") != -1){
                    img = item.img;
                    } else {
                        img = `/images/logo/${item.img}.png`
                    }
                
                }
                var slug = item.slug;
                if(slug.indexOf("fnaf2") != -1 && listGame[j].domain == 4){
                   slug = listGame[j].slug_tmp;
                }
                if(item.domain == 8){
                    img = "https://ubg77.github.io/updatefaqs/"+item.slug+"/logo.png";
                }
                const htmlItem = `
    <div class="dark:bg-jacarta-700 dark:border-jacarta-700 border-jacarta-100 block rounded-[1.25rem] border bg-white p-[1.1875rem] transition-shadow hover:shadow-lg">
        <figure class="relative">
            <a title="${item.title}" href="/game/${slug}.html" style="cursor:pointer">
                <img
                    src="${img}"
                    alt="${item.title}"
                    class="w-full rounded-[0.625rem]"
                    loading="lazy" style="height:170px"
                />
            </a>
        </figure>
        <div class="mt-4" style="height: 48px;">
            <a title="${item.title}" href="/game/${slug}.html" class="block w-full">
                <h2 class="font-display text-jacarta-700 text-base dark:text-white text-center"
                    style="display: -webkit-box; 
                           -webkit-line-clamp: 2; 
                           -webkit-box-orient: vertical; 
                           overflow: hidden; 
                           text-overflow: ellipsis;
                           line-height: 1.2;">
                    ${item.title}
                </h2>
            </a>
        </div>
    </div>
`;
                const e = document.createElement('article');
                e.innerHTML = htmlItem;  
                document.getElementById('listgame').appendChild(e);
            }
        }
    });
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
window.addEventListener('load', function() {
    
    // loadSimilar();
    // loadHot();
    loadAllGame(document.getElementById("cat").value);
});
