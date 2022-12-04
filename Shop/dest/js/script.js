const USER_KEY_LS="user",USERS_KEY_LS="users",PRODUCTS_KEY_LS="products",ROUTES={"/":initProductsPage,"/index.html":initProductsPage,"/login.html":initLoginPage,"/shoppingCart.html":initShoppingCartPage,"/account.html":initAccountPage},fulfillProducts=(e,t=e.shoppingCart)=>{const a=getLocalStorage(PRODUCTS_KEY_LS);return t.map(t=>{var e=a.find(e=>e.id===t.id);return e.count=t.count,e})},createProductElement=t=>{var e=new Element("div",{attributes:{"data-id":t.id},classes:"product"}),a=getLocalStorage(USER_KEY_LS);return e.setHTML(`
        <img src="images/products/${t.img}.png" class="product__img" alt=${t.title} height="80">
        <p class="product__title">${t.title}</p>
        ${t.sale?`<div class="product__sale">
            <span class="product__sale--old">$${t.price}</span>
            <span class="product__sale--percent">-${t.salePercent}%</span>
        </div>`:""}
        <div class="product__info">
            <span class="product__price">$${t.sale?getSalePrice(t.price,t.salePercent):t.price}</span>
            <button class="product__cart ${a?.shoppingCart?.some(e=>e.id===t.id)?"product__cart--in":""}">
                <img src="images/shopping-cart.png" alt="shopping cart" height="20">
            </button>
        </div>
    `),e},updateShoppingSum=e=>{document.querySelector("#orderSummaryTotal").innerHTML="$"+e.reduce((e,t)=>e+getCountPrice(t),0)},createCategoryElement=e=>{var t=new Element("section",{classes:"category",attributes:{"data-category":e}});return t.setHTML(`<h2>${e}</h2><div class="category__container"></div>`),t},createRowOrderElement=e=>{var t=new Element("tr",{attributes:{"data-id":e.id}});return t.setHTML(`
                <td>
                  <div class="item__info">
                    <img src="images/products/${e.img}.png" alt="Bus" height="100" />
                    <div>
                      <p class="item__info--title">${e.title}</p>
                    </div>
                  </div>
                </td>
                <td>$${e.price}</td>
                <td>${e.sale?`<span class="item__sale">- ${e.salePercent}%</span>`:""}</td>
                <td>${e.count}</td>
                <td>$${getCountPrice(e)}</td>
                `),t},createRowShoppingElement=e=>{var t=new Element("tr",{attributes:{"data-id":e.id}});return t.setHTML(`
                <td>
                  <div class="item__info">
                    <img
                      src="images/products/${e.img}.png"
                      alt="Boat"
                      height="100"
                    />
                    <div>
                      <p class="item__info--title">${e.title}</p>
                    </div>
                  </div>
                </td>
                <td>$${e.price}</td>
                <td>${e.sale?`<span class="item__sale">- ${e.salePercent}%</span>`:""}</td>
                <td><input type="number" value="${e.count}" /></td>
                
                <td class="item__price-with-count">$${getCountPrice(e)}</td>
                <td>
                  <button class="item__remove">
                    <img src="images/delete.png" alt="delete" height="20" />
                  </button>
                </td>
    `),t},updateHeaderCount=e=>{document.querySelector("#headerShoppingCartCount").innerHTML=e},handleLogout=async()=>{var e=new UsersService,t=getLocalStorage(USER_KEY_LS);await e.update({id:t.id,status:!1}),removeLocalStorage(USER_KEY_LS),window.location.href="/"},updateHeader=e=>{var t=document.querySelector("#headerUser"),a=document.querySelector("#headerLogout"),r=document.querySelector("#headerShoppingCart");e?.status?(a.classList.add("active"),t.innerHTML=e.name,t.setAttribute("href","account.html"),r.setAttribute("href","shoppingCart.html"),updateHeaderCount(e.shoppingCart.length),a.addEventListener("click",handleLogout)):(a.classList.remove("active"),t.innerHTML="Log in",t.setAttribute("href","login.html"),r.setAttribute("href","login.html"),updateHeaderCount(0),a.removeEventListener("click",handleLogout))},initHeader=()=>{var e=getLocalStorage(USERS_KEY_LS);const t=getLocalStorage(USER_KEY_LS);e=e.find(e=>e.email===t?.email);e&&setLocalStorage(USER_KEY_LS,e),updateHeader(e)},setFormError=(e,t)=>{e=e.querySelector(".error");e.innerHTML=t,e.classList.add("active")};async function initProductsPage(i){const n=getLocalStorage(PRODUCTS_KEY_LS),a=groupedByCategory(n);var e=new Element("div",{classes:"container",attributes:{id:"categoriesContainer"}});render("main",e.element),Object.keys(a).forEach(e=>{var t=createCategoryElement(e);render("#categoriesContainer",t.element),render(`[data-category="${e}"] .category__container`,a[e].map(e=>createProductElement(e).element))}),document.addEventListener("click",async t=>{var e=getLocalStorage(USER_KEY_LS);if(t.target.closest(".product__cart"))if(e?.status){const o=n.find(e=>e.id===t.target.closest(".product").dataset.id);var a=e.shoppingCart,r=a.find(e=>e.id===o.id),r=(r?a.splice(a.indexOf(r),1):a.push({id:o.id,count:1}),await i.update({...e,shoppingCart:a}));setLocalStorage(USER_KEY_LS,r),t.target.closest(".product__cart").classList.toggle("product__cart--in"),updateHeader(e)}else window.location.href="login.html"})}async function initLoginPage(r){const o=document.querySelector("#loginForm"),a=document.querySelector("#registrationForm");o.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);e=getLocalStorage(USERS_KEY_LS);const a=e.find(e=>e.email===t.get("email"));a?e.some(e=>e.password===t.get("password")&&e.email===a.email)?(await r.update({...a,status:!0}),setLocalStorage(USER_KEY_LS,a),window.location.href="/"):setFormError(o,"Invalid password"):setFormError(o,"Invalid email")}),a.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget);getLocalStorage(USERS_KEY_LS).find(e=>e.email===t.get("email"))?setFormError(a,"User with this email already exists"):t.get("password")!==t.get("passwordVerify")?setFormError(a,"Passwords do not match"):(e=await r.create({name:t.get("name"),email:t.get("email"),password:t.get("password"),status:!0}),setLocalStorage(USER_KEY_LS,e),window.location.href="/")})}async function initAccountPage(e){const t=getLocalStorage(USER_KEY_LS);var a,r,o;t?(a=document.querySelector("#userInfoName"),r=document.querySelector("#userInfoEmail"),o=document.querySelector("#deleteAcc"),a.innerHTML=t.name,r.innerHTML=t.email,o.addEventListener("click",async()=>{await e.deleteUser(t.id),await handleLogout()}),fulfillProducts(t,t.orders).forEach(e=>{render("#orderTable tbody",createRowOrderElement(e).element)})):window.location.href="login.html"}async function initShoppingCartPage(i){var e=getLocalStorage(USER_KEY_LS);if(e?.status){const o=fulfillProducts(e);updateShoppingSum(o),o.forEach(e=>{e=createRowShoppingElement(e);render("#shoppingCartTable tbody",e.element)});e=document.querySelector("#shoppingCartTable");e.addEventListener("click",async e=>{if(e.target.closest(".item__remove")){var t=getLocalStorage(USER_KEY_LS);const r=e.target.closest("tr").dataset.id;var a=o.filter(e=>e.id!==r).map(e=>({id:e.id,count:e.count})),t=await i.update({...t,shoppingCart:a}),a=(setLocalStorage(USER_KEY_LS,t),fulfillProducts(t));updateShoppingSum(a),updateHeaderCount(a.length),e.target.closest("tr").remove()}}),e.addEventListener("input",async e=>{var t=getLocalStorage(USER_KEY_LS);const a=e.target.closest("tr").dataset.id;var r=fulfillProducts(t),o=r.find(e=>e.id===a);o&&(e=e.target.value,t.shoppingCart.splice(r.indexOf(o),1,{id:o.id,count:+e}),r=await i.update({...t,shoppingCart:t.shoppingCart}),setLocalStorage(USER_KEY_LS,r),r=fulfillProducts(t),updateShoppingSum(r),document.querySelector(`#shoppingCartTable [data-id="${o.id}"] .item__price-with-count`).innerHTML="$"+getCountPrice({...o,count:+e}))}),document.querySelector("#orderSummary").addEventListener("submit",async e=>{e.preventDefault();const a=getLocalStorage(USER_KEY_LS),r=a.shoppingCart.map(e=>({id:e.id,count:e.count})),o=[];e=a.orders.filter(t=>!r.find(e=>e.id===t.id)),r.forEach(t=>{var e=a.orders.find(e=>e.id===t.id);e?(e.count=+e.count+ +t.count,o.push(e)):o.push(t)}),e=await i.update({...a,shoppingCart:[],orders:[...o,...e]});setLocalStorage(USER_KEY_LS,e),updateHeaderCount(0),window.location.href="account.html"})}else window.location.href="login.html"}document.addEventListener("DOMContentLoaded",async()=>{var e=new UsersService,t=new ProductService,a=await e.getAll(),t=await t.getAll();setLocalStorage(USERS_KEY_LS,a),setLocalStorage(PRODUCTS_KEY_LS,t),initHeader(),ROUTES[window.location.pathname]&&ROUTES[window.location.pathname](e)});
//# sourceMappingURL=script.js.map
