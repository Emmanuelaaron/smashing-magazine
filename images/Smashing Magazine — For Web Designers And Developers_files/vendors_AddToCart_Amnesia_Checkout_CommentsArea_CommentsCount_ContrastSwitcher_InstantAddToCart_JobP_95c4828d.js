(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{605:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n,i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=(n=r(696))&&n.__esModule?n:{default:n},o=r(698),u=r(669),c=/^http:\/\//,l={};function h(e,t,r){return e.filter(function(e){return t==(e.currency||"USD").toUpperCase()}).filter(function(e){return!e.claims||(0,u.checkClaims)(r&&r.claims&&r.claims(),e.claims)}).map(function(e){return e.cents=e.cents||parseInt(100*parseFloat(e.amount)),e}).sort(function(e,t){return e.cents-t.cents})[0]}function d(e,t){return{cents:e,amount:f(e),currency:t}}function f(e){return""+(Math.round(e)/100).toFixed(2)}function p(e,t){var r=(2<arguments.length&&void 0!==arguments[2]?arguments[2]:{}).negatedParams,n=[];if(t)for(var i in t)n.push(encodeURIComponent(i)+"="+encodeURIComponent(t[i]));if(r)for(var s in r)n.push(encodeURIComponent(s)+"!="+encodeURIComponent(r[s]));return 0<n.length?e+"?"+n.join("&"):e}var v=function(){function t(e){if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),!e.APIUrl)throw"You must specify an APIUrl of your GoCommerce instance";e.APIUrl.match(c)&&console.log("Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOCOMMERCE EVER!GOCOMMERCE REQUIRES HTTPS to work securely."),this.cartKey=e.cartKey||"gocommerce.shopping-cart",this.api=new a.default(e.APIUrl),this.currency=e.currency||"USD",this.billing_country=e.country,this.settings_path="/gocommerce/settings.json",this.settings_refresh_period=e.settingsRefreshPeriod||6e5,this.loadCart()}return s(t,[{key:"setUser",value:function(e){this.user=e}},{key:"addToCart",value:function(t){var r=this,n=t.quantity,s=t.meta,a=t.path.replace(/^https?:\/\/[^\/]+/,"");return n&&a?e(a).then(function(e){return e.ok?e.text().then(function(e){var o=document.implementation.createHTMLDocument("product");o.documentElement.innerHTML=e;var u=Array.from(o.getElementsByClassName("gocommerce-product")).map(function(e){return JSON.parse(e.innerHTML)});if(0===u.length)return Promise.reject("No .gocommerce-product found in product path");var c=1===u.length?t.sku||u[0].sku:t.sku,l=u.find(function(e){return e.sku===c});if(!l)return Promise.reject("No .gocommerce-product matching sku="+c+" found in product path");var h=l.title,d=l.prices;return l.description,l.type,l.vat,c&&h&&d?(r.line_items[c]?(r.line_items[c].quantity+=n,s&&(r.line_items[c].meta=i({},r.line_items[c].meta,s))):r.line_items[c]=i(l,{path:a,meta:s,quantity:n}),t.addons&&l.addons?(r.line_items[c].addons=l.addons.filter(function(e){return-1!==t.addons.indexOf(e.sku)}),r.line_items[c].addonPrice=function(){for(var e={cents:0},t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n];return r.forEach(function(t){t&&(t.hasOwnProperty("cents")||(t.cents=parseInt(100*parseFloat(t.amount))),e.cents+=t.cents,e.currency=t.currency)}),e.amount=f(e.cents),e}.apply(void 0,function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}(r.line_items[c].addons.map(function(e){return e.price})))):delete r.line_items[c].addons,r.loadSettings().then(function(){return r.persistCart(),r.getCart()})):Promise.reject("Failed to read sku, title and price from product path: %o",{sku:c,title:h,prices:d})}):Promise.reject("Failed to fetch "+a)}):Promise.reject("Invalid item - must have path and quantity")}},{key:"getCartItem",value:function(e){var t=this,r=i({},e,{price:h(e.prices,this.currency,this.user)});return(r.price.items||[]).forEach(function(e){e.cents=(100*parseFloat(e.amount)).toFixed(0)}),e.addons&&(r.addons=[],e.addons.forEach(function(e){r.addons.push(i({},e,{price:h(e.prices,t.currency,t.user)}))})),r.addons&&(r.addonPrice=d(r.addons.reduce(function(e,t){return e+100*parseFloat(t.price.amount)},0),this.currency)),r}},{key:"calculatePrice",value:function(e,t){var r=this.getCartItem(e);return t=t||this.user&&this.user.claims&&this.user.claims(),(0,o.calculatePrices)(this.settings,t,this.billing_country,this.currency,this.coupon,[r])}},{key:"getCart",value:function(){var e={items:{}},t=[];for(var r in this.line_items){var n=e.items[r]=this.getCartItem(this.line_items[r]);t.push(n)}var s=this.user&&this.user.claims&&this.user.claims(),a=(0,o.calculatePrices)(this.settings,s,this.billing_country,this.currency,this.coupon,t);return e.subtotal=d(a.subtotal,this.currency),e.discount=d(a.discount,this.currency),e.couponDiscount=d(a.couponDiscount,this.currency),e.memberDiscount=d(a.memberDiscount,this.currency),e.netTotal=d(a.netTotal,this.currency),e.taxes=d(a.taxes,this.currency),e.total=d(a.total,this.currency),a.items.forEach(function(r,n){var s=t[n];s&&(e.items[s.sku]=i({},s,{calculation:r}))}),e}},{key:"setCurrency",value:function(e){return this.currency=e,Promise.resolve(this.getCart())}},{key:"setCountry",value:function(e){return this.billing_country=e,Promise.resolve(this.getCart())}},{key:"setVatnumber",value:function(e){var t=this;return this.vatnumber=e,this.verifyVatnumber(e).then(function(){return t.getCart()})}},{key:"setCoupon",value:function(e){var t=this;return null==e?(this.coupon=null,Promise.resolve(null)):this.verifyCoupon(e).then(function(e){return t.coupon=e})}},{key:"updateCart",value:function(e,t){if(!this.line_items[e])throw"Item "+e+" not found in cart";0<t?this.line_items[e].quantity=t:delete this.line_items[e],this.persistCart()}},{key:"clearCart",value:function(){this.line_items={},this.persistCart()}},{key:"order",value:function(e){var t=this,r=e.email,n=e.shipping_address,i=e.shipping_address_id,s=e.billing_address,a=e.billing_address_id,o=e.data;if(r&&(n||i)){var u=[];for(var c in this.line_items)u.push(this.line_items[c]);return this.authHeaders().then(function(e){return t.api.request("/orders",{method:"POST",headers:e,body:JSON.stringify({email:r,shipping_address:n,shipping_address_id:i,billing_address:s,billing_address_id:a,vatnumber:t.vatnumber_valid?t.vatnumber:null,currency:t.currency,coupon:t.coupon?t.coupon.code:null,data:o,line_items:u})})}).then(function(e){return{cart:t.getCart(),order:e}})}return Promise.reject("Invalid orderDetails - must have an email and either a shipping_address or shipping_address_id")}},{key:"payment",value:function(e){var t=this,r=e.order_id,n=e.amount,i=e.provider,s=e.stripe_token,a=e.stripe_payment_method_id,o=e.paypal_payment_id,u=e.paypal_user_id;return r&&null!=n&&i&&(s||a||o&&u)?(this.getCart(),this.authHeaders().then(function(e){return t.api.request("/orders/"+r+"/payments",{method:"POST",headers:e,body:JSON.stringify({amount:n,order_id:r,provider:i,stripe_token:s,stripe_payment_method_id:a,paypal_payment_id:o,paypal_user_id:u,currency:t.currency})})})):Promise.reject("Invalid paymentDetails - must have an order_id, an amount, a provider, and a stripe_token or a paypal_payment_id and paypal_user_id")}},{key:"paymentConfirm",value:function(e){var t=this;return this.authHeaders().then(function(r){return t.api.request("/payments/"+e+"/confirm",{method:"POST",headers:r})})}},{key:"resendConfirmation",value:function(e,t){var r=this,n="/orders/"+e+"/receipt";return this.authHeaders().then(function(e){return r.api.request(n,{headers:e,method:"POST",body:JSON.stringify({email:t})})})}},{key:"claimOrders",value:function(){var e=this;return this.user?this.authHeaders().then(function(t){return e.api.request("/claim",{headers:t,method:"POST"})}):Promise.resolve(null)}},{key:"updateOrder",value:function(e,t){var r=this;return this.authHeaders(!0).then(function(n){return r.api.request("/orders/"+e,{headers:n,method:"PUT",body:JSON.stringify(t)})})}},{key:"orderHistory",value:function(e){var t=this,r=(1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}).negatedParams,n="/orders";return e&&e.user_id&&(n="/users/"+e.user_id+"/orders",delete e.user_id),n=p(n,e,{negatedParams:r}),this.authHeaders(!0).then(function(e){return t.api.request(n,{headers:e})}).then(function(e){return{orders:e.items,pagination:e.pagination}})}},{key:"orderDetails",value:function(e){var t=this;return this.authHeaders().then(function(r){return t.api.request("/orders/"+e,{headers:r})})}},{key:"orderReceipt",value:function(e,t){var r=this,n="/orders/"+e+"/receipt";return t&&(n+="?template="+t),this.authHeaders(!0).then(function(e){return r.api.request(n,{headers:e})})}},{key:"userDetails",value:function(e){var t=this;return e=e||this.user&&this.user.id,this.authHeaders(!0).then(function(r){return t.api.request("/users/"+e,{headers:r})})}},{key:"downloads",value:function(e){var t=this,r="/downloads";return e&&e.order_id&&(r="/orders/"+e.order_id+"/downloads",delete e.order_id),r=p(r,e),this.authHeaders().then(function(e){return t.api.request(r,{headers:e})}).then(function(e){return{downloads:e.items,pagination:e.pagination}})}},{key:"downloadURL",value:function(e){var t=this,r="/downloads/"+e;return this.authHeaders().then(function(e){return t.api.request(r,{headers:e})}).then(function(e){return e.url})}},{key:"deleteUsers",value:function(e){var t=this,r="/users"+(0<e.length?"?"+e.map(function(e){return"id="+e}).join("&"):"");return this.authHeaders(!0).then(function(e){return t.api.request(r,{method:"DELETE",headers:e})})}},{key:"users",value:function(e){var t=this,r=p("/users",e);return this.authHeaders(!0).then(function(e){return t.api.request(r,{headers:e})}).then(function(e){return{users:e.items,pagination:e.pagination}})}},{key:"report",value:function(e,t){var r=this,n=p("/reports/"+e,t);return this.authHeaders(!0).then(function(e){return r.api.request(n,{headers:e})})}},{key:"authHeaders",value:function(e){return this.user?this.user.jwt().then(function(e){return{Authorization:"Bearer "+e}}):e?Promise.reject("The API action requires authentication"):Promise.resolve({})}},{key:"loadCart",value:function(){var e=localStorage.getItem(this.cartKey);if(e){var t=JSON.parse(e);this.settings=t.settings,this.line_items=t.line_items||{}}else this.settings=null,this.line_items={}}},{key:"loadSettings",value:function(){var t=this;return this.settingsAreFresh()?Promise.resolve():e(this.settings_path).then(function(e){if(e.ok)return e.json().then(function(e){t.settings=i(e,{ts:(new Date).getTime()})})})}},{key:"settingsAreFresh",value:function(){return null==this.settings_path||!!this.settings&&(new Date).getTime()-this.settings.ts<this.settings_refresh_period}},{key:"verifyVatnumber",value:function(e){var t=this;return this.vatnumber_valid=!1,e?l[e]?(this.vatnumber_valid=l[e].valid,Promise.resolve(!1)):this.api.request("/vatnumbers/"+e).then(function(r){return l[e]=r,t.vatnumber_valid=r.valid,r.valid}):(this.vatnumber_valid=!1,Promise.resolve(!1))}},{key:"verifyCoupon",value:function(e){var t=this;return this.authHeaders(!1).then(function(r){return t.api.request("/coupons/"+e,{headers:r})})}},{key:"persistCart",value:function(){var e=JSON.stringify({line_items:this.line_items,settings:this.settings});localStorage.setItem(this.cartKey,e)}}]),t}();t.default=v,"undefined"!=typeof window&&(window.GoCommerce=v)}).call(this,r(107))},606:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(670),s=o(i),a=o(r(700));function o(e){return e&&e.__esModule?e:{default:e}}var u=/^http:\/\//,c=function(){function e(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},r=t.APIUrl,n=void 0===r?"/.netlify/identity":r,i=t.audience,a=void 0===i?"":i,o=t.setCookie,c=void 0!==o&&o;!function(t,r){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),n.match(u)&&console.warn("Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!\nGoTrue REQUIRES HTTPS to work securely."),a&&(this.audience=a),this.setCookie=c,this.api=new s.default(n)}return n(e,[{key:"_request",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};t.headers=t.headers||{};var r=t.audience||this.audience;return r&&(t.headers["X-JWT-AUD"]=r),this.api.request(e,t).catch(function(e){return e instanceof i.JSONHTTPError&&e.json&&(e.json.msg?e.message=e.json.msg:e.json.error&&(e.message=e.json.error+": "+e.json.error_description)),Promise.reject(e)})}},{key:"settings",value:function(){return this._request("/settings")}},{key:"signup",value:function(e,t,r){return this._request("/signup",{method:"POST",body:JSON.stringify({email:e,password:t,data:r})})}},{key:"login",value:function(e,t,r){var n=this;return this._setRememberHeaders(r),this._request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username="+encodeURIComponent(e)+"&password="+encodeURIComponent(t)}).then(function(e){return a.default.removeSavedSession(),n.createUser(e,r)})}},{key:"loginExternalUrl",value:function(e){return this.api.apiURL+"/authorize?provider="+e}},{key:"confirm",value:function(e,t){return this._setRememberHeaders(t),this.verify("signup",e,t)}},{key:"requestPasswordRecovery",value:function(e){return this._request("/recover",{method:"POST",body:JSON.stringify({email:e})})}},{key:"recover",value:function(e,t){return this._setRememberHeaders(t),this.verify("recovery",e,t)}},{key:"acceptInvite",value:function(e,t,r){var n=this;return this._setRememberHeaders(r),this._request("/verify",{method:"POST",body:JSON.stringify({token:e,password:t,type:"signup"})}).then(function(e){return n.createUser(e,r)})}},{key:"acceptInviteExternalUrl",value:function(e,t){return this.api.apiURL+"/authorize?provider="+e+"&invite_token="+t}},{key:"createUser",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];return this._setRememberHeaders(t),new a.default(this.api,e,this.audience).getUserData().then(function(e){return t&&e._saveSession(),e})}},{key:"currentUser",value:function(){var e=a.default.recoverSession(this.api);return e&&this._setRememberHeaders(e._fromStorage),e}},{key:"verify",value:function(e,t,r){var n=this;return this._setRememberHeaders(r),this._request("/verify",{method:"POST",body:JSON.stringify({token:t,type:e})}).then(function(e){return n.createUser(e,r)})}},{key:"_setRememberHeaders",value:function(e){this.setCookie&&(this.api.defaultHeaders=this.api.defaultHeaders||{},this.api.defaultHeaders["X-Use-Cookie"]=e?"1":"session")}}]),e}();t.default=c,"undefined"!=typeof window&&(window.GoTrue=c)},669:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.checkClaims=function(e,t){if(!t)return!0;if(!e)return!1;for(var r in t)for(var n=r.split("."),i=e,s=0;s<n.length;s++){var a=i[n[s]];if(!a)return!1;if(s===n.length-1)return a===t[r];i=a}return!1}},670:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.JSONHTTPError=t.TextHTTPError=t.HTTPError=t.getPagination=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(699);function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"getPagination",{enumerable:!0,get:function(){return s.getPagination}});var c=t.HTTPError=function(e){function t(e){a(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e.statusText));return r.name=r.constructor.name,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(r,r.constructor):r.stack=new Error(e.statusText).stack,r.status=e.status,r}return u(t,function(e){function t(){var t=Reflect.construct(e,Array.from(arguments));return Object.setPrototypeOf(t,Object.getPrototypeOf(this)),t}return t.prototype=Object.create(e.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e,t}(Error)),t}(),l=t.TextHTTPError=function(e){function t(e,r){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.data=r,n}return u(t,c),t}(),h=t.JSONHTTPError=function(e){function t(e,r){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.json=r,n}return u(t,c),t}(),d=function(){function t(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",r=arguments[1];a(this,t),this.apiURL=e,this.apiURL.match(/\/[^\/]?/)&&(this._sameOrigin=!0),this.defaultHeaders=r&&r.defaultHeaders||{}}return i(t,[{key:"headers",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return n({},this.defaultHeaders,{"Content-Type":"application/json"},e)}},{key:"parseJsonResponse",value:function(e){return e.json().then(function(t){if(!e.ok)return Promise.reject(new h(e,t));var r=(0,s.getPagination)(e);return r?{pagination:r,items:t}:t})}},{key:"request",value:function(t){var r=this,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},s=this.headers(i.headers||{});return this._sameOrigin&&(i.credentials=i.credentials||"same-origin"),e(this.apiURL+t,n({},i,{headers:s})).then(function(e){var t=e.headers.get("Content-Type");return t&&t.match(/json/)?r.parseJsonResponse(e):e.ok?e.text().then(function(e){}):e.text().then(function(t){return Promise.reject(new l(e,t))})})}}]),t}();t.default=d}).call(this,r(107))},696:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(697),a=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.apiURL=e}return i(t,[{key:"headers",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return n({"Content-Type":"application/json"},e)}},{key:"parseJsonResponse",value:function(e){return e.json().then(function(t){if(!e.ok)return Promise.reject(t);var r=(0,s.getPagination)(e);return r?{pagination:r,items:t}:t})}},{key:"request",value:function(t){var r=this,i=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},s=this.headers(i.headers||{});return e(this.apiURL+t,n({},i,{headers:s})).then(function(e){var t=e.headers.get("Content-Type");return t&&t.match(/json/)?r.parseJsonResponse(e):e.text().then(function(t){return e.ok?{data:t}:Promise.reject({data:t})})})}}]),t}();t.default=a}).call(this,r(107))},697:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,s=void 0;try{for(var a,o=e[Symbol.iterator]();!(n=(a=o.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,s=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw s}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.getPagination=function(e){var t=e.headers.get("Link"),r={};if(null==t)return null;t=t.split(",");for(var i=e.headers.get("X-Total-Count"),s=0,a=t.length;s<a;s++){var o=t[s].replace(/(^\s*|\s*$)/,"").split(";"),u=n(o,2),c=u[0],l=u[1],h=c.match(/page=(\d+)/),d=h&&parseInt(h[1],10);l.match(/last/)?r.last=d:l.match(/next/)?r.next=d:l.match(/prev/)?r.prev=d:l.match(/first/)&&(r.first=d)}return r.last=Math.max(r.last||0,r.prev&&r.prev+1||0),r.current=r.next?r.next-1:r.last||1,r.total=i?parseInt(i,10):null,r}},698:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.calculatePrices=function(e,t,r,n,s,h){var d=new i;return d.items=[],h&&h.forEach(function(h){var f=new i;f.quantity=h.quantity||1;var p=h.price.cents+(h.addonPrice?h.addonPrice.cents:0),v=l(p,p,h,e,r).netTotal;f.subtotal=v,s&&a(t,s,h)&&(f.discount=c(p,s.percentage,o(s.fixed,n)),f.couponDiscount=f.discount,f.discountItems.push(u("coupon",s.percentage,o(s.fixed,n)))),e&&e.member_discounts&&e.member_discounts.forEach(function(e){if(a(t,e,h)){var r=c(p,e.percentage,o(e.fixed,n));f.discount=f.discount||0,f.discount+=r,f.memberDiscount=f.memberDiscount||0,f.memberDiscount+=r,f.discountItems.push(u("member",e.percentage,o(e.fixed,n)))}});var m=l(Math.max(0,p-f.discount),p,h,e,r),y=m.taxes,g=m.netTotal;f.taxes=y,f.netTotal=g,f.total=f.netTotal+f.taxes,d.items.push(f),d.subtotal+=f.subtotal*f.quantity,d.discount+=f.discount*f.quantity,d.couponDiscount+=f.couponDiscount*f.quantity,d.memberDiscount+=f.memberDiscount*f.quantity,d.netTotal+=f.netTotal*f.quantity,d.taxes+=f.taxes*f.quantity,d.total+=f.total*f.quantity}),d};var n=r(669),i=function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.subtotal=0,this.discount=0,this.couponDiscount=0,this.memberDiscount=0,this.discountItems=[],this.netTotal=0,this.taxes=0,this.total=0};function s(e,t,r){if(e&&e.taxes)for(var n in e.taxes){var i=e.taxes[n];if((null==i.countries||-1<i.countries.indexOf(t))&&(null==i.product_types||-1<i.product_types.indexOf(r)))return i}return null}function a(e,t,r){return!!(0,n.checkClaims)(e,t.claims)&&(t.product_types&&t.product_types.length?-1<t.product_types.indexOf(r.type):!t.products||!t.products.length||-1<t.products.indexOf(r.sku))}function o(e,t){var r=e&&e.filter(function(e){return e.currency===t})[0];return r&&Math.round(100*parseFloat(r.amount))||0}function u(e){return{type:e,percentage:1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,fixed:2<arguments.length&&void 0!==arguments[2]?arguments[2]:0}}function c(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,n=0;return 0<t&&(n=Math.round(e*t/100)),e<(n+=r)?e:n}function l(e,t,r,n,i){var a=n&&n.prices_include_taxes,o=e/t,u=[];if(r.vat)u.push({price:e,percentage:parseInt(r.vat,10)});else if(n&&r.price.items&&r.price.items.length)r.price.items.forEach(function(e){var t=e.cents*o,r=s(n,i,e.type);u.push({price:Math.round(t),percentage:r?r.percentage:0})});else{var c=s(n,i,r.type);c&&u.push({price:e,percentage:c.percentage})}var l=0,h=0;return u.length?u.forEach(function(e){if(a){var t=Math.round(e.price/(100+e.percentage)*100*(e.percentage/100));e.price-=t,l+=t}else l+=Math.round(e.price*e.percentage/100);h+=e.price}):h=e,{taxes:l,netTotal:h}}},699:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,s=void 0;try{for(var a,o=e[Symbol.iterator]();!(n=(a=o.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){i=!0,s=e}finally{try{!n&&o.return&&o.return()}finally{if(i)throw s}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.getPagination=function(e){var t=e.headers.get("Link"),r={};if(null==t)return null;t=t.split(",");for(var i=e.headers.get("X-Total-Count"),s=0,a=t.length;s<a;s++){var o=t[s].replace(/(^\s*|\s*$)/,"").split(";"),u=n(o,2),c=u[0],l=u[1],h=c.match(/page=(\d+)/),d=h&&parseInt(h[1],10);l.match(/last/)?r.last=d:l.match(/next/)?r.next=d:l.match(/prev/)?r.prev=d:l.match(/first/)&&(r.first=d)}return r.last=Math.max(r.last||0,r.prev&&r.prev+1||0),r.current=r.next?r.next-1:r.last||1,r.total=i?parseInt(i,10):null,r}},700:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),s=r(670),a=u(s),o=u(r(701));function u(e){return e&&e.__esModule?e:{default:e}}var c="gotrue.user",l={},h=null,d={api:1,token:1,audience:1,url:1},f={api:1},p=function(){return"undefined"!=typeof window},v=function(){function e(t,r,n){!function(t,r){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),this.api=t,this.url=t.apiURL,this.audience=n,this._processTokenResponse(r),h=this}return i(e,[{key:"update",value:function(e){var t=this;return this._request("/user",{method:"PUT",body:JSON.stringify(e)}).then(function(e){return t._saveUserData(e)._refreshSavedSession()})}},{key:"jwt",value:function(e){var t=this.tokenDetails(),r=t.expires_at,n=t.refresh_token,i=t.access_token;return e||r-6e4<Date.now()?this._refreshToken(n):Promise.resolve(i)}},{key:"logout",value:function(){return this._request("/logout",{method:"POST"}).then(this.clearSession.bind(this)).catch(this.clearSession.bind(this))}},{key:"_refreshToken",value:function(e){var t=this;return l[e]?l[e]:l[e]=this.api.request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=refresh_token&refresh_token="+e}).then(function(r){return delete l[e],t._processTokenResponse(r),t._refreshSavedSession(),t.token.access_token}).catch(function(r){return delete l[e],t.clearSession(),Promise.reject(r)})}},{key:"_request",value:function(e){var t=this,r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};r.headers=r.headers||{};var i=r.audience||this.audience;return i&&(r.headers["X-JWT-AUD"]=i),this.jwt().then(function(i){return t.api.request(e,n({headers:Object.assign(r.headers,{Authorization:"Bearer "+i})},r)).catch(function(e){return e instanceof s.JSONHTTPError&&e.json&&(e.json.msg?e.message=e.json.msg:e.json.error&&(e.message=e.json.error+": "+e.json.error_description)),Promise.reject(e)})})}},{key:"getUserData",value:function(){return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this))}},{key:"_saveUserData",value:function(t,r){for(var n in t)n in e.prototype||n in d||(this[n]=t[n]);return r&&(this._fromStorage=!0),this}},{key:"_processTokenResponse",value:function(e){this.token=e;var t=void 0;try{t=JSON.parse(function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}var r=window.atob(t);try{return decodeURIComponent(escape(r))}catch(e){return r}}(e.access_token.split(".")[1])),this.token.expires_at=1e3*t.exp}catch(t){console.error(new Error("Gotrue-js: Failed to parse tokenResponse claims: "+JSON.stringify(e)))}}},{key:"_refreshSavedSession",value:function(){return p()&&localStorage.getItem(c)&&this._saveSession(),this}},{key:"_saveSession",value:function(){return p()&&localStorage.setItem(c,JSON.stringify(this._details)),this}},{key:"tokenDetails",value:function(){return this.token}},{key:"clearSession",value:function(){e.removeSavedSession(),this.token=null,h=null}},{key:"admin",get:function(){return new o.default(this)}},{key:"_details",get:function(){var t={};for(var r in this)r in e.prototype||r in f||(t[r]=this[r]);return t}}],[{key:"removeSavedSession",value:function(){p()&&localStorage.removeItem(c)}},{key:"recoverSession",value:function(t){if(h)return h;var r=p()&&localStorage.getItem(c);if(r)try{var n=JSON.parse(r),i=n.url,s=n.token,o=n.audience;return i&&s?new e(t||new a.default(i,{}),s,o)._saveUserData(n,!0):null}catch(t){return console.error(new Error("Gotrue-js: Error recovering session: "+t)),null}return null}}]),e}();t.default=v},701:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.user=t}return n(e,[{key:"listUsers",value:function(e){return this.user._request("/admin/users",{method:"GET",audience:e})}},{key:"getUser",value:function(e){return this.user._request("/admin/users/"+e.id)}},{key:"updateUser",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};return this.user._request("/admin/users/"+e.id,{method:"PUT",body:JSON.stringify(t)})}},{key:"createUser",value:function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return r.email=e,r.password=t,this.user._request("/admin/users",{method:"POST",body:JSON.stringify(r)})}},{key:"deleteUser",value:function(e){return this.user._request("/admin/users/"+e.id,{method:"DELETE"})}}]),e}();t.default=i}}]);