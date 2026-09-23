(()=>{var Di={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ni={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ld=0,Tc=1,cd=2;var $r=1,hd=2,Ys=3,qn=0,tn=1,an=2,Yn=0,Ks=1,Ac=2,Cc=3,Rc=4,ud=5;var ns=100,dd=101,fd=102,pd=103,md=104,gd=200,_d=201,xd=202,yd=203,Ic=204,Pc=205,vd=206,bd=207,Md=208,Sd=209,Ed=210,wd=211,Td=212,Ad=213,Cd=214,Qo=0,ea=1,ta=2,Ps=3,na=4,ia=5,sa=6,ra=7,Ta=0,Rd=1,Id=2,Pn=0,Lc=1,Dc=2,Nc=3,Uc=4,Fc=5,Oc=6,Bc=7,_c="attached",Pd="detached",kc=300,Ui=301,is=302,Aa=303,Ca=304,qr=306,Ti=1e3,yn=1001,Ls=1002,Rt=1003,Ra=1004;var ss=1005;var It=1006,Zs=1007;var Ln=1008;var ln=1009,zc=1010,Hc=1011,js=1012,Ia=1013,Dn=1014,mn=1015,Nn=1016,Pa=1017,La=1018,Js=1020,Vc=35902,Gc=35899,Wc=1021,Xc=1022,gn=1023,Vn=1026,Fi=1027,Da=1028,Na=1029,Oi=1030,Ua=1031;var Fa=1033,Yr=33776,Kr=33777,Zr=33778,jr=33779,Oa=35840,Ba=35841,ka=35842,za=35843,Ha=36196,Va=37492,Ga=37496,Wa=37488,Xa=37489,Jr=37490,$a=37491,qa=37808,Ya=37809,Ka=37810,Za=37811,ja=37812,Ja=37813,Qa=37814,el=37815,tl=37816,nl=37817,il=37818,sl=37819,rl=37820,ol=37821,al=36492,ll=36494,cl=36495,hl=36283,ul=36284,Qr=36285,dl=36286,Ld=2200,Dd=2201,Nd=2202,Yi=2300,Ki=2301,Zo=2302,xc=2303,Xi=2400,$i=2401,br=2402,fl=2500,Ud=2501,$c=0,eo=1,Qs=2,Fd=3200;var to=0,Od=1,fi="",Nt="srgb",Jt="srgb-linear",Mr="linear",rt="srgb";var jo=7680;var Bd=519,kd=512,zd=513,Hd=514,pl=515,Vd=516,Gd=517,ml=518,Wd=519,qc=35044;var Yc="300 es",An=2e3,Ds=2001;function Jp(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Qp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ns(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xd(){let i=Ns("canvas");return i.style.display="block",i}var wu={},Us=null;function Sr(...i){let e="THREE."+i.shift();Us?Us("log",e,...i):console.log(e,...i)}function $d(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ie(...i){i=$d(i);let e="THREE."+i.shift();if(Us)Us("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function He(...i){i=$d(i);let e="THREE."+i.shift();if(Us)Us("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function qi(...i){let e=i.join(" ");e in wu||(wu[e]=!0,Ie(...i))}function qd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Yd={[Qo]:ea,[ta]:sa,[na]:ra,[Ps]:ia,[ea]:Qo,[sa]:ta,[ra]:na,[ia]:Ps},vn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},$t=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Tu=1234567,yr=Math.PI/180,Zi=180/Math.PI;function Cn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($t[i&255]+$t[i>>8&255]+$t[i>>16&255]+$t[i>>24&255]+"-"+$t[e&255]+$t[e>>8&255]+"-"+$t[e>>16&15|64]+$t[e>>24&255]+"-"+$t[t&63|128]+$t[t>>8&255]+"-"+$t[t>>16&255]+$t[t>>24&255]+$t[n&255]+$t[n>>8&255]+$t[n>>16&255]+$t[n>>24&255]).toLowerCase()}function Ze(i,e,t){return Math.max(e,Math.min(t,i))}function Kc(i,e){return(i%e+e)%e}function em(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function tm(i,e,t){return i!==e?(t-i)/(e-i):0}function vr(i,e,t){return(1-t)*i+t*e}function nm(i,e,t,n){return vr(i,e,1-Math.exp(-t*n))}function im(i,e=1){return e-Math.abs(Kc(i,e*2)-e)}function sm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function rm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function om(i,e){return i+Math.floor(Math.random()*(e-i+1))}function am(i,e){return i+Math.random()*(e-i)}function lm(i){return i*(.5-Math.random())}function cm(i){i!==void 0&&(Tu=i);let e=Tu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hm(i){return i*yr}function um(i){return i*Zi}function dm(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function fm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function pm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function mm(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),p=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*p,a*l);break;case"YXY":i.set(c*p,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*p,a*h,a*l);break;default:Ie("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Tn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ot(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var rs={DEG2RAD:yr,RAD2DEG:Zi,generateUUID:Cn,clamp:Ze,euclideanModulo:Kc,mapLinear:em,inverseLerp:tm,lerp:vr,damp:nm,pingpong:im,smoothstep:sm,smootherstep:rm,randInt:om,randFloat:am,randFloatSpread:lm,seededRandom:cm,degToRad:hm,radToDeg:um,isPowerOfTwo:dm,ceilPowerOfTwo:fm,floorPowerOfTwo:pm,setQuaternionFromProperEuler:mm,normalize:ot,denormalize:Tn},eh=class eh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};eh.prototype.isVector2=!0;var Ue=eh,Ut=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],p=r[o+1],g=r[o+2],x=r[o+3];if(u!==x||c!==d||l!==p||h!==g){let m=c*d+l*p+h*g+u*x;m<0&&(d=-d,p=-p,g=-g,x=-x,m=-m);let f=1-a;if(m<.9995){let M=Math.acos(m),A=Math.sin(M);f=Math.sin(f*M)/A,a=Math.sin(a*M)/A,c=c*f+d*a,l=l*f+p*a,h=h*f+g*a,u=u*f+x*a}else{c=c*f+d*a,l=l*f+p*a,h=h*f+g*a,u=u*f+x*a;let M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],p=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*p-l*d,e[t+1]=c*g+h*d+l*u-a*p,e[t+2]=l*g+h*p+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),p=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u+d*p*g;break;case"YZX":this._x=d*h*u+l*p*g,this._y=l*p*u+d*h*g,this._z=l*h*g-d*p*u,this._w=l*h*u-d*p*g;break;case"XZY":this._x=d*h*u-l*p*g,this._y=l*p*u-d*h*g,this._z=l*h*g+d*p*u,this._w=l*h*u+d*p*g;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(n>a&&n>u){let p=2*Math.sqrt(1+n-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-n-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-n-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},th=class th{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Au.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Au.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ql.copy(this).projectOnVector(e),this.sub(ql)}reflect(e){return this.sub(ql.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Ze(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};th.prototype.isVector3=!0;var W=th,ql=new W,Au=new Ut,nh=class nh{constructor(e,t,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],x=s[0],m=s[3],f=s[6],M=s[1],A=s[4],b=s[7],T=s[2],w=s[5],y=s[8];return r[0]=o*x+a*M+c*T,r[3]=o*m+a*A+c*w,r[6]=o*f+a*b+c*y,r[1]=l*x+h*M+u*T,r[4]=l*m+h*A+u*w,r[7]=l*f+h*b+u*y,r[2]=d*x+p*M+g*T,r[5]=d*m+p*A+g*w,r[8]=d*f+p*b+g*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,g=t*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=d*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=p*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return qi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Yl.makeScale(e,t)),this}rotate(e){return qi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Yl.makeRotation(-e)),this}translate(e,t){return qi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Yl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};nh.prototype.isMatrix3=!0;var Ve=nh,Yl=new Ve,Cu=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ru=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gm(){let i={enabled:!0,workingColorSpace:Jt,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===rt&&(s.r=ri(s.r),s.g=ri(s.g),s.b=ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(s.r=Is(s.r),s.g=Is(s.g),s.b=Is(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===fi?Mr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return qi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return qi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Jt]:{primaries:e,whitePoint:n,transfer:Mr,toXYZ:Cu,fromXYZ:Ru,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:Cu,fromXYZ:Ru,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),i}var Ke=gm();function ri(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var gs,oa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gs===void 0&&(gs=Ns("canvas")),gs.width=e.width,gs.height=e.height;let s=gs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=gs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ns("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ri(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},_m=0,Fs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_m++}),this.uuid=Cn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Kl(s[o].image)):r.push(Kl(s[o]))}else r=Kl(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Kl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?oa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}var xm=0,Zl=new W,Vt=class i extends vn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=yn,s=yn,r=It,o=Ln,a=gn,c=ln,l=i.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=Cn(),this.name="",this.source=new Fs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ue(0,0),this.repeat=new Ue(1,1),this.center=new Ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Zl).x}get height(){return this.source.getSize(Zl).y}get depth(){return this.source.getSize(Zl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ie(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ie(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ti:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case Ls:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ti:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case Ls:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Vt.DEFAULT_IMAGE=null;Vt.DEFAULT_MAPPING=kc;Vt.DEFAULT_ANISOTROPY=1;var ih=class ih{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],g=c[9],x=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(l+1)/2,b=(p+1)/2,T=(f+1)/2,w=(h+d)/4,y=(u+x)/4,_=(g+m)/4;return A>b&&A>T?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=w/n,r=y/n):b>T?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=w/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=y/r,s=_/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-x)/M,this.z=(d-h)/M,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ze(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ih.prototype.isVector4=!0;var at=ih,aa=class extends vn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Vt(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Fs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},sn=class extends aa{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Er=class extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var la=class extends Vt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var wa=class wa{constructor(e,t,n,s,r,o,a,c,l,h,u,d,p,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,p,g,x,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,p,g,x,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new wa().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/_s.setFromMatrixColumn(e,0).length(),r=1/_s.setFromMatrixColumn(e,1).length(),o=1/_s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,p=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=p+g*l,t[5]=d-x*l,t[9]=-a*c,t[2]=x-d*l,t[6]=g+p*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,p=c*u,g=l*h,x=l*u;t[0]=d+x*a,t[4]=g*a-p,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=p*a-g,t[6]=x+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,p=c*u,g=l*h,x=l*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+p*a,t[1]=p+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,p=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=g*l-p,t[8]=d*l+x,t[1]=c*u,t[5]=x*l+d,t[9]=p*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,p=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=x-d*u,t[8]=g*u+p,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=p*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*c,p=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+x,t[5]=o*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ym,e,vm)}lookAt(e,t,n){let s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),yi.crossVectors(n,un),yi.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),yi.crossVectors(n,un)),yi.normalize(),wo.crossVectors(un,yi),s[0]=yi.x,s[4]=wo.x,s[8]=un.x,s[1]=yi.y,s[5]=wo.y,s[9]=un.y,s[2]=yi.z,s[6]=wo.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],x=n[6],m=n[10],f=n[14],M=n[3],A=n[7],b=n[11],T=n[15],w=s[0],y=s[4],_=s[8],E=s[12],R=s[1],P=s[5],O=s[9],L=s[13],C=s[2],N=s[6],F=s[10],k=s[14],Q=s[3],K=s[7],J=s[11],te=s[15];return r[0]=o*w+a*R+c*C+l*Q,r[4]=o*y+a*P+c*N+l*K,r[8]=o*_+a*O+c*F+l*J,r[12]=o*E+a*L+c*k+l*te,r[1]=h*w+u*R+d*C+p*Q,r[5]=h*y+u*P+d*N+p*K,r[9]=h*_+u*O+d*F+p*J,r[13]=h*E+u*L+d*k+p*te,r[2]=g*w+x*R+m*C+f*Q,r[6]=g*y+x*P+m*N+f*K,r[10]=g*_+x*O+m*F+f*J,r[14]=g*E+x*L+m*k+f*te,r[3]=M*w+A*R+b*C+T*Q,r[7]=M*y+A*P+b*N+T*K,r[11]=M*_+A*O+b*F+T*J,r[15]=M*E+A*L+b*k+T*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],x=e[7],m=e[11],f=e[15],M=c*p-l*d,A=a*p-l*u,b=a*d-c*u,T=o*p-l*h,w=o*d-c*h,y=o*u-a*h;return t*(x*M-m*A+f*b)-n*(g*M-m*T+f*w)+s*(g*A-x*T+f*y)-r*(g*b-x*w+m*y)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],x=e[13],m=e[14],f=e[15],M=t*a-n*o,A=t*c-s*o,b=t*l-r*o,T=n*c-s*a,w=n*l-r*a,y=s*l-r*c,_=h*x-u*g,E=h*m-d*g,R=h*f-p*g,P=u*m-d*x,O=u*f-p*x,L=d*f-p*m,C=M*L-A*O+b*P+T*R-w*E+y*_;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/C;return e[0]=(a*L-c*O+l*P)*N,e[1]=(s*O-n*L-r*P)*N,e[2]=(x*y-m*w+f*T)*N,e[3]=(d*w-u*y-p*T)*N,e[4]=(c*R-o*L-l*E)*N,e[5]=(t*L-s*R+r*E)*N,e[6]=(m*b-g*y-f*A)*N,e[7]=(h*y-d*b+p*A)*N,e[8]=(o*O-a*R+l*_)*N,e[9]=(n*R-t*O-r*_)*N,e[10]=(g*w-x*b+f*M)*N,e[11]=(u*b-h*w-p*M)*N,e[12]=(a*E-o*P-c*_)*N,e[13]=(t*P-n*E+s*_)*N,e[14]=(x*A-g*T-m*M)*N,e[15]=(h*T-u*A+d*M)*N,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,g=r*u,x=o*h,m=o*u,f=a*u,M=c*l,A=c*h,b=c*u,T=n.x,w=n.y,y=n.z;return s[0]=(1-(x+f))*T,s[1]=(p+b)*T,s[2]=(g-A)*T,s[3]=0,s[4]=(p-b)*w,s[5]=(1-(d+f))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(g+A)*y,s[9]=(m-M)*y,s[10]=(1-(d+x))*y,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=_s.set(s[0],s[1],s[2]).length(),a=_s.set(s[4],s[5],s[6]).length(),c=_s.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Sn.copy(this);let l=1/o,h=1/a,u=1/c;return Sn.elements[0]*=l,Sn.elements[1]*=l,Sn.elements[2]*=l,Sn.elements[4]*=h,Sn.elements[5]*=h,Sn.elements[6]*=h,Sn.elements[8]*=u,Sn.elements[9]*=u,Sn.elements[10]*=u,t.setFromRotationMatrix(Sn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=An,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),p=(n+s)/(n-s),g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===An)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Ds)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=An,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),p=-(n+s)/(n-s),g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===An)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===Ds)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};wa.prototype.isMatrix4=!0;var We=wa,_s=new W,Sn=new We,ym=new W(0,0,0),vm=new W(1,1,1),yi=new W,wo=new W,un=new W,Iu=new We,Pu=new Ut,Gn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Iu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Iu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pu.setFromEuler(this),this.setFromQuaternion(Pu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Gn.DEFAULT_ORDER="XYZ";var wr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},bm=0,Lu=new W,xs=new Ut,Qn=new We,To=new W,ur=new W,Mm=new W,Sm=new Ut,Du=new W(1,0,0),Nu=new W(0,1,0),Uu=new W(0,0,1),Fu={type:"added"},Em={type:"removed"},ys={type:"childadded",child:null},jl={type:"childremoved",child:null},bt=class i extends vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new W,t=new Gn,n=new Ut,s=new W(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new We},normalMatrix:{value:new Ve}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(Du,e)}rotateY(e){return this.rotateOnAxis(Nu,e)}rotateZ(e){return this.rotateOnAxis(Uu,e)}translateOnAxis(e,t){return Lu.copy(e).applyQuaternion(this.quaternion),this.position.add(Lu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Du,e)}translateY(e){return this.translateOnAxis(Nu,e)}translateZ(e){return this.translateOnAxis(Uu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?To.copy(e):To.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(ur,To,this.up):Qn.lookAt(To,ur,this.up),this.quaternion.setFromRotationMatrix(Qn),s&&(Qn.extractRotation(s.matrixWorld),xs.setFromRotationMatrix(Qn),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Fu),ys.child=e,this.dispatchEvent(ys),ys.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Em),jl.child=e,this.dispatchEvent(jl),jl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Fu),ys.child=e,this.dispatchEvent(ys),ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,e,Mm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ur,Sm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};bt.DEFAULT_UP=new W(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var nn=class extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}},wm={type:"move"},Os=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new nn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new nn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new nn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),f=this._getHandJoint(l,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;l.inputState.pinching&&d>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new nn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vi={h:0,s:0,l:0},Ao={h:0,s:0,l:0};function Jl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var De=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=Kc(e,1),t=Ze(t,0,1),n=Ze(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Jl(o,r,e+1/3),this.g=Jl(o,r,e),this.b=Jl(o,r,e-1/3)}return Ke.colorSpaceToWorking(this,s),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ie("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=Kd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=Is(e.r),this.g=Is(e.g),this.b=Is(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return Ke.workingToColorSpace(qt.copy(this),e),Math.round(Ze(qt.r*255,0,255))*65536+Math.round(Ze(qt.g*255,0,255))*256+Math.round(Ze(qt.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.workingToColorSpace(qt.copy(this),t);let n=qt.r,s=qt.g,r=qt.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.workingToColorSpace(qt.copy(this),t),e.r=qt.r,e.g=qt.g,e.b=qt.b,e}getStyle(e=Nt){Ke.workingToColorSpace(qt.copy(this),e);let t=qt.r,n=qt.g,s=qt.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(vi),this.setHSL(vi.h+e,vi.s+t,vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vi),e.getHSL(Ao);let n=vr(vi.h,Ao.h,t),s=vr(vi.s,Ao.s,t),r=vr(vi.l,Ao.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},qt=new De;De.NAMES=Kd;var Ai=class extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Gn,this.environmentIntensity=1,this.environmentRotation=new Gn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},En=new W,ei=new W,Ql=new W,ti=new W,vs=new W,bs=new W,Ou=new W,ec=new W,tc=new W,nc=new W,ic=new at,sc=new at,rc=new at,wi=class i{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),En.subVectors(e,t),s.cross(En);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){En.subVectors(s,t),ei.subVectors(n,t),Ql.subVectors(e,t);let o=En.dot(En),a=En.dot(ei),c=En.dot(Ql),l=ei.dot(ei),h=ei.dot(Ql),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ti.x),c.addScaledVector(o,ti.y),c.addScaledVector(a,ti.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return ic.setScalar(0),sc.setScalar(0),rc.setScalar(0),ic.fromBufferAttribute(e,t),sc.fromBufferAttribute(e,n),rc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ic,r.x),o.addScaledVector(sc,r.y),o.addScaledVector(rc,r.z),o}static isFrontFacing(e,t,n,s){return En.subVectors(n,t),ei.subVectors(e,t),En.cross(ei).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),En.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;vs.subVectors(s,n),bs.subVectors(r,n),ec.subVectors(e,n);let c=vs.dot(ec),l=bs.dot(ec);if(c<=0&&l<=0)return t.copy(n);tc.subVectors(e,s);let h=vs.dot(tc),u=bs.dot(tc);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(vs,o);nc.subVectors(e,r);let p=vs.dot(nc),g=bs.dot(nc);if(g>=0&&p<=g)return t.copy(r);let x=p*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(bs,a);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Ou.subVectors(r,s),a=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(Ou,a);let f=1/(m+x+d);return o=x*f,a=d*f,t.copy(n).addScaledVector(vs,o).addScaledVector(bs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qt=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Co.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Co.copy(n.boundingBox)),Co.applyMatrix4(e.matrixWorld),this.union(Co)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(dr),Ro.subVectors(this.max,dr),Ms.subVectors(e.a,dr),Ss.subVectors(e.b,dr),Es.subVectors(e.c,dr),bi.subVectors(Ss,Ms),Mi.subVectors(Es,Ss),Hi.subVectors(Ms,Es);let t=[0,-bi.z,bi.y,0,-Mi.z,Mi.y,0,-Hi.z,Hi.y,bi.z,0,-bi.x,Mi.z,0,-Mi.x,Hi.z,0,-Hi.x,-bi.y,bi.x,0,-Mi.y,Mi.x,0,-Hi.y,Hi.x,0];return!oc(t,Ms,Ss,Es,Ro)||(t=[1,0,0,0,1,0,0,0,1],!oc(t,Ms,Ss,Es,Ro))?!1:(Io.crossVectors(bi,Mi),t=[Io.x,Io.y,Io.z],oc(t,Ms,Ss,Es,Ro))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ni[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ni[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ni[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ni[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ni[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ni[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ni[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ni[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ni),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ni=[new W,new W,new W,new W,new W,new W,new W,new W],wn=new W,Co=new Qt,Ms=new W,Ss=new W,Es=new W,bi=new W,Mi=new W,Hi=new W,dr=new W,Ro=new W,Io=new W,Vi=new W;function oc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Vi.fromArray(i,r);let a=s.x*Math.abs(Vi.x)+s.y*Math.abs(Vi.y)+s.z*Math.abs(Vi.z),c=e.dot(Vi),l=t.dot(Vi),h=n.dot(Vi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Dt=new W,Po=new Ue,Tm=0,wt=class extends vn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Tm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qc,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Po.fromBufferAttribute(this,t),Po.applyMatrix3(e),this.setXY(t,Po.x,Po.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Tn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Tn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Tn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Tn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array),r=ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Tr=class extends wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Ar=class extends wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ht=class extends wt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Am=new Qt,fr=new W,ac=new W,rn=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Am.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fr.subVectors(e,this.center);let t=fr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(fr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ac.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fr.copy(e.center).add(ac)),this.expandByPoint(fr.copy(e.center).sub(ac))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Cm=0,xn=new We,lc=new bt,ws=new W,dn=new Qt,pr=new Qt,zt=new W,Ft=class i extends vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cm++}),this.uuid=Cn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jp(e)?Ar:Tr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ve().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,n){return xn.makeTranslation(e,t,n),this.applyMatrix4(xn),this}scale(e,t,n){return xn.makeScale(e,t,n),this.applyMatrix4(xn),this}lookAt(e){return lc.lookAt(e),lc.updateMatrix(),this.applyMatrix4(lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ht(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];dn.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){let n=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];pr.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(dn.min,pr.min),dn.expandByPoint(zt),zt.addVectors(dn.max,pr.max),dn.expandByPoint(zt)):(dn.expandByPoint(pr.min),dn.expandByPoint(pr.max))}dn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(zt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)zt.fromBufferAttribute(a,l),c&&(ws.fromBufferAttribute(e,l),zt.add(ws)),s=Math.max(s,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new wt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let _=0;_<n.count;_++)a[_]=new W,c[_]=new W;let l=new W,h=new W,u=new W,d=new Ue,p=new Ue,g=new Ue,x=new W,m=new W;function f(_,E,R){l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,R),d.fromBufferAttribute(r,_),p.fromBufferAttribute(r,E),g.fromBufferAttribute(r,R),h.sub(l),u.sub(l),p.sub(d),g.sub(d);let P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(P),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(P),a[_].add(x),a[E].add(x),a[R].add(x),c[_].add(m),c[E].add(m),c[R].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let _=0,E=M.length;_<E;++_){let R=M[_],P=R.start,O=R.count;for(let L=P,C=P+O;L<C;L+=3)f(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let A=new W,b=new W,T=new W,w=new W;function y(_){T.fromBufferAttribute(s,_),w.copy(T);let E=a[_];A.copy(E),A.sub(T.multiplyScalar(T.dot(E))).normalize(),b.crossVectors(w,E);let P=b.dot(c[_])<0?-1:1;o.setXYZW(_,A.x,A.y,A.z,P)}for(let _=0,E=M.length;_<E;++_){let R=M[_],P=R.start,O=R.count;for(let L=P,C=P+O;L<C;L+=3)y(e.getX(L+0)),y(e.getX(L+1)),y(e.getX(L+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let s=new W,r=new W,o=new W,a=new W,c=new W,l=new W,h=new W,u=new W;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),p=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?p=c[x]*a.data.stride+a.offset:p=c[x]*h;for(let f=0;f<h;f++)d[g++]=l[p++]}return new wt(d,h,u)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],p=e(d,n);c.push(p)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Bs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qc,this.updateRanges=[],this.version=0,this.uuid=Cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},jt=new W,ks=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Tn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Tn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Tn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Tn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Tn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),s=ot(s,this.array),r=ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Sr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Sr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},cc=new W,Rm=new W,Im=new Ve,fn=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=cc.subVectors(n,t).cross(Rm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(cc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Im.getNormalMatrix(e),s=this.coplanarPoint(cc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Pm=0,en=class extends vn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=Cn(),this.name="",this.type="Material",this.blending=Ks,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Pc,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=Ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jo,this.stencilZFail=jo,this.stencilZPass=jo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ie(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ie(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new De().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new fn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ue().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ii=new W,hc=new W,Lo=new W,Do=new W,oi=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ii.copy(this.origin).addScaledVector(this.direction,t),ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){hc.copy(e).add(t).multiplyScalar(.5),Lo.copy(t).sub(e).normalize(),Do.copy(this.origin).sub(hc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Lo),a=Do.dot(this.direction),c=-Do.dot(Lo),l=Do.lengthSq(),h=Math.abs(1-o*o),u,d,p,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(hc).addScaledVector(Lo,d),p}intersectSphere(e,t){if(e.radius<0)return null;ii.subVectors(e.center,this.origin);let n=ii.dot(this.direction),s=ii.dot(ii)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ii)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,p=e.z-o.z,g=t.x-o.x,x=t.y-o.y,m=t.z-o.z,f=n.x-o.x,M=n.y-o.y,A=n.z-o.z,b=Math.abs(c),T=Math.abs(l),w=Math.abs(h),y,_,E,R,P,O,L,C,N,F,k,Q;if(b>=T&&b>=w?(E=c,O=u,N=g,Q=f,c>=0?(y=l,_=h,R=d,P=p,L=x,C=m,F=M,k=A):(y=h,_=l,R=p,P=d,L=m,C=x,F=A,k=M)):T>=w?(E=l,O=d,N=x,Q=M,l>=0?(y=h,_=c,R=p,P=u,L=m,C=g,F=A,k=f):(y=c,_=h,R=u,P=p,L=g,C=m,F=f,k=A)):(E=h,O=p,N=m,Q=A,h>=0?(y=c,_=l,R=u,P=d,L=g,C=x,F=f,k=M):(y=l,_=c,R=d,P=u,L=x,C=g,F=M,k=f)),E===0)return null;let K=y/E,J=_/E,te=1/E,ce=R-K*O,le=P-J*O,Oe=L-K*N,pe=C-J*N,Ne=F-K*Q,U=k-J*Q,X=Ne*pe-U*Oe,ie=ce*U-le*Ne,be=Oe*le-pe*ce;if(s){if(X<0||ie<0||be<0)return null}else if((X<0||ie<0||be<0)&&(X>0||ie>0||be>0))return null;let he=X+ie+be;if(he===0)return null;let ze=te*(X*O+ie*N+be*Q);return(he>0?ze<0:ze>0)?null:this.at(ze/he,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Rn=class extends en{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=Ta,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Bu=new We,Gi=new oi,No=new rn,ku=new W,Uo=new W,Fo=new W,Oo=new W,uc=new W,Bo=new W,zu=new W,ko=new W,Gt=class extends bt{constructor(e=new Ft,t=new Rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Bo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(uc.fromBufferAttribute(u,e),o?Bo.addScaledVector(uc,h):Bo.addScaledVector(uc.sub(t),h))}t.add(Bo)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(r),Gi.copy(e.ray).recast(e.near),!(No.containsPoint(Gi.origin)===!1&&(Gi.intersectSphere(No,ku)===null||Gi.origin.distanceToSquared(ku)>(e.far-e.near)**2))&&(Bu.copy(r).invert(),Gi.copy(e.ray).applyMatrix4(Bu),!(n.boundingBox!==null&&Gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),A=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let b=M,T=A;b<T;b+=3){let w=a.getX(b),y=a.getX(b+1),_=a.getX(b+2);s=zo(this,f,e,n,l,h,u,w,y,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let M=a.getX(m),A=a.getX(m+1),b=a.getX(m+2);s=zo(this,o,e,n,l,h,u,M,A,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=o[m.materialIndex],M=Math.max(m.start,p.start),A=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let b=M,T=A;b<T;b+=3){let w=b,y=b+1,_=b+2;s=zo(this,f,e,n,l,h,u,w,y,_),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(c.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let M=m,A=m+1,b=m+2;s=zo(this,o,e,n,l,h,u,M,A,b),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Lm(i,e,t,n,s,r,o,a){let c;if(e.side===tn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===qn,a),c===null)return null;ko.copy(a),ko.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(ko);return l<t.near||l>t.far?null:{distance:l,point:ko.clone(),object:i}}function zo(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,Uo),i.getVertexPosition(c,Fo),i.getVertexPosition(l,Oo);let h=Lm(i,e,t,n,Uo,Fo,Oo,zu);if(h){let u=new W;wi.getBarycoord(zu,Uo,Fo,Oo,u),s&&(h.uv=wi.getInterpolatedAttribute(s,a,c,l,u,new Ue)),r&&(h.uv1=wi.getInterpolatedAttribute(r,a,c,l,u,new Ue)),o&&(h.normal=wi.getInterpolatedAttribute(o,a,c,l,u,new W),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new W,materialIndex:0};wi.getNormal(Uo,Fo,Oo,d.normal),h.face=d,h.barycoord=u}return h}var mr=new at,Hu=new at,Vu=new at,Dm=new at,Gu=new We,Ho=new W,dc=new rn,Wu=new We,fc=new oi,Cr=class extends Gt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_c,this.bindMatrix=new We,this.bindMatrixInverse=new We,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ho),this.boundingBox.expandByPoint(Ho)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new rn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ho),this.boundingSphere.expandByPoint(Ho)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dc.copy(this.boundingSphere),dc.applyMatrix4(s),e.ray.intersectsSphere(dc)!==!1&&(Wu.copy(s).invert(),fc.copy(e.ray).applyMatrix4(Wu),!(this.boundingBox!==null&&fc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,fc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new at,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===_c?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Pd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ie("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Hu.fromBufferAttribute(s.attributes.skinIndex,e),Vu.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(mr.copy(t),t.set(0,0,0,0)):(mr.set(...t,1),t.set(0,0,0)),mr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Vu.getComponent(r);if(o!==0){let a=Hu.getComponent(r);Gu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Dm.copy(mr).applyMatrix4(Gu),o)}}return t.isVector4&&(t.w=mr.w),t.applyMatrix4(this.bindMatrixInverse)}},zs=class extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Hs=class extends Vt{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Rt,h=Rt,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Xu=new We,Nm=new We,Rr=class i{constructor(e=[],t=[]){this.uuid=Cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ie("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new We)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new We;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Nm;Xu.multiplyMatrices(a,t[r]),Xu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Hs(t,e,e,gn,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(Ie("Skeleton: No bone found with UUID:",r),o=new zs),this.bones.push(o),this.boneInverses.push(new We().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},ai=class extends wt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ts=new We,$u=new We,Vo=[],qu=new Qt,Um=new We,gr=new Gt,_r=new rn,ji=class extends Gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ai(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Um)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ts),qu.copy(e.boundingBox).applyMatrix4(Ts),this.boundingBox.union(qu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new rn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ts),_r.copy(e.boundingSphere).applyMatrix4(Ts),this.boundingSphere.union(_r)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(gr.geometry=this.geometry,gr.material=this.material,gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),_r.copy(this.boundingSphere),_r.applyMatrix4(n),e.ray.intersectsSphere(_r)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ts),$u.multiplyMatrices(n,Ts),gr.matrixWorld=$u,gr.raycast(e,Vo);for(let o=0,a=Vo.length;o<a;o++){let c=Vo[o];c.instanceId=r,c.object=this,t.push(c)}Vo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ai(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hs(new Float32Array(s*this.count),s,this.count,Da,mn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Wi=new rn,Fm=new Ue(.5,.5),Go=new W,Vs=class{constructor(e=new fn,t=new fn,n=new fn,s=new fn,r=new fn,o=new fn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=An,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],p=r[7],g=r[8],x=r[9],m=r[10],f=r[11],M=r[12],A=r[13],b=r[14],T=r[15];if(s[0].setComponents(l-o,p-h,f-g,T-M).normalize(),s[1].setComponents(l+o,p+h,f+g,T+M).normalize(),s[2].setComponents(l+a,p+u,f+x,T+A).normalize(),s[3].setComponents(l-a,p-u,f-x,T-A).normalize(),n)s[4].setComponents(c,d,m,b).normalize(),s[5].setComponents(l-c,p-d,f-m,T-b).normalize();else if(s[4].setComponents(l-c,p-d,f-m,T-b).normalize(),t===An)s[5].setComponents(l+c,p+d,f+m,T+b).normalize();else if(t===Ds)s[5].setComponents(c,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wi)}intersectsSprite(e){Wi.center.set(0,0,0);let t=Fm.distanceTo(e.center);return Wi.radius=.7071067811865476+t,Wi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Go.x=s.normal.x>0?e.max.x:e.min.x,Go.y=s.normal.y>0?e.max.y:e.min.y,Go.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Go)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ci=class extends en{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ca=new W,ha=new W,Yu=new We,xr=new oi,Wo=new rn,pc=new W,Ku=new W,Ji=class extends bt{constructor(e=new Ft,t=new Ci){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ca.fromBufferAttribute(t,s-1),ha.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ca.distanceTo(ha);e.setAttribute("lineDistance",new Ht(n,1))}else Ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wo.copy(n.boundingSphere),Wo.applyMatrix4(s),Wo.radius+=r,e.ray.intersectsSphere(Wo)===!1)return;Yu.copy(s).invert(),xr.copy(e.ray).applyMatrix4(Yu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=l){let f=h.getX(x),M=h.getX(x+1),A=Xo(this,e,xr,c,f,M,x);A&&t.push(A)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(p),f=Xo(this,e,xr,c,x,m,g-1);f&&t.push(f)}}else{let p=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=l){let f=Xo(this,e,xr,c,x,x+1,x);f&&t.push(f)}if(this.isLineLoop){let x=Xo(this,e,xr,c,g-1,p,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Xo(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(ca.fromBufferAttribute(a,s),ha.fromBufferAttribute(a,r),t.distanceSqToSegment(ca,ha,pc,Ku)>n)return;pc.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(pc);if(!(l<e.near||l>e.far))return{distance:l,point:Ku.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Zu=new W,ju=new W,Qi=class extends Ji{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Zu.fromBufferAttribute(t,s),ju.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Zu.distanceTo(ju);e.setAttribute("lineDistance",new Ht(n,1))}else Ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ir=class extends Ji{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Gs=class extends en{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ju=new We,yc=new oi,$o=new rn,qo=new W,Pr=class extends bt{constructor(e=new Ft,t=new Gs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$o.copy(n.boundingSphere),$o.applyMatrix4(s),$o.radius+=r,e.ray.intersectsSphere($o)===!1)return;Ju.copy(s).invert(),yc.copy(e.ray).applyMatrix4(Ju);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let g=d,x=p;g<x;g++){let m=l.getX(g);qo.fromBufferAttribute(u,m),Qu(qo,m,c,s,e,t,this)}}else{let d=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=d,x=p;g<x;g++)qo.fromBufferAttribute(u,g),Qu(qo,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Qu(i,e,t,n,s,r,o){let a=yc.distanceSqToPoint(i);if(a<t){let c=new W;yc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Lr=class extends Vt{constructor(e=[],t=Ui,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ri=class extends Vt{constructor(e,t,n=Dn,s,r,o,a=Rt,c=Rt,l,h=Vn,u=1){if(h!==Vn&&h!==Fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ua=class extends Ri{constructor(e,t=Dn,n=Ui,s,r,o=Rt,a=Rt,c,l=Vn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Dr=class extends Vt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ws=class i extends Ft{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ht(l,3)),this.setAttribute("normal",new Ht(h,3)),this.setAttribute("uv",new Ht(u,2));function g(x,m,f,M,A,b,T,w,y,_,E){let R=b/y,P=T/_,O=b/2,L=T/2,C=w/2,N=y+1,F=_+1,k=0,Q=0,K=new W;for(let J=0;J<F;J++){let te=J*P-L;for(let ce=0;ce<N;ce++){let le=ce*R-O;K[x]=le*M,K[m]=te*A,K[f]=C,l.push(K.x,K.y,K.z),K[x]=0,K[m]=0,K[f]=w>0?1:-1,h.push(K.x,K.y,K.z),u.push(ce/y),u.push(1-J/_),k+=1}}for(let J=0;J<_;J++)for(let te=0;te<y;te++){let ce=d+te+N*J,le=d+te+N*(J+1),Oe=d+(te+1)+N*(J+1),pe=d+(te+1)+N*J;c.push(ce,le,pe),c.push(le,Oe,pe),Q+=6}a.addGroup(p,Q,E),p+=Q,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Nr=class i extends Ft{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let M=f*d-o;for(let A=0;A<l;A++){let b=A*u-r;g.push(b,-M,0),x.push(0,0,1),m.push(A/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let M=0;M<a;M++){let A=M+l*f,b=M+l*(f+1),T=M+1+l*(f+1),w=M+1+l*f;p.push(A,b,w),p.push(b,T,w)}this.setIndex(p),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Ur=class i extends Ft{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new W,d=new W,p=[],g=[],x=[],m=[];for(let f=0;f<=n;f++){let M=[],A=f/n,b=o+A*a,T=e*Math.cos(b),w=Math.sqrt(e*e-T*T),y=0;f===0&&o===0?y=.5/t:f===n&&c===Math.PI&&(y=-.5/t);for(let _=0;_<=t;_++){let E=_/t,R=s+E*r;u.x=-w*Math.cos(R),u.y=T,u.z=w*Math.sin(R),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(E+y,1-A),M.push(l++)}h.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){let A=h[f][M+1],b=h[f][M],T=h[f+1][M],w=h[f+1][M+1];(f!==0||o>0)&&p.push(A,b,w),(f!==n-1||c<Math.PI)&&p.push(b,T,w)}this.setIndex(p),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(x,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function os(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(ed(s))s.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ed(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Kt(i){let e={};for(let t=0;t<i.length;t++){let n=os(i[t]);for(let s in n)e[s]=n[s]}return e}function ed(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Om(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Zc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}var Zd={clone:os,merge:Kt},Bm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,km=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pn=class extends en{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bm,this.fragmentShader=km,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=Om(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new De().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ue().fromArray(s.value);break;case"v3":this.uniforms[n].value=new W().fromArray(s.value);break;case"v4":this.uniforms[n].value=new at().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ve().fromArray(s.value);break;case"m4":this.uniforms[n].value=new We().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},da=class extends pn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},In=class extends en{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=to,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Yt=class extends In{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ue(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ze(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Fr=class extends en{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=to,this.normalScale=new Ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Gn,this.combine=Ta,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},fa=class extends en{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},pa=class extends en{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ei(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Jo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function zm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function td(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function Hm(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var Wn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ma=class extends Wn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xi,endingEnd:Xi}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case $i:r=e,a=2*t-n;break;case br:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case $i:o=e,c=2*n-t;break;case br:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,f=-d*m+2*d*x-d*g,M=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,A=(-1-p)*m+(1.5+p)*x+.5*g,b=p*m-p*x;for(let T=0;T!==a;++T)r[T]=f*o[h+T]+M*o[l+T]+A*o[c+T]+b*o[u+T];return r}},Or=class extends Wn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},ga=class extends Wn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},_a=class extends Wn{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(n-t)/(s-t),x=1-g;for(let m=0;m!==a;++m)r[m]=o[l+m]*x+o[c+m]*g;return r}let d=a*2,p=e-1;for(let g=0;g!==a;++g){let x=o[l+g],m=o[c+g],f=p*d+g*2,M=u[f],A=u[f+1],b=e*d+g*2,T=h[b],w=h[b+1],y=Gm(n,t,M,T,s);r[g]=jd(y,x,A,w,m)}return r}};function jd(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Vm(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Gm(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=jd(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let c=Vm(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var on=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ei(t,this.TimeBufferType),this.values=Ei(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ei(e.times,Array),values:Ei(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Jo(e.settings)&&(n.settings={inTangents:Ei(e.settings.inTangents,Array),outTangents:Ei(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ga(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Or(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ma(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new _a(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Yi:t=this.InterpolantFactoryMethodDiscrete;break;case Ki:t=this.InterpolantFactoryMethodLinear;break;case Zo:t=this.InterpolantFactoryMethodSmooth;break;case xc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ie("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Yi;case this.InterpolantFactoryMethodLinear:return Ki;case this.InterpolantFactoryMethodSmooth:return Zo;case this.InterpolantFactoryMethodBezier:return xc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Jo(this.settings)&&(nd(this.settings.inTangents,e),nd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(He("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(He("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){He("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){He("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Qp(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){He("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Zo,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[p+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Jo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function nd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}on.prototype.ValueTypeName="";on.prototype.TimeBufferType=Float32Array;on.prototype.ValueBufferType=Float32Array;on.prototype.DefaultInterpolation=Ki;var li=class extends on{constructor(e,t,n){super(e,t,n)}};li.prototype.ValueTypeName="bool";li.prototype.ValueBufferType=Array;li.prototype.DefaultInterpolation=Yi;li.prototype.InterpolantFactoryMethodLinear=void 0;li.prototype.InterpolantFactoryMethodSmooth=void 0;var Br=class extends on{constructor(e,t,n,s){super(e,t,n,s)}};Br.prototype.ValueTypeName="color";var ci=class extends on{constructor(e,t,n,s){super(e,t,n,s)}};ci.prototype.ValueTypeName="number";var xa=class extends Wn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)Ut.slerpFlat(r,0,o,l-a,o,l,c);return r}},hi=class extends on{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new xa(this.times,this.values,this.getValueSize(),e)}};hi.prototype.ValueTypeName="quaternion";hi.prototype.InterpolantFactoryMethodSmooth=void 0;var ui=class extends on{constructor(e,t,n){super(e,t,n)}};ui.prototype.ValueTypeName="string";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=Yi;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends on{constructor(e,t,n,s){super(e,t,n,s)}};Ii.prototype.ValueTypeName="vector";var es=class{constructor(e="",t=-1,n=[],s=fl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Cn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Xm(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(on.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=zm(c);c=td(c,1,h),l=td(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ci(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Wm(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ci;case"vector":case"vector2":case"vector3":case"vector4":return Ii;case"color":return Br;case"quaternion":return hi;case"bool":case"boolean":return li;case"string":return ui}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Xm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Wm(i.type);if(i.times===void 0){let n=[],s=[];Hm(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Jo(i.settings)&&(t.settings={inTangents:Ei(i.settings.inTangents,Float32Array),outTangents:Ei(i.settings.outTangents,Float32Array)}),t}var Hn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(id(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!id(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function id(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ya=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],g=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Jd=new ya,Xn=class{constructor(e){this.manager=e!==void 0?e:Jd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Xn.DEFAULT_MATERIAL_NAME="__DEFAULT";var si={},vc=class extends Error{constructor(e,t){super(e),this.response=t}},Xs=class extends Xn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Hn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(si[e]!==void 0){si[e].push({onLoad:t,onProgress:n,onError:s});return}si[e]=[],si[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ie("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=si[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0,x=0,m=new ReadableStream({start(f){M();function M(){u.read().then(({done:A,value:b})=>{if(A)f.close();else{x+=b.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:p});for(let w=0,y=h.length;w<y;w++){let _=h[w];_.onProgress&&_.onProgress(T)}f.enqueue(b),M()}},A=>{f.error(A)})}}});return new Response(m)}else throw new vc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return l.arrayBuffer().then(g=>p.decode(g))}}}).then(l=>{Hn.add(`file:${e}`,l);let h=si[e];delete si[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(l)}}).catch(l=>{let h=si[e];if(h===void 0)throw this.manager.itemError(e),l;delete si[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var As=new WeakMap,va=class extends Xn{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Hn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=As.get(o);u===void 0&&(u=[],As.set(o,u)),u.push({onLoad:t,onError:s})}return o}let a=Ns("img");function c(){h(),t&&t(this);let u=As.get(this)||[];for(let d=0;d<u.length;d++){let p=u[d];p.onLoad&&p.onLoad(this)}As.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),Hn.remove(`image:${e}`);let d=As.get(this)||[];for(let p=0;p<d.length;p++){let g=d[p];g.onError&&g.onError(u)}As.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Hn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var kr=class extends Xn{constructor(e){super(e)}load(e,t,n,s){let r=new Vt,o=new va(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ts=class extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var mc=new We,sd=new W,rd=new W,$s=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ue(512,512),this.mapType=ln,this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vs,this._frameExtents=new Ue(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;sd.setFromMatrixPosition(e.matrixWorld),t.position.copy(sd),rd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){mc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(mc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Ds||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(mc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Yo=new W,Ko=new Ut,zn=new W,zr=class extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Yo,Ko,zn),zn.x===1&&zn.y===1&&zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yo,Ko,zn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Yo,Ko,zn),zn.x===1&&zn.y===1&&zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Yo,Ko,zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Si=new W,od=new Ue,ad=new Ue,Et=class extends zr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Zi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(yr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(yr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,od,ad),t.subVectors(ad,od)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(yr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},bc=class extends $s{constructor(){super(new Et(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Zi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Hr=class extends ts{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new bc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Mc=class extends $s{constructor(){super(new Et(90,1,.5,500)),this.isPointLightShadow=!0}},Vr=class extends ts{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Mc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Pi=class extends zr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Sc=class extends $s{constructor(){super(new Pi(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},$n=class extends ts{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new Sc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Li=class extends ts{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var di=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var gc=new WeakMap,Gr=class extends Xn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ie("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ie("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Hn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{gc.has(o)===!0?(s&&s(gc.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Hn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),gc.set(c,l),Hn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Hn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var Cs=-90,Rs=1,ba=class extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Et(Cs,Rs,e,t);s.layers=this.layers,this.add(s);let r=new Et(Cs,Rs,e,t);r.layers=this.layers,this.add(r);let o=new Et(Cs,Rs,e,t);o.layers=this.layers,this.add(o);let a=new Et(Cs,Rs,e,t);a.layers=this.layers,this.add(a);let c=new Et(Cs,Rs,e,t);c.layers=this.layers,this.add(c);let l=new Et(Cs,Rs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ds)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ma=class extends Et{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Sa=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){Ut.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;Ut.multiplyQuaternionsFlat(e,o,e,t,e,n),Ut.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},jc="\\[\\]\\.:\\/",$m=new RegExp("["+jc+"]","g"),Jc="[^"+jc+"]",qm="[^"+jc.replace("\\.","")+"]",Ym=/((?:WC+[\/:])*)/.source.replace("WC",Jc),Km=/(WCOD+)?/.source.replace("WCOD",qm),Zm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jc),jm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jc),Jm=new RegExp("^"+Ym+Km+Zm+jm+"$"),Qm=["material","materials","bones","map"],Ec=class{constructor(e,t,n){let s=n||ht.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ht=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace($m,"")}static parseTrackName(e){let t=Jm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Qm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ie("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){He("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){He("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){He("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){He("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){He("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){He("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;He("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){He("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ht.Composite=Ec;ht.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ht.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ht.prototype.GetterByBindingType=[ht.prototype._getValue_direct,ht.prototype._getValue_array,ht.prototype._getValue_arrayElement,ht.prototype._getValue_toArray];ht.prototype.SetterByBindingTypeAndVersioning=[[ht.prototype._setValue_direct,ht.prototype._setValue_direct_setNeedsUpdate,ht.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_array,ht.prototype._setValue_array_setNeedsUpdate,ht.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_arrayElement,ht.prototype._setValue_arrayElement_setNeedsUpdate,ht.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ht.prototype._setValue_fromArray,ht.prototype._setValue_fromArray_setNeedsUpdate,ht.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ea=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:Xi,endingEnd:Xi};for(let l=0;l!==o;++l){let h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Dd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Ud:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case fl:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===Nd;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===Ld){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=$i,s.endingEnd=$i):(e?s.endingStart=this.zeroSlopeAtStart?$i:Xi:s.endingStart=br,t?s.endingEnd=this.zeroSlopeAtEnd?$i:Xi:s.endingEnd=br)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},eg=new Float32Array(1),Wr=class extends vn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let d=s[u],p=d.name,g=h[p];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,p));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;g=new Sa(ht.create(n,p,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,p),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Or(new Float32Array(2),new Float32Array(2),1,eg),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?es.findByName(s,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=fl),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new Ea(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?es.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};var qs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var sh=class sh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};sh.prototype.isMatrix2=!0;var wc=sh;var Xr=class extends vn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Qc(i,e,t,n){let s=tg(n);switch(t){case Wc:return i*e;case Da:return i*e/s.components*s.byteLength;case Na:return i*e/s.components*s.byteLength;case Oi:return i*e*2/s.components*s.byteLength;case Ua:return i*e*2/s.components*s.byteLength;case Xc:return i*e*3/s.components*s.byteLength;case gn:return i*e*4/s.components*s.byteLength;case Fa:return i*e*4/s.components*s.byteLength;case Yr:case Kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Zr:case jr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ba:case za:return Math.max(i,16)*Math.max(e,8)/4;case Oa:case ka:return Math.max(i,8)*Math.max(e,8)/2;case Ha:case Va:case Wa:case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Jr:case $a:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ka:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Za:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ja:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case el:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case tl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case il:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case sl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case rl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ol:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case al:case ll:case cl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case hl:case ul:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Qr:case dl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function tg(i){switch(i){case ln:case zc:return{byteLength:1,components:1};case js:case Hc:case Nn:return{byteLength:2,components:1};case Pa:case La:return{byteLength:2,components:4};case Dn:case Ia:case mn:return{byteLength:4,components:1};case Vc:case Gc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function bf(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ig(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var sg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,og=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ag=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ug=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,fg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_g=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Mg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Eg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,wg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Tg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ag=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Rg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ig=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ng="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ug=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Bg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$g=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Zg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,jg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,e0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,t0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,n0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,i0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,s0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,r0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,o0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,a0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,l0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,h0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,d0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,p0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,m0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,g0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,x0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,y0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,b0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,M0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,S0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,E0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,w0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,T0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,A0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,C0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,R0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,I0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,L0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,D0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,N0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,U0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,F0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,O0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,B0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,k0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,z0=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,H0=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,V0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,G0=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,W0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,X0=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,$0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,q0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,K0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Z0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,j0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,J0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Q0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,e_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,t_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,n_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,i_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,s_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,r_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,c_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,u_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,d_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,f_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,p_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,m_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,__=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,x_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,y_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,S_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,w_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,T_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,A_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,R_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,D_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,N_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,O_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qe={alphahash_fragment:sg,alphahash_pars_fragment:rg,alphamap_fragment:og,alphamap_pars_fragment:ag,alphatest_fragment:lg,alphatest_pars_fragment:cg,aomap_fragment:hg,aomap_pars_fragment:ug,batching_pars_vertex:dg,batching_vertex:fg,begin_vertex:pg,beginnormal_vertex:mg,bsdfs:gg,iridescence_fragment:_g,bumpmap_pars_fragment:xg,clipping_planes_fragment:yg,clipping_planes_pars_fragment:vg,clipping_planes_pars_vertex:bg,clipping_planes_vertex:Mg,color_fragment:Sg,color_pars_fragment:Eg,color_pars_vertex:wg,color_vertex:Tg,common:Ag,cube_uv_reflection_fragment:Cg,defaultnormal_vertex:Rg,displacementmap_pars_vertex:Ig,displacementmap_vertex:Pg,emissivemap_fragment:Lg,emissivemap_pars_fragment:Dg,colorspace_fragment:Ng,colorspace_pars_fragment:Ug,envmap_fragment:Fg,envmap_common_pars_fragment:Og,envmap_pars_fragment:Bg,envmap_pars_vertex:kg,envmap_physical_pars_fragment:Zg,envmap_vertex:zg,fog_vertex:Hg,fog_pars_vertex:Vg,fog_fragment:Gg,fog_pars_fragment:Wg,gradientmap_pars_fragment:Xg,lightmap_pars_fragment:$g,lights_lambert_fragment:qg,lights_lambert_pars_fragment:Yg,lights_pars_begin:Kg,lights_toon_fragment:jg,lights_toon_pars_fragment:Jg,lights_phong_fragment:Qg,lights_phong_pars_fragment:e0,lights_physical_fragment:t0,lights_physical_pars_fragment:n0,lights_fragment_begin:i0,lights_fragment_maps:s0,lights_fragment_end:r0,lightprobes_pars_fragment:o0,logdepthbuf_fragment:a0,logdepthbuf_pars_fragment:l0,logdepthbuf_pars_vertex:c0,logdepthbuf_vertex:h0,map_fragment:u0,map_pars_fragment:d0,map_particle_fragment:f0,map_particle_pars_fragment:p0,metalnessmap_fragment:m0,metalnessmap_pars_fragment:g0,morphinstance_vertex:_0,morphcolor_vertex:x0,morphnormal_vertex:y0,morphtarget_pars_vertex:v0,morphtarget_vertex:b0,normal_fragment_begin:M0,normal_fragment_maps:S0,normal_pars_fragment:E0,normal_pars_vertex:w0,normal_vertex:T0,normalmap_pars_fragment:A0,clearcoat_normal_fragment_begin:C0,clearcoat_normal_fragment_maps:R0,clearcoat_pars_fragment:I0,iridescence_pars_fragment:P0,opaque_fragment:L0,packing:D0,premultiplied_alpha_fragment:N0,project_vertex:U0,dithering_fragment:F0,dithering_pars_fragment:O0,roughnessmap_fragment:B0,roughnessmap_pars_fragment:k0,shadowmap_pars_fragment:z0,shadowmap_pars_vertex:H0,shadowmap_vertex:V0,shadowmask_pars_fragment:G0,skinbase_vertex:W0,skinning_pars_vertex:X0,skinning_vertex:$0,skinnormal_vertex:q0,specularmap_fragment:Y0,specularmap_pars_fragment:K0,tonemapping_fragment:Z0,tonemapping_pars_fragment:j0,transmission_fragment:J0,transmission_pars_fragment:Q0,uv_pars_fragment:e_,uv_pars_vertex:t_,uv_vertex:n_,worldpos_vertex:i_,background_vert:s_,background_frag:r_,backgroundCube_vert:o_,backgroundCube_frag:a_,cube_vert:l_,cube_frag:c_,depth_vert:h_,depth_frag:u_,distance_vert:d_,distance_frag:f_,equirect_vert:p_,equirect_frag:m_,linedashed_vert:g_,linedashed_frag:__,meshbasic_vert:x_,meshbasic_frag:y_,meshlambert_vert:v_,meshlambert_frag:b_,meshmatcap_vert:M_,meshmatcap_frag:S_,meshnormal_vert:E_,meshnormal_frag:w_,meshphong_vert:T_,meshphong_frag:A_,meshphysical_vert:C_,meshphysical_frag:R_,meshtoon_vert:I_,meshtoon_frag:P_,points_vert:L_,points_frag:D_,shadow_vert:N_,shadow_frag:U_,sprite_vert:F_,sprite_frag:O_},ge={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new Ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new Ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Zn={basic:{uniforms:Kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new De(0)},envMapIntensity:{value:1}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Kt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Kt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Kt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new De(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Kt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Kt([ge.points,ge.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Kt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Kt([ge.common,ge.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Kt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Kt([ge.sprite,ge.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distance:{uniforms:Kt([ge.common,ge.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distance_vert,fragmentShader:qe.distance_frag},shadow:{uniforms:Kt([ge.lights,ge.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Zn.physical={uniforms:Kt([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new Ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new Ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new Ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};var gl={r:0,b:0,g:0},B_=new We,Mf=new Ve;Mf.set(-1,0,0,0,1,0,0,0,1);function k_(i,e,t,n,s,r){let o=new De(0),a=s===!0?0:1,c,l,h=null,u=0,d=null;function p(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){let b=M.backgroundBlurriness>0;A=e.get(A,b)}return A}function g(M){let A=!1,b=p(M);b===null?m(o,a):b&&b.isColor&&(m(b,1),A=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,A){let b=p(A);b&&(b.isCubeTexture||b.mapping===qr)?(l===void 0&&(l=new Gt(new Ws(1,1,1),new pn({name:"BackgroundCubeMaterial",uniforms:os(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=b,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(B_.makeRotationFromEuler(A.backgroundRotation)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Mf),l.material.toneMapped=Ke.getTransfer(b.colorSpace)!==rt,(h!==b||u!==b.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=b,u=b.version,d=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new Gt(new Nr(2,2),new pn({name:"BackgroundMaterial",uniforms:os(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(b.colorSpace)!==rt,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||u!==b.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,u=b.version,d=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,A){M.getRGB(gl,Zc(i)),t.buffers.color.setClear(gl.r,gl.g,gl.b,A,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,A=1){o.set(M),a=A,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,m(o,a)},render:g,addToRenderList:x,dispose:f}}function z_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(P,O,L,C,N){let F=!1,k=u(P,C,L,O);r!==k&&(r=k,l(r.object)),F=p(P,C,L,N),F&&g(P,C,L,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,b(P,O,L,C),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function u(P,O,L,C){let N=C.wireframe===!0,F=n[O.id];F===void 0&&(F={},n[O.id]=F);let k=P.isInstancedMesh===!0?P.id:0,Q=F[k];Q===void 0&&(Q={},F[k]=Q);let K=Q[L.id];K===void 0&&(K={},Q[L.id]=K);let J=K[N];return J===void 0&&(J=d(c()),K[N]=J),J}function d(P){let O=[],L=[],C=[];for(let N=0;N<t;N++)O[N]=0,L[N]=0,C[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:L,attributeDivisors:C,object:P,attributes:{},index:null}}function p(P,O,L,C){let N=r.attributes,F=O.attributes,k=0,Q=L.getAttributes();for(let K in Q)if(Q[K].location>=0){let te=N[K],ce=F[K];if(ce===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor)),te===void 0||te.attribute!==ce||ce&&te.data!==ce.data)return!0;k++}return r.attributesNum!==k||r.index!==C}function g(P,O,L,C){let N={},F=O.attributes,k=0,Q=L.getAttributes();for(let K in Q)if(Q[K].location>=0){let te=F[K];te===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(te=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(te=P.instanceColor));let ce={};ce.attribute=te,te&&te.data&&(ce.data=te.data),N[K]=ce,k++}r.attributes=N,r.attributesNum=k,r.index=C}function x(){let P=r.newAttributes;for(let O=0,L=P.length;O<L;O++)P[O]=0}function m(P){f(P,0)}function f(P,O){let L=r.newAttributes,C=r.enabledAttributes,N=r.attributeDivisors;L[P]=1,C[P]===0&&(i.enableVertexAttribArray(P),C[P]=1),N[P]!==O&&(i.vertexAttribDivisor(P,O),N[P]=O)}function M(){let P=r.newAttributes,O=r.enabledAttributes;for(let L=0,C=O.length;L<C;L++)O[L]!==P[L]&&(i.disableVertexAttribArray(L),O[L]=0)}function A(P,O,L,C,N,F,k){k===!0?i.vertexAttribIPointer(P,O,L,N,F):i.vertexAttribPointer(P,O,L,C,N,F)}function b(P,O,L,C){x();let N=C.attributes,F=L.getAttributes(),k=O.defaultAttributeValues;for(let Q in F){let K=F[Q];if(K.location>=0){let J=N[Q];if(J===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(J=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(J=P.instanceColor)),J!==void 0){let te=J.normalized,ce=J.itemSize,le=e.get(J);if(le===void 0)continue;let Oe=le.buffer,pe=le.type,Ne=le.bytesPerElement,U=pe===i.INT||pe===i.UNSIGNED_INT||J.gpuType===Ia;if(J.isInterleavedBufferAttribute){let X=J.data,ie=X.stride,be=J.offset;if(X.isInstancedInterleavedBuffer){for(let he=0;he<K.locationSize;he++)f(K.location+he,X.meshPerAttribute);P.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let he=0;he<K.locationSize;he++)m(K.location+he);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let he=0;he<K.locationSize;he++)A(K.location+he,ce/K.locationSize,pe,te,ie*Ne,(be+ce/K.locationSize*he)*Ne,U)}else{if(J.isInstancedBufferAttribute){for(let X=0;X<K.locationSize;X++)f(K.location+X,J.meshPerAttribute);P.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let X=0;X<K.locationSize;X++)m(K.location+X);i.bindBuffer(i.ARRAY_BUFFER,Oe);for(let X=0;X<K.locationSize;X++)A(K.location+X,ce/K.locationSize,pe,te,ce*Ne,ce/K.locationSize*X*Ne,U)}}else if(k!==void 0){let te=k[Q];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(K.location,te);break;case 3:i.vertexAttrib3fv(K.location,te);break;case 4:i.vertexAttrib4fv(K.location,te);break;default:i.vertexAttrib1fv(K.location,te)}}}}M()}function T(){E();for(let P in n){let O=n[P];for(let L in O){let C=O[L];for(let N in C){let F=C[N];for(let k in F)h(F[k].object),delete F[k];delete C[N]}}delete n[P]}}function w(P){if(n[P.id]===void 0)return;let O=n[P.id];for(let L in O){let C=O[L];for(let N in C){let F=C[N];for(let k in F)h(F[k].object),delete F[k];delete C[N]}}delete n[P.id]}function y(P){for(let O in n){let L=n[O];for(let C in L){let N=L[C];if(N[P.id]===void 0)continue;let F=N[P.id];for(let k in F)h(F[k].object),delete F[k];delete N[P.id]}}}function _(P){for(let O in n){let L=n[O],C=P.isInstancedMesh===!0?P.id:0,N=L[C];if(N!==void 0){for(let F in N){let k=N[F];for(let Q in k)h(k[Q].object),delete k[Q];delete N[F]}delete L[C],Object.keys(L).length===0&&delete n[O]}}}function E(){R(),o=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function H_(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let p=0;p<h;p++)d+=l[p];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function V_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(y){return!(y!==gn&&n.convert(y)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){let _=y===Nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==ln&&y!==mn&&!_&&n.convert(y)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(y){if(y==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ie("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:b,maxSamples:T,samples:w}}function G_(i){let e=this,t=null,n=0,s=!1,r=!1,o=new fn,a=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let M=r?0:n,A=M*4,b=f.clippingState||null;c.value=b,b=h(g,d,A,p);for(let T=0;T!==A;++T)b[T]=t[T];f.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let f=p+x*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,b=p;A!==x;++A,b+=4)o.copy(u[A]).applyMatrix4(M,a),o.normal.toArray(m,b),m[b+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var tr=4,W_=6,X_=20,$_=256,no=new Pi,Qd=new De,rh=null,oh=0,ah=0,lh=!1,q_=new W,as=new W,xl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=q_}=r;rh=this._renderer.getRenderTarget(),oh=this._renderer.getActiveCubeFace(),ah=this._renderer.getActiveMipmapLevel(),lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(rh,oh,ah),this._renderer.xr.enabled=lh,e.scissorTest=!1,er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ui||e.mapping===is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rh=this._renderer.getRenderTarget(),oh=this._renderer.getActiveCubeFace(),ah=this._renderer.getActiveMipmapLevel(),lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:It,minFilter:It,generateMipmaps:!1,type:Nn,format:gn,colorSpace:Jt,depthBuffer:!1},s=ef(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ef(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Y_(r)),this._blurMaterial=Z_(r,e,t),this._ggxMaterial=K_(r,e,t)}return s}_compileMaterial(e){let t=new Gt(new Ft,e);this._renderer.compile(t,no)}_sceneToCubeUV(e,t,n,s,r){let c=new Et(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(Qd),u.toneMapping=Pn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Gt(new Ws,new Rn({name:"PMREM.Background",side:tn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,f=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,f=!0):(m.color.copy(Qd),f=!0);for(let A=0;A<6;A++){let b=A%3;b===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[A],r.y,r.z)):b===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[A]));let T=this._cubeSize;er(s,b*T,A>2?T:0,T,T),u.setRenderTarget(s),f&&u.render(x,c),u.render(e,c)}u.toneMapping=p,u.autoClear=d,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Ui||e.mapping===is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;er(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,no)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=l*1.25,p=u*d,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-tr?n-g+tr:0),f=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=g-t,er(r,m,f,3*x,2*x),s.setRenderTarget(r),s.render(a,no),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,er(e,m,f,3*x,2*x),s.setRenderTarget(e),s.render(a,no)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-tr?s-this._lodMax+tr:0),d=4*(this._cubeSize-h);er(t,u,d,3*h,2*h),o.setRenderTarget(t),o.render(c,no)}};function Y_(i){let e=[],t=[],n=i,s=i-tr+1+W_;for(let r=0;r<s;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,d=6,p=3,g=new Float32Array(p*d*u),x=new Float32Array(p*d*u);for(let f=0;f<u;f++){let M=f%3*2/3-1,A=f>2?0:-1,b=[M,A,0,M+2/3,A,0,M+2/3,A+1,0,M,A,0,M+2/3,A+1,0,M,A+1,0];g.set(b,p*d*f);for(let T=0;T<d;T++){let w=h[T*2]*2-1,y=h[T*2+1]*2-1;f===0?as.set(1,y,w):f===1?as.set(-w,1,-y):f===2?as.set(-w,y,1):f===3?as.set(-1,y,-w):f===4?as.set(-w,-1,y):as.set(w,y,-1),as.toArray(x,(f*d+T)*p)}}let m=new Ft;m.setAttribute("position",new wt(g,p)),m.setAttribute("outputDirection",new wt(x,p)),t.push(new Gt(m,null)),n>tr&&n--}return{lodMeshes:t,sizeLods:e}}function ef(i,e,t){let n=new sn(i,e,t);return n.texture.mapping=qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function er(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function K_(i,e,t){return new pn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Z_(i,e,t){return new pn({name:"SphericalGaussianBlur",defines:{SAMPLES:X_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:vl(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function tf(){return new pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function nf(){return new pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function vl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var yl=class extends sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Lr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ws(5,5,5),r=new pn({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:Yn});r.uniforms.tEquirect.value=t;let o=new Gt(s,r),a=t.minFilter;return t.minFilter===Ln&&(t.minFilter=It),new ba(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function j_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,p=!1){return d==null?null:p?o(d):r(d)}function r(d){if(d&&d.isTexture){let p=d.mapping;if(p===Aa||p===Ca)if(e.has(d)){let g=e.get(d).texture;return a(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let x=new yl(g.height);return x.fromEquirectangularTexture(i,d),e.set(d,x),d.addEventListener("dispose",l),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let p=d.mapping,g=p===Aa||p===Ca,x=p===Ui||p===is;if(g||x){let m=t.get(d),f=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return n===null&&(n=new xl(i)),m=g?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let M=d.image;return g&&M&&M.height>0||x&&M&&c(M)?(n===null&&(n=new xl(i)),m=g?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function a(d,p){return p===Aa?d.mapping=Ui:p===Ca&&(d.mapping=is),d}function c(d){let p=0,g=6;for(let x=0;x<g;x++)d[x]!==void 0&&p++;return p===g}function l(d){let p=d.target;p.removeEventListener("dispose",l);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(d){let p=d.target;p.removeEventListener("dispose",h);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function J_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&qi("WebGLRenderer: "+n+" extension not supported."),s}}}function Q_(i,e,t,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let p in d)e.update(d[p],i.ARRAY_BUFFER)}function l(u){let d=[],p=u.index,g=u.attributes.position,x=0;if(g===void 0)return;if(p!==null){let M=p.array;x=p.version;for(let A=0,b=M.length;A<b;A+=3){let T=M[A+0],w=M[A+1],y=M[A+2];d.push(T,w,w,y,y,T)}}else{let M=g.array;x=g.version;for(let A=0,b=M.length/3-1;A<b;A+=3){let T=A+0,w=A+1,y=A+2;d.push(T,w,w,y,y,T)}}let m=new(g.count>=65535?Ar:Tr)(d,1);m.version=x;let f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function ex(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*o),t.update(d,n,1)}function l(u,d,p){p!==0&&(i.drawElementsInstanced(n,d,r,u*o,p),t.update(d,n,p))}function h(u,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,p);let x=0;for(let m=0;m<p;m++)x+=d[m];t.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function tx(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:He("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function nx(i,e,t){let n=new WeakMap,s=new at;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let E=function(){y.dispose(),n.delete(a),a.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let p=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],M=a.morphAttributes.color||[],A=0;p===!0&&(A=1),g===!0&&(A=2),x===!0&&(A=3);let b=a.attributes.position.count*A,T=1;b>e.maxTextureSize&&(T=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);let w=new Float32Array(b*T*4*u),y=new Er(w,b,T,u);y.type=mn,y.needsUpdate=!0;let _=A*4;for(let R=0;R<u;R++){let P=m[R],O=f[R],L=M[R],C=b*T*4*R;for(let N=0;N<P.count;N++){let F=N*_;p===!0&&(s.fromBufferAttribute(P,N),w[C+F+0]=s.x,w[C+F+1]=s.y,w[C+F+2]=s.z,w[C+F+3]=0),g===!0&&(s.fromBufferAttribute(O,N),w[C+F+4]=s.x,w[C+F+5]=s.y,w[C+F+6]=s.z,w[C+F+7]=0),x===!0&&(s.fromBufferAttribute(L,N),w[C+F+8]=s.x,w[C+F+9]=s.y,w[C+F+10]=s.z,w[C+F+11]=L.itemSize===4?s.w:1)}}d={count:u,texture:y,size:new Ue(b,T)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let x=0;x<l.length;x++)p+=l[x];let g=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function ix(i,e,t,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return d}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var sx={[Lc]:"LINEAR_TONE_MAPPING",[Dc]:"REINHARD_TONE_MAPPING",[Nc]:"CINEON_TONE_MAPPING",[Uc]:"ACES_FILMIC_TONE_MAPPING",[Oc]:"AGX_TONE_MAPPING",[Bc]:"NEUTRAL_TONE_MAPPING",[Fc]:"CUSTOM_TONE_MAPPING"};function rx(i,e,t,n,s,r){let o=new sn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new Ft;l.setAttribute("position",new Ht([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ht([0,2,0,0,2,0],2));let h=new da({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Gt(l,h),d=new Pi(-1,1,1,-1,0,1),p=null,g=null,x=!1,m,f=null,M=[],A=!1;this.setSize=function(b,T){o.setSize(b,T),a!==null&&a.setSize(b,T),c!==null&&c.setSize(b,T);for(let w=0;w<M.length;w++){let y=M[w];y.setSize&&y.setSize(b,T)}},this.setEffects=function(b){M=b,A=M.length>0&&M[0].isRenderPass===!0;let T=o.width,w=o.height;M.length>0&&a===null&&(a=new sn(T,w,{type:Nn,depthBuffer:!1,stencilBuffer:!1}),c=new sn(T,w,{type:Nn,depthBuffer:!1,stencilBuffer:!1}));for(let y=0;y<M.length;y++){let _=M[y];_.setSize&&_.setSize(T,w)}},this.begin=function(b,T){if(x||b.toneMapping===Pn&&M.length===0)return!1;if(f=T,T!==null){let w=T.width,y=T.height;(o.width!==w||o.height!==y)&&this.setSize(w,y)}return A===!1&&b.setRenderTarget(o),m=b.toneMapping,b.toneMapping=Pn,!0},this.hasRenderPass=function(){return A},this.end=function(b,T){b.toneMapping=m,x=!0;let w=o,y=a;for(let _=0;_<M.length;_++){let E=M[_];E.enabled!==!1&&(E.render(b,y,w,T),E.needsSwap!==!1&&(w=y,y=y===a?c:a))}if(p!==b.outputColorSpace||g!==b.toneMapping){p=b.outputColorSpace,g=b.toneMapping,h.defines={},Ke.getTransfer(p)===rt&&(h.defines.SRGB_TRANSFER="");let _=sx[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,b.setRenderTarget(f),b.render(u,d),f=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var Sf=new Vt,uh=new Ri(1,1),Ef=new Er,wf=new la,Tf=new Lr,sf=[],rf=[],of=new Float32Array(16),af=new Float32Array(9),lf=new Float32Array(4);function ir(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=sf[s];if(r===void 0&&(r=new Float32Array(s),sf[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Ot(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Bt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function bl(i,e){let t=rf[e];t===void 0&&(t=new Int32Array(e),rf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function ox(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function ax(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;i.uniform2fv(this.addr,e),Bt(t,e)}}function lx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ot(t,e))return;i.uniform3fv(this.addr,e),Bt(t,e)}}function cx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;i.uniform4fv(this.addr,e),Bt(t,e)}}function hx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;lf.set(n),i.uniformMatrix2fv(this.addr,!1,lf),Bt(t,n)}}function ux(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;af.set(n),i.uniformMatrix3fv(this.addr,!1,af),Bt(t,n)}}function dx(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ot(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Bt(t,e)}else{if(Ot(t,n))return;of.set(n),i.uniformMatrix4fv(this.addr,!1,of),Bt(t,n)}}function fx(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function px(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;i.uniform2iv(this.addr,e),Bt(t,e)}}function mx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;i.uniform3iv(this.addr,e),Bt(t,e)}}function gx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;i.uniform4iv(this.addr,e),Bt(t,e)}}function _x(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function xx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ot(t,e))return;i.uniform2uiv(this.addr,e),Bt(t,e)}}function yx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ot(t,e))return;i.uniform3uiv(this.addr,e),Bt(t,e)}}function vx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ot(t,e))return;i.uniform4uiv(this.addr,e),Bt(t,e)}}function bx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(uh.compareFunction=t.isReversedDepthBuffer()?ml:pl,r=uh):r=Sf,t.setTexture2D(e||r,s)}function Mx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||wf,s)}function Sx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Tf,s)}function Ex(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ef,s)}function wx(i){switch(i){case 5126:return ox;case 35664:return ax;case 35665:return lx;case 35666:return cx;case 35674:return hx;case 35675:return ux;case 35676:return dx;case 5124:case 35670:return fx;case 35667:case 35671:return px;case 35668:case 35672:return mx;case 35669:case 35673:return gx;case 5125:return _x;case 36294:return xx;case 36295:return yx;case 36296:return vx;case 35678:case 36198:case 36298:case 36306:case 35682:return bx;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return Sx;case 36289:case 36303:case 36311:case 36292:return Ex}}function Tx(i,e){i.uniform1fv(this.addr,e)}function Ax(i,e){let t=ir(e,this.size,2);i.uniform2fv(this.addr,t)}function Cx(i,e){let t=ir(e,this.size,3);i.uniform3fv(this.addr,t)}function Rx(i,e){let t=ir(e,this.size,4);i.uniform4fv(this.addr,t)}function Ix(i,e){let t=ir(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Px(i,e){let t=ir(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Lx(i,e){let t=ir(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Dx(i,e){i.uniform1iv(this.addr,e)}function Nx(i,e){i.uniform2iv(this.addr,e)}function Ux(i,e){i.uniform3iv(this.addr,e)}function Fx(i,e){i.uniform4iv(this.addr,e)}function Ox(i,e){i.uniform1uiv(this.addr,e)}function Bx(i,e){i.uniform2uiv(this.addr,e)}function kx(i,e){i.uniform3uiv(this.addr,e)}function zx(i,e){i.uniform4uiv(this.addr,e)}function Hx(i,e,t){let n=this.cache,s=e.length,r=bl(t,s);Ot(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=uh:o=Sf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Vx(i,e,t){let n=this.cache,s=e.length,r=bl(t,s);Ot(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||wf,r[o])}function Gx(i,e,t){let n=this.cache,s=e.length,r=bl(t,s);Ot(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Tf,r[o])}function Wx(i,e,t){let n=this.cache,s=e.length,r=bl(t,s);Ot(n,r)||(i.uniform1iv(this.addr,r),Bt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Ef,r[o])}function Xx(i){switch(i){case 5126:return Tx;case 35664:return Ax;case 35665:return Cx;case 35666:return Rx;case 35674:return Ix;case 35675:return Px;case 35676:return Lx;case 5124:case 35670:return Dx;case 35667:case 35671:return Nx;case 35668:case 35672:return Ux;case 35669:case 35673:return Fx;case 5125:return Ox;case 36294:return Bx;case 36295:return kx;case 36296:return zx;case 35678:case 36198:case 36298:case 36306:case 35682:return Hx;case 35679:case 36299:case 36307:return Vx;case 35680:case 36300:case 36308:case 36293:return Gx;case 36289:case 36303:case 36311:case 36292:return Wx}}var dh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wx(t.type)}},fh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xx(t.type)}},ph=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},ch=/(\w+)(\])?(\[|\.)?/g;function cf(i,e){i.seq.push(e),i.map[e.id]=e}function $x(i,e,t){let n=i.name,s=n.length;for(ch.lastIndex=0;;){let r=ch.exec(n),o=ch.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){cf(t,l===void 0?new dh(a,i,e):new fh(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new ph(a),cf(t,u)),t=u}}}var nr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);$x(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function hf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var qx=37297,Yx=0;function Kx(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var uf=new Ve;function Zx(i){Ke._getMatrix(uf,Ke.workingColorSpace,i);let e=`mat3( ${uf.elements.map(t=>t.toFixed(4))} )`;switch(Ke.getTransfer(i)){case Mr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function df(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Kx(i.getShaderSource(e),a)}else return r}function jx(i,e){let t=Zx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Jx={[Lc]:"Linear",[Dc]:"Reinhard",[Nc]:"Cineon",[Uc]:"ACESFilmic",[Oc]:"AgX",[Bc]:"Neutral",[Fc]:"Custom"};function Qx(i,e){let t=Jx[e];return t===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var _l=new W;function ey(){Ke.getLuminanceCoefficients(_l);let i=_l.x.toFixed(4),e=_l.y.toFixed(4),t=_l.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ty(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(so).join(`
`)}function ny(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function iy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function so(i){return i!==""}function ff(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var sy=/^[ \t]*#include +<([\w\d./]+)>/gm;function mh(i){return i.replace(sy,oy)}var ry=new Map;function oy(i,e){let t=qe[e];if(t===void 0){let n=ry.get(e);if(n!==void 0)t=qe[n],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return mh(t)}var ay=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mf(i){return i.replace(ay,ly)}function ly(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function gf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var cy={[$r]:"SHADOWMAP_TYPE_PCF",[Ys]:"SHADOWMAP_TYPE_VSM"};function hy(i){return cy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var uy={[Ui]:"ENVMAP_TYPE_CUBE",[is]:"ENVMAP_TYPE_CUBE",[qr]:"ENVMAP_TYPE_CUBE_UV"};function dy(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":uy[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var fy={[is]:"ENVMAP_MODE_REFRACTION"};function py(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":fy[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var my={[Ta]:"ENVMAP_BLENDING_MULTIPLY",[Rd]:"ENVMAP_BLENDING_MIX",[Id]:"ENVMAP_BLENDING_ADD"};function gy(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":my[i.combine]||"ENVMAP_BLENDING_NONE"}function _y(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function xy(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=hy(t),l=dy(t),h=py(t),u=gy(t),d=_y(t),p=ty(t),g=ny(r),x=s.createProgram(),m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(so).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(so).join(`
`),f.length>0&&(f+=`
`)):(m=[gf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(so).join(`
`),f=[gf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Pn?Qx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,jx("linearToOutputTexel",t.outputColorSpace),ey(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(so).join(`
`)),o=mh(o),o=ff(o,t),o=pf(o,t),a=mh(a),a=ff(a,t),a=pf(a,t),o=mf(o),a=mf(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Yc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let A=M+m+o,b=M+f+a,T=hf(s,s.VERTEX_SHADER,A),w=hf(s,s.FRAGMENT_SHADER,b);s.attachShader(x,T),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function y(P){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(x)||"",L=s.getShaderInfoLog(T)||"",C=s.getShaderInfoLog(w)||"",N=O.trim(),F=L.trim(),k=C.trim(),Q=!0,K=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,w);else{let J=df(s,T,"vertex"),te=df(s,w,"fragment");He("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+N+`
`+J+`
`+te)}else N!==""?Ie("WebGLProgram: Program Info Log:",N):(F===""||k==="")&&(K=!1);K&&(P.diagnostics={runnable:Q,programLog:N,vertexShader:{log:F,prefix:m},fragmentShader:{log:k,prefix:f}})}s.deleteShader(T),s.deleteShader(w),_=new nr(s,x),E=iy(s,x)}let _;this.getUniforms=function(){return _===void 0&&y(this),_};let E;this.getAttributes=function(){return E===void 0&&y(this),E};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(x,qx)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Yx++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=w,this}var yy=0,gh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new _h(e),t.set(e,n)),n}},_h=class{constructor(e){this.id=yy++,this.code=e,this.usedTimes=0}};function vy(i){return i===Oi||i===Jr||i===Qr}function by(i,e,t,n,s,r){let o=new wr,a=new gh,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,E,R,P,O,L){let C=P.fog,N=O.geometry,F=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,k=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,Q=e.get(_.envMap||F,k),K=Q&&Q.mapping===qr?Q.image.height:null,J=p[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Ie("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));let te=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ce=te!==void 0?te.length:0,le=0;N.morphAttributes.position!==void 0&&(le=1),N.morphAttributes.normal!==void 0&&(le=2),N.morphAttributes.color!==void 0&&(le=3);let Oe,pe,Ne,U;if(J){let mt=Zn[J];Oe=mt.vertexShader,pe=mt.fragmentShader}else{Oe=_.vertexShader,pe=_.fragmentShader;let mt=a.getVertexShaderStage(_),it=a.getFragmentShaderStage(_);a.update(_,mt,it),Ne=mt.id,U=it.id}let X=i.getRenderTarget(),ie=i.state.buffers.depth.getReversed(),be=O.isInstancedMesh===!0,he=O.isBatchedMesh===!0,ze=!!_.map,xt=!!_.matcap,Ye=!!Q,Qe=!!_.aoMap,nt=!!_.lightMap,Xe=!!_.bumpMap&&_.wireframe===!1,pt=!!_.normalMap,Tt=!!_.displacementMap,Wt=!!_.emissiveMap,yt=!!_.metalnessMap,Mt=!!_.roughnessMap,G=_.anisotropy>0,At=_.clearcoat>0,tt=_.dispersion>0,I=_.retroreflectivity>0,v=_.iridescence>0,$=_.sheen>0,D=_.transmission>0,H=G&&!!_.anisotropyMap,se=At&&!!_.clearcoatMap,oe=At&&!!_.clearcoatNormalMap,Z=At&&!!_.clearcoatRoughnessMap,ee=v&&!!_.iridescenceMap,ae=v&&!!_.iridescenceThicknessMap,Ee=$&&!!_.sheenColorMap,me=$&&!!_.sheenRoughnessMap,ue=!!_.specularMap,Pe=!!_.specularColorMap,Fe=!!_.specularIntensityMap,Ge=D&&!!_.transmissionMap,V=D&&!!_.thicknessMap,de=!!_.gradientMap,ne=!!_.alphaMap,fe=_.alphaTest>0,ve=!!_.alphaHash,re=!!_.extensions,Le=Pn;_.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Le=i.toneMapping);let Ce={shaderID:J,shaderType:_.type,shaderName:_.name,vertexShader:Oe,fragmentShader:pe,defines:_.defines,customVertexShaderID:Ne,customFragmentShaderID:U,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:he,batchingColor:he&&O._colorsTexture!==null,instancing:be,instancingColor:be&&O.instanceColor!==null,instancingMorph:be&&O.morphTexture!==null,outputColorSpace:X===null?i.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:Ke.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ze,matcap:xt,envMap:Ye,envMapMode:Ye&&Q.mapping,envMapCubeUVHeight:K,aoMap:Qe,lightMap:nt,bumpMap:Xe,normalMap:pt,displacementMap:Tt,emissiveMap:Wt,normalMapObjectSpace:pt&&_.normalMapType===Od,normalMapTangentSpace:pt&&_.normalMapType===to,packedNormalMap:pt&&_.normalMapType===to&&vy(_.normalMap.format),metalnessMap:yt,roughnessMap:Mt,anisotropy:G,anisotropyMap:H,clearcoat:At,clearcoatMap:se,clearcoatNormalMap:oe,clearcoatRoughnessMap:Z,dispersion:tt,retroreflection:I,iridescence:v,iridescenceMap:ee,iridescenceThicknessMap:ae,sheen:$,sheenColorMap:Ee,sheenRoughnessMap:me,specularMap:ue,specularColorMap:Pe,specularIntensityMap:Fe,transmission:D,transmissionMap:Ge,thicknessMap:V,gradientMap:de,opaque:_.transparent===!1&&_.blending===Ks&&_.alphaToCoverage===!1,alphaMap:ne,alphaTest:fe,alphaHash:ve,combine:_.combine,mapUv:ze&&g(_.map.channel),aoMapUv:Qe&&g(_.aoMap.channel),lightMapUv:nt&&g(_.lightMap.channel),bumpMapUv:Xe&&g(_.bumpMap.channel),normalMapUv:pt&&g(_.normalMap.channel),displacementMapUv:Tt&&g(_.displacementMap.channel),emissiveMapUv:Wt&&g(_.emissiveMap.channel),metalnessMapUv:yt&&g(_.metalnessMap.channel),roughnessMapUv:Mt&&g(_.roughnessMap.channel),anisotropyMapUv:H&&g(_.anisotropyMap.channel),clearcoatMapUv:se&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Z&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Ee&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:me&&g(_.sheenRoughnessMap.channel),specularMapUv:ue&&g(_.specularMap.channel),specularColorMapUv:Pe&&g(_.specularColorMap.channel),specularIntensityMapUv:Fe&&g(_.specularIntensityMap.channel),transmissionMapUv:Ge&&g(_.transmissionMap.channel),thicknessMapUv:V&&g(_.thicknessMap.channel),alphaMapUv:ne&&g(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(pt||G),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!N.attributes.uv&&(ze||ne),fog:!!C,useFog:_.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&pt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ie,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:ce,morphTextureStride:le,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:L.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Le,decodeVideoTexture:ze&&_.map.isVideoTexture===!0&&Ke.getTransfer(_.map.colorSpace)===rt,decodeVideoTextureEmissive:Wt&&_.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(_.emissiveMap.colorSpace)===rt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===an,flipSided:_.side===tn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:re&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(re&&_.extensions.multiDraw===!0||he)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function m(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let R in _.defines)E.push(R),E.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(f(E,_),M(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function f(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function M(_,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function A(_){let E=p[_.type],R;if(E){let P=Zn[E];R=Zd.clone(P.uniforms)}else R=_.uniforms;return R}function b(_,E){let R=h.get(E);return R!==void 0?++R.usedTimes:(R=new xy(i,E,_,s),l.push(R),h.set(E,R)),R}function T(_){if(--_.usedTimes===0){let E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function w(_){a.remove(_)}function y(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:A,acquireProgram:b,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:y}}function My(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Sy(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function _f(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xf(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function a(d,p,g,x,m,f){let M=i[e];return M===void 0?(M={id:d.id,object:d,geometry:p,material:g,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:f},i[e]=M):(M.id=d.id,M.object=d,M.geometry=p,M.material=g,M.materialVariant=o(d),M.groupOrder=x,M.renderOrder=d.renderOrder,M.z=m,M.group=f),e++,M}function c(d,p,g,x,m,f,M){M.reversedDepth===!0&&(m=-m);let A=a(d,p,g,x,m,f);g.transmission>0?n.push(A):g.transparent===!0?s.push(A):t.push(A)}function l(d,p,g,x,m,f){let M=a(d,p,g,x,m,f);g.transmission>0?n.unshift(M):g.transparent===!0?s.unshift(M):t.unshift(M)}function h(d,p){t.length>1&&t.sort(d||Sy),n.length>1&&n.sort(p||_f),s.length>1&&s.sort(p||_f)}function u(){for(let d=e,p=i.length;d<p;d++){let g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function Ey(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new xf,i.set(n,[o])):s>=r.length?(o=new xf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function wy(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new De};break;case"SpotLight":t={position:new W,direction:new W,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new W,halfWidth:new W,halfHeight:new W};break}return i[e.id]=t,t}}}function Ty(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Ay=0;function Cy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ry(i){let e=new wy,t=Ty(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new W);let s=new W,r=new We,o=new We;function a(l){let h=0,u=0,d=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,M=0,A=0,b=0,T=0,w=0,y=0,_=0,E=0,R=0;l.sort(Cy);for(let O=0,L=l.length;O<L;O++){let C=l[O],N=C.color,F=C.intensity,k=C.distance,Q=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Oi?Q=C.shadow.map.texture:Q=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=N.r*F,u+=N.g*F,d+=N.b*F;else if(C.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(C.sh.coefficients[K],F);R++}else if(C.isSunLight){let K=e.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let J=C.shadow,te=t.get(C);te.shadowIntensity=J.intensity,te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize.copy(J.mapSize).multiply(J.getFrameExtents()),n.sunShadow[g]=te,n.sunShadowMap[g]=Q;let ce=J.getViewportCount();for(let le=0;le<ce;le++)n.sunShadowMatrix[x+le]=J.getMatrix(le),n.sunShadowCascade[x+le]=J._cascadeData[le];x+=ce,g++}n.sun[p]=K,p++}else if(C.isDirectionalLight){let K=e.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let J=C.shadow,te=t.get(C);te.shadowIntensity=J.intensity,te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,n.directionalShadow[m]=te,n.directionalShadowMap[m]=Q,n.directionalShadowMatrix[m]=C.shadow.matrix,T++}n.directional[m]=K,m++}else if(C.isSpotLight){let K=e.get(C);K.position.setFromMatrixPosition(C.matrixWorld),K.color.copy(N).multiplyScalar(F),K.distance=k,K.coneCos=Math.cos(C.angle),K.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),K.decay=C.decay,n.spot[M]=K;let J=C.shadow;if(C.map&&(n.spotLightMap[_]=C.map,_++,J.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[M]=J.matrix,C.castShadow){let te=t.get(C);te.shadowIntensity=J.intensity,te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,n.spotShadow[M]=te,n.spotShadowMap[M]=Q,y++}M++}else if(C.isRectAreaLight){let K=e.get(C);K.color.copy(N).multiplyScalar(F),K.halfWidth.set(C.width*.5,0,0),K.halfHeight.set(0,C.height*.5,0),n.rectArea[A]=K,A++}else if(C.isPointLight){let K=e.get(C);if(K.color.copy(C.color).multiplyScalar(C.intensity),K.distance=C.distance,K.decay=C.decay,C.castShadow){let J=C.shadow,te=t.get(C);te.shadowIntensity=J.intensity,te.shadowBias=J.bias,te.shadowNormalBias=J.normalBias,te.shadowRadius=J.radius,te.shadowMapSize=J.mapSize,te.shadowCameraNear=J.camera.near,te.shadowCameraFar=J.camera.far,n.pointShadow[f]=te,n.pointShadowMap[f]=Q,n.pointShadowMatrix[f]=C.shadow.matrix,w++}n.point[f]=K,f++}else if(C.isHemisphereLight){let K=e.get(C);K.skyColor.copy(C.color).multiplyScalar(F),K.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[b]=K,b++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let P=n.hash;(P.sunLength!==p||P.directionalLength!==m||P.pointLength!==f||P.spotLength!==M||P.rectAreaLength!==A||P.hemiLength!==b||P.numSunShadows!==g||P.numDirectionalShadows!==T||P.numPointShadows!==w||P.numSpotShadows!==y||P.numSpotMaps!==_||P.numLightProbes!==R)&&(n.sun.length=p,n.directional.length=m,n.spot.length=M,n.rectArea.length=A,n.point.length=f,n.hemi.length=b,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=y,n.spotShadowMap.length=y,n.spotLightMatrix.length=y+_-E,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,P.sunLength=p,P.directionalLength=m,P.pointLength=f,P.spotLength=M,P.rectAreaLength=A,P.hemiLength=b,P.numSunShadows=g,P.numDirectionalShadows=T,P.numPointShadows=w,P.numSpotShadows=y,P.numSpotMaps=_,P.numLightProbes=R,n.version=Ay++)}function c(l,h){let u=0,d=0,p=0,g=0,x=0,m=0,f=h.matrixWorldInverse;for(let M=0,A=l.length;M<A;M++){let b=l[M];if(b.isSunLight){let T=n.sun[u];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(f),u++}else if(b.isDirectionalLight){let T=n.directional[d];T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),d++}else if(b.isSpotLight){let T=n.spot[g];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),g++}else if(b.isRectAreaLight){let T=n.rectArea[x];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),o.identity(),r.copy(b.matrixWorld),r.premultiply(f),o.extractRotation(r),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),x++}else if(b.isPointLight){let T=n.point[p];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),p++}else if(b.isHemisphereLight){let T=n.hemi[m];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(f),m++}}}return{setup:a,setupView:c,state:n}}function yf(i){let e=new Ry(i),t=[],n=[],s=[];function r(d){u.camera=d,t.length=0,n.length=0,s.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function Iy(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new yf(i),e.set(s,[a])):r>=o.length?(a=new yf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Py=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ly=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Dy=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Ny=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],vf=new We,io=new W,hh=new W;function Uy(i,e,t){let n=new Vs,s=new Ue,r=new Ue,o=new at,a=new fa,c=new pa,l={},h=t.maxTextureSize,u={[qn]:tn,[tn]:qn,[an]:an},d=new pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ue},radius:{value:4}},vertexShader:Py,fragmentShader:Ly}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Ft;g.setAttribute("position",new wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Gt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$r;let f=this.type;this.render=function(w,y,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===hd&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=$r);let E=i.getRenderTarget(),R=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Yn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let L=f!==this.type;L&&y.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(N=>N.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,N=w.length;C<N;C++){let F=w[C],k=F.shadow;if(k===void 0){Ie("WebGLShadowMap:",F,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let Q=k.getFrameExtents();s.multiply(Q),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,k.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=K,k.map===null||L===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Ys){if(F.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new sn(s.x,s.y,{format:Oi,type:Nn,minFilter:It,magFilter:It,generateMipmaps:!1}),k.map.texture.name=F.name+".shadowMap",k.map.depthTexture=new Ri(s.x,s.y,mn),k.map.depthTexture.name=F.name+".shadowMapDepth",k.map.depthTexture.format=Vn,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Rt,k.map.depthTexture.magFilter=Rt}else F.isPointLight?(k.map=new yl(s.x),k.map.depthTexture=new ua(s.x,Dn)):(k.map=new sn(s.x,s.y),k.map.depthTexture=new Ri(s.x,s.y,Dn)),k.map.depthTexture.name=F.name+".shadowMap",k.map.depthTexture.format=Vn,this.type===$r?(k.map.depthTexture.compareFunction=K?ml:pl,k.map.depthTexture.minFilter=It,k.map.depthTexture.magFilter=It):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Rt,k.map.depthTexture.magFilter=Rt);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);let J=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();F.isPointLight!==!0&&k.updateMatrices(F,_);for(let te=0;te<J;te++){let ce=k.getCamera(te);if(F.isPointLight){let le=k.camera,Oe=k.matrix,pe=F.distance||le.far;pe!==le.far&&(le.far=pe,le.updateProjectionMatrix()),io.setFromMatrixPosition(F.matrixWorld),le.position.copy(io),hh.copy(le.position),hh.add(Dy[te]),le.up.copy(Ny[te]),le.lookAt(hh),le.updateMatrixWorld(),Oe.makeTranslation(-io.x,-io.y,-io.z),vf.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),k._frustum.setFromProjectionMatrix(vf,le.coordinateSystem,le.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,te),i.clear();else{te===0&&(i.setRenderTarget(k.map),i.clear());let le=k.getViewport(te);o.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),O.viewport(o)}n=k.getFrustum(te),b(y,_,ce,F,this.type)}k.isPointLightShadow!==!0&&this.type===Ys&&M(k,_),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(E,R,P)};function M(w,y){let _=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new sn(s.x,s.y,{format:Oi,type:Nn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(y,null,_,d,x,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(y,null,_,p,x,null)}function A(w,y,_,E){let R=null,P=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)R=P;else if(R=_.isPointLight===!0?c:a,i.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let O=R.uuid,L=y.uuid,C=l[O];C===void 0&&(C={},l[O]=C);let N=C[L];N===void 0&&(N=R.clone(),C[L]=N,y.addEventListener("dispose",T)),R=N}if(R.visible=y.visible,R.wireframe=y.wireframe,E===Ys?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:u[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let O=i.properties.get(R);O.light=_}return R}function b(w,y,_,E,R){if(w.visible===!1)return;if(w.layers.test(y.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===Ys)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);let L=e.update(w),C=w.material;if(Array.isArray(C)){let N=L.groups;for(let F=0,k=N.length;F<k;F++){let Q=N[F],K=C[Q.materialIndex];if(K&&K.visible){let J=A(w,K,E,R);w.onBeforeShadow(i,w,y,_,L,J,Q),i.renderBufferDirect(_,null,L,J,w,Q),w.onAfterShadow(i,w,y,_,L,J,Q)}}}else if(C.visible){let N=A(w,C,E,R);w.onBeforeShadow(i,w,y,_,L,N,null),i.renderBufferDirect(_,null,L,N,w,null),w.onAfterShadow(i,w,y,_,L,N,null)}}let O=w.children;for(let L=0,C=O.length;L<C;L++)b(O[L],y,_,E,R)}function T(w){w.target.removeEventListener("dispose",T);for(let _ in l){let E=l[_],R=w.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function Fy(i,e){function t(){let V=!1,de=new at,ne=null,fe=new at(0,0,0,0);return{setMask:function(ve){ne!==ve&&!V&&(i.colorMask(ve,ve,ve,ve),ne=ve)},setLocked:function(ve){V=ve},setClear:function(ve,re,Le,Ce,mt){mt===!0&&(ve*=Ce,re*=Ce,Le*=Ce),de.set(ve,re,Le,Ce),fe.equals(de)===!1&&(i.clearColor(ve,re,Le,Ce),fe.copy(de))},reset:function(){V=!1,ne=null,fe.set(-1,0,0,0)}}}function n(){let V=!1,de=!1,ne=null,fe=null,ve=null;return{setReversed:function(re){if(de!==re){let Le=e.get("EXT_clip_control");re?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),de=re;let Ce=ve;ve=null,this.setClear(Ce)}},getReversed:function(){return de},setTest:function(re){re?X(i.DEPTH_TEST):ie(i.DEPTH_TEST)},setMask:function(re){ne!==re&&!V&&(i.depthMask(re),ne=re)},setFunc:function(re){if(de&&(re=Yd[re]),fe!==re){switch(re){case Qo:i.depthFunc(i.NEVER);break;case ea:i.depthFunc(i.ALWAYS);break;case ta:i.depthFunc(i.LESS);break;case Ps:i.depthFunc(i.LEQUAL);break;case na:i.depthFunc(i.EQUAL);break;case ia:i.depthFunc(i.GEQUAL);break;case sa:i.depthFunc(i.GREATER);break;case ra:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=re}},setLocked:function(re){V=re},setClear:function(re){ve!==re&&(ve=re,de&&(re=1-re),i.clearDepth(re))},reset:function(){V=!1,ne=null,fe=null,ve=null,de=!1}}}function s(){let V=!1,de=null,ne=null,fe=null,ve=null,re=null,Le=null,Ce=null,mt=null;return{setTest:function(it){V||(it?X(i.STENCIL_TEST):ie(i.STENCIL_TEST))},setMask:function(it){de!==it&&!V&&(i.stencilMask(it),de=it)},setFunc:function(it,Mn,Bn){(ne!==it||fe!==Mn||ve!==Bn)&&(i.stencilFunc(it,Mn,Bn),ne=it,fe=Mn,ve=Bn)},setOp:function(it,Mn,Bn){(re!==it||Le!==Mn||Ce!==Bn)&&(i.stencilOp(it,Mn,Bn),re=it,Le=Mn,Ce=Bn)},setLocked:function(it){V=it},setClear:function(it){mt!==it&&(i.clearStencil(it),mt=it)},reset:function(){V=!1,de=null,ne=null,fe=null,ve=null,re=null,Le=null,Ce=null,mt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},d={},p=new WeakMap,g=[],x=null,m=!1,f=null,M=null,A=null,b=null,T=null,w=null,y=null,_=new De(0,0,0),E=0,R=!1,P=null,O=null,L=null,C=null,N=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,Q=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(K)[1]),k=Q>=1):K.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),k=Q>=2);let J=null,te={},ce=i.getParameter(i.SCISSOR_BOX),le=i.getParameter(i.VIEWPORT),Oe=new at().fromArray(ce),pe=new at().fromArray(le);function Ne(V,de,ne,fe){let ve=new Uint8Array(4),re=i.createTexture();i.bindTexture(V,re),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Le=0;Le<ne;Le++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,fe,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(de+Le,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return re}let U={};U[i.TEXTURE_2D]=Ne(i.TEXTURE_2D,i.TEXTURE_2D,1),U[i.TEXTURE_CUBE_MAP]=Ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),U[i.TEXTURE_2D_ARRAY]=Ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),U[i.TEXTURE_3D]=Ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),X(i.DEPTH_TEST),o.setFunc(Ps),Xe(!1),pt(Tc),X(i.CULL_FACE),Qe(Yn);function X(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function ie(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function be(V,de){return d[V]!==de?(i.bindFramebuffer(V,de),d[V]=de,V===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=de),V===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=de),!0):!1}function he(V,de){let ne=g,fe=!1;if(V){ne=p.get(de),ne===void 0&&(ne=[],p.set(de,ne));let ve=V.textures;if(ne.length!==ve.length||ne[0]!==i.COLOR_ATTACHMENT0){for(let re=0,Le=ve.length;re<Le;re++)ne[re]=i.COLOR_ATTACHMENT0+re;ne.length=ve.length,fe=!0}}else ne[0]!==i.BACK&&(ne[0]=i.BACK,fe=!0);fe&&i.drawBuffers(ne)}function ze(V){return x!==V?(i.useProgram(V),x=V,!0):!1}let xt={[ns]:i.FUNC_ADD,[dd]:i.FUNC_SUBTRACT,[fd]:i.FUNC_REVERSE_SUBTRACT};xt[pd]=i.MIN,xt[md]=i.MAX;let Ye={[gd]:i.ZERO,[_d]:i.ONE,[xd]:i.SRC_COLOR,[Ic]:i.SRC_ALPHA,[Ed]:i.SRC_ALPHA_SATURATE,[Md]:i.DST_COLOR,[vd]:i.DST_ALPHA,[yd]:i.ONE_MINUS_SRC_COLOR,[Pc]:i.ONE_MINUS_SRC_ALPHA,[Sd]:i.ONE_MINUS_DST_COLOR,[bd]:i.ONE_MINUS_DST_ALPHA,[wd]:i.CONSTANT_COLOR,[Td]:i.ONE_MINUS_CONSTANT_COLOR,[Ad]:i.CONSTANT_ALPHA,[Cd]:i.ONE_MINUS_CONSTANT_ALPHA};function Qe(V,de,ne,fe,ve,re,Le,Ce,mt,it){if(V===Yn){m===!0&&(ie(i.BLEND),m=!1);return}if(m===!1&&(X(i.BLEND),m=!0),V!==ud){if(V!==f||it!==R){if((M!==ns||T!==ns)&&(i.blendEquation(i.FUNC_ADD),M=ns,T=ns),it)switch(V){case Ks:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ac:i.blendFunc(i.ONE,i.ONE);break;case Cc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:He("WebGLState: Invalid blending: ",V);break}else switch(V){case Ks:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ac:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Cc:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rc:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",V);break}A=null,b=null,w=null,y=null,_.set(0,0,0),E=0,f=V,R=it}return}ve=ve||de,re=re||ne,Le=Le||fe,(de!==M||ve!==T)&&(i.blendEquationSeparate(xt[de],xt[ve]),M=de,T=ve),(ne!==A||fe!==b||re!==w||Le!==y)&&(i.blendFuncSeparate(Ye[ne],Ye[fe],Ye[re],Ye[Le]),A=ne,b=fe,w=re,y=Le),(Ce.equals(_)===!1||mt!==E)&&(i.blendColor(Ce.r,Ce.g,Ce.b,mt),_.copy(Ce),E=mt),f=V,R=!1}function nt(V,de){V.side===an?ie(i.CULL_FACE):X(i.CULL_FACE);let ne=V.side===tn;de&&(ne=!ne),Xe(ne),V.blending===Ks&&V.transparent===!1?Qe(Yn):Qe(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);let fe=V.stencilWrite;a.setTest(fe),fe&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Wt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(V){P!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),P=V)}function pt(V){V!==ld?(X(i.CULL_FACE),V!==O&&(V===Tc?i.cullFace(i.BACK):V===cd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ie(i.CULL_FACE),O=V}function Tt(V){V!==L&&(k&&i.lineWidth(V),L=V)}function Wt(V,de,ne){V?(X(i.POLYGON_OFFSET_FILL),(C!==de||N!==ne)&&(C=de,N=ne,o.getReversed()&&(de=-de),i.polygonOffset(de,ne))):ie(i.POLYGON_OFFSET_FILL)}function yt(V){V?X(i.SCISSOR_TEST):ie(i.SCISSOR_TEST)}function Mt(V){V===void 0&&(V=i.TEXTURE0+F-1),J!==V&&(i.activeTexture(V),J=V)}function G(V,de,ne){ne===void 0&&(J===null?ne=i.TEXTURE0+F-1:ne=J);let fe=te[ne];fe===void 0&&(fe={type:void 0,texture:void 0},te[ne]=fe),(fe.type!==V||fe.texture!==de)&&(J!==ne&&(i.activeTexture(ne),J=ne),i.bindTexture(V,de||U[V]),fe.type=V,fe.texture=de)}function At(){let V=te[J];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function tt(){try{i.compressedTexImage2D(...arguments)}catch(V){He("WebGLState:",V)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(V){He("WebGLState:",V)}}function v(){try{i.texSubImage2D(...arguments)}catch(V){He("WebGLState:",V)}}function $(){try{i.texSubImage3D(...arguments)}catch(V){He("WebGLState:",V)}}function D(){try{i.compressedTexSubImage2D(...arguments)}catch(V){He("WebGLState:",V)}}function H(){try{i.compressedTexSubImage3D(...arguments)}catch(V){He("WebGLState:",V)}}function se(){try{i.texStorage2D(...arguments)}catch(V){He("WebGLState:",V)}}function oe(){try{i.texStorage3D(...arguments)}catch(V){He("WebGLState:",V)}}function Z(){try{i.texImage2D(...arguments)}catch(V){He("WebGLState:",V)}}function ee(){try{i.texImage3D(...arguments)}catch(V){He("WebGLState:",V)}}function ae(V){return u[V]!==void 0?u[V]:i.getParameter(V)}function Ee(V,de){u[V]!==de&&(i.pixelStorei(V,de),u[V]=de)}function me(V){Oe.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),Oe.copy(V))}function ue(V){pe.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),pe.copy(V))}function Pe(V,de){let ne=l.get(de);ne===void 0&&(ne=new WeakMap,l.set(de,ne));let fe=ne.get(V);fe===void 0&&(fe=i.getUniformBlockIndex(de,V.name),ne.set(V,fe))}function Fe(V,de){let fe=l.get(de).get(V);c.get(de)!==fe&&(i.uniformBlockBinding(de,fe,V.__bindingPointIndex),c.set(de,fe))}function Ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},J=null,te={},d={},p=new WeakMap,g=[],x=null,m=!1,f=null,M=null,A=null,b=null,T=null,w=null,y=null,_=new De(0,0,0),E=0,R=!1,P=null,O=null,L=null,C=null,N=null,Oe.set(0,0,i.canvas.width,i.canvas.height),pe.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:X,disable:ie,bindFramebuffer:be,drawBuffers:he,useProgram:ze,setBlending:Qe,setMaterial:nt,setFlipSided:Xe,setCullFace:pt,setLineWidth:Tt,setPolygonOffset:Wt,setScissorTest:yt,activeTexture:Mt,bindTexture:G,unbindTexture:At,compressedTexImage2D:tt,compressedTexImage3D:I,texImage2D:Z,texImage3D:ee,pixelStorei:Ee,getParameter:ae,updateUBOMapping:Pe,uniformBlockBinding:Fe,texStorage2D:se,texStorage3D:oe,texSubImage2D:v,texSubImage3D:$,compressedTexSubImage2D:D,compressedTexSubImage3D:H,scissor:me,viewport:ue,reset:Ge}}function Oy(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ue,h=new WeakMap,u=new Set,d,p=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(I,v){return g?new OffscreenCanvas(I,v):Ns("canvas")}function m(I,v,$){let D=1,H=tt(I);if((H.width>$||H.height>$)&&(D=$/Math.max(H.width,H.height)),D<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let se=Math.floor(D*H.width),oe=Math.floor(D*H.height);d===void 0&&(d=x(se,oe));let Z=v?x(se,oe):d;return Z.width=se,Z.height=oe,Z.getContext("2d").drawImage(I,0,0,se,oe),Ie("WebGLRenderer: Texture has been resized from ("+H.width+"x"+H.height+") to ("+se+"x"+oe+")."),Z}else return"data"in I&&Ie("WebGLRenderer: Image in DataTexture is too big ("+H.width+"x"+H.height+")."),I;return I}function f(I){return I.generateMipmaps}function M(I){i.generateMipmap(I)}function A(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(I,v,$,D,H,se=!1){if(I!==null){if(i[I]!==void 0)return i[I];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let oe;D&&(oe=e.get("EXT_texture_norm16"),oe||Ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=v;if(v===i.RED&&($===i.FLOAT&&(Z=i.R32F),$===i.HALF_FLOAT&&(Z=i.R16F),$===i.UNSIGNED_BYTE&&(Z=i.R8),$===i.UNSIGNED_SHORT&&oe&&(Z=oe.R16_EXT),$===i.SHORT&&oe&&(Z=oe.R16_SNORM_EXT)),v===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(Z=i.R8UI),$===i.UNSIGNED_SHORT&&(Z=i.R16UI),$===i.UNSIGNED_INT&&(Z=i.R32UI),$===i.BYTE&&(Z=i.R8I),$===i.SHORT&&(Z=i.R16I),$===i.INT&&(Z=i.R32I)),v===i.RG&&($===i.FLOAT&&(Z=i.RG32F),$===i.HALF_FLOAT&&(Z=i.RG16F),$===i.UNSIGNED_BYTE&&(Z=i.RG8),$===i.UNSIGNED_SHORT&&oe&&(Z=oe.RG16_EXT),$===i.SHORT&&oe&&(Z=oe.RG16_SNORM_EXT)),v===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(Z=i.RG8UI),$===i.UNSIGNED_SHORT&&(Z=i.RG16UI),$===i.UNSIGNED_INT&&(Z=i.RG32UI),$===i.BYTE&&(Z=i.RG8I),$===i.SHORT&&(Z=i.RG16I),$===i.INT&&(Z=i.RG32I)),v===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),$===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),$===i.UNSIGNED_INT&&(Z=i.RGB32UI),$===i.BYTE&&(Z=i.RGB8I),$===i.SHORT&&(Z=i.RGB16I),$===i.INT&&(Z=i.RGB32I)),v===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),$===i.UNSIGNED_INT&&(Z=i.RGBA32UI),$===i.BYTE&&(Z=i.RGBA8I),$===i.SHORT&&(Z=i.RGBA16I),$===i.INT&&(Z=i.RGBA32I)),v===i.RGB&&($===i.UNSIGNED_SHORT&&oe&&(Z=oe.RGB16_EXT),$===i.SHORT&&oe&&(Z=oe.RGB16_SNORM_EXT),$===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),$===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),v===i.RGBA){let ee=se?Mr:Ke.getTransfer(H);$===i.FLOAT&&(Z=i.RGBA32F),$===i.HALF_FLOAT&&(Z=i.RGBA16F),$===i.UNSIGNED_BYTE&&(Z=ee===rt?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT&&oe&&(Z=oe.RGBA16_EXT),$===i.SHORT&&oe&&(Z=oe.RGBA16_SNORM_EXT),$===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function T(I,v){let $;return I?v===null||v===Dn||v===Js?$=i.DEPTH24_STENCIL8:v===mn?$=i.DEPTH32F_STENCIL8:v===js&&($=i.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Dn||v===Js?$=i.DEPTH_COMPONENT24:v===mn?$=i.DEPTH_COMPONENT32F:v===js&&($=i.DEPTH_COMPONENT16),$}function w(I,v){return f(I)===!0||I.isFramebufferTexture&&I.minFilter!==Rt&&I.minFilter!==It?Math.log2(Math.max(v.width,v.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?v.mipmaps.length:1}function y(I){let v=I.target;v.removeEventListener("dispose",y),E(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&u.delete(v)}function _(I){let v=I.target;v.removeEventListener("dispose",_),P(v)}function E(I){let v=n.get(I);if(v.__webglInit===void 0)return;let $=I.source,D=p.get($);if(D){let H=D[v.__cacheKey];H.usedTimes--,H.usedTimes===0&&R(I),Object.keys(D).length===0&&p.delete($)}n.remove(I)}function R(I){let v=n.get(I);i.deleteTexture(v.__webglTexture);let $=I.source,D=p.get($);delete D[v.__cacheKey],o.memory.textures--}function P(I){let v=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let D=0;D<6;D++){if(Array.isArray(v.__webglFramebuffer[D]))for(let H=0;H<v.__webglFramebuffer[D].length;H++)i.deleteFramebuffer(v.__webglFramebuffer[D][H]);else i.deleteFramebuffer(v.__webglFramebuffer[D]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[D])}else{if(Array.isArray(v.__webglFramebuffer))for(let D=0;D<v.__webglFramebuffer.length;D++)i.deleteFramebuffer(v.__webglFramebuffer[D]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let D=0;D<v.__webglColorRenderbuffer.length;D++)v.__webglColorRenderbuffer[D]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[D]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let $=I.textures;for(let D=0,H=$.length;D<H;D++){let se=n.get($[D]);se.__webglTexture&&(i.deleteTexture(se.__webglTexture),o.memory.textures--),n.remove($[D])}n.remove(I)}let O=0;function L(){O=0}function C(){return O}function N(I){O=I}function F(){let I=O;return I>=s.maxTextures&&Ie("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,I}function k(I){let v=[];return v.push(I.wrapS),v.push(I.wrapT),v.push(I.wrapR||0),v.push(I.magFilter),v.push(I.minFilter),v.push(I.anisotropy),v.push(I.internalFormat),v.push(I.format),v.push(I.type),v.push(I.generateMipmaps),v.push(I.premultiplyAlpha),v.push(I.flipY),v.push(I.unpackAlignment),v.push(I.colorSpace),v.join()}function Q(I,v){let $=n.get(I);if(I.isVideoTexture&&G(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&$.__version!==I.version){let D=I.image;if(D===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(D.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{ie($,I,v);return}}else I.isExternalTexture&&($.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+v)}function K(I,v){let $=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&$.__version!==I.version){ie($,I,v);return}else I.isExternalTexture&&($.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+v)}function J(I,v){let $=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&$.__version!==I.version){ie($,I,v);return}t.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+v)}function te(I,v){let $=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&$.__version!==I.version){be($,I,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+v)}let ce={[Ti]:i.REPEAT,[yn]:i.CLAMP_TO_EDGE,[Ls]:i.MIRRORED_REPEAT},le={[Rt]:i.NEAREST,[Ra]:i.NEAREST_MIPMAP_NEAREST,[ss]:i.NEAREST_MIPMAP_LINEAR,[It]:i.LINEAR,[Zs]:i.LINEAR_MIPMAP_NEAREST,[Ln]:i.LINEAR_MIPMAP_LINEAR},Oe={[kd]:i.NEVER,[Wd]:i.ALWAYS,[zd]:i.LESS,[pl]:i.LEQUAL,[Hd]:i.EQUAL,[ml]:i.GEQUAL,[Vd]:i.GREATER,[Gd]:i.NOTEQUAL};function pe(I,v){if(v.type===mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===It||v.magFilter===Zs||v.magFilter===ss||v.magFilter===Ln||v.minFilter===It||v.minFilter===Zs||v.minFilter===ss||v.minFilter===Ln)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,ce[v.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,ce[v.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,ce[v.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,le[v.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,le[v.minFilter]),v.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Oe[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Rt||v.minFilter!==ss&&v.minFilter!==Ln||v.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let $=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Ne(I,v){let $=!1;I.__webglInit===void 0&&(I.__webglInit=!0,v.addEventListener("dispose",y));let D=v.source,H=p.get(D);H===void 0&&(H={},p.set(D,H));let se=k(v);if(se!==I.__cacheKey){H[se]===void 0&&(H[se]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),H[se].usedTimes++;let oe=H[I.__cacheKey];oe!==void 0&&(H[I.__cacheKey].usedTimes--,oe.usedTimes===0&&R(v)),I.__cacheKey=se,I.__webglTexture=H[se].texture}return $}function U(I,v,$){return Math.floor(Math.floor(I/$)/v)}function X(I,v,$,D){let se=I.updateRanges;if(se.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,$,D,v.data);else{se.sort((Ee,me)=>Ee.start-me.start);let oe=0;for(let Ee=1;Ee<se.length;Ee++){let me=se[oe],ue=se[Ee],Pe=me.start+me.count,Fe=U(ue.start,v.width,4),Ge=U(me.start,v.width,4);ue.start<=Pe+1&&Fe===Ge&&U(ue.start+ue.count-1,v.width,4)===Fe?me.count=Math.max(me.count,ue.start+ue.count-me.start):(++oe,se[oe]=ue)}se.length=oe+1;let Z=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),ae=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Ee=0,me=se.length;Ee<me;Ee++){let ue=se[Ee],Pe=Math.floor(ue.start/4),Fe=Math.ceil(ue.count/4),Ge=Pe%v.width,V=Math.floor(Pe/v.width),de=Fe,ne=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(i.UNPACK_SKIP_ROWS,V),t.texSubImage2D(i.TEXTURE_2D,0,Ge,V,de,ne,$,D,v.data)}I.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Z),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,ae)}}function ie(I,v,$){let D=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(D=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(D=i.TEXTURE_3D);let H=Ne(I,v),se=v.source;t.bindTexture(D,I.__webglTexture,i.TEXTURE0+$);let oe=n.get(se);if(se.version!==oe.__version||H===!0){if(t.activeTexture(i.TEXTURE0+$),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ne=Ke.getPrimaries(Ke.workingColorSpace),fe=v.colorSpace===fi?null:Ke.getPrimaries(v.colorSpace),ve=v.colorSpace===fi||ne===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=m(v.image,!1,s.maxTextureSize);ee=At(v,ee);let ae=r.convert(v.format,v.colorSpace),Ee=r.convert(v.type),me=b(v.internalFormat,ae,Ee,v.normalized,v.colorSpace,v.isVideoTexture);pe(D,v);let ue,Pe=v.mipmaps,Fe=v.isVideoTexture!==!0,Ge=oe.__version===void 0||H===!0,V=se.dataReady,de=w(v,ee);if(v.isDepthTexture)me=T(v.format===Fi,v.type),Ge&&(Fe?t.texStorage2D(i.TEXTURE_2D,1,me,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,me,ee.width,ee.height,0,ae,Ee,null));else if(v.isDataTexture)if(Pe.length>0){Fe&&Ge&&t.texStorage2D(i.TEXTURE_2D,de,me,Pe[0].width,Pe[0].height);for(let ne=0,fe=Pe.length;ne<fe;ne++)ue=Pe[ne],Fe?V&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,ae,Ee,ue.data):t.texImage2D(i.TEXTURE_2D,ne,me,ue.width,ue.height,0,ae,Ee,ue.data);v.generateMipmaps=!1}else Fe?(Ge&&t.texStorage2D(i.TEXTURE_2D,de,me,ee.width,ee.height),V&&X(v,ee,ae,Ee)):t.texImage2D(i.TEXTURE_2D,0,me,ee.width,ee.height,0,ae,Ee,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Fe&&Ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,me,Pe[0].width,Pe[0].height,ee.depth);for(let ne=0,fe=Pe.length;ne<fe;ne++)if(ue=Pe[ne],v.format!==gn)if(ae!==null)if(Fe){if(V)if(v.layerUpdates.size>0){let ve=Qc(ue.width,ue.height,v.format,v.type);for(let re of v.layerUpdates){let Le=ue.data.subarray(re*ve/ue.data.BYTES_PER_ELEMENT,(re+1)*ve/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,re,ue.width,ue.height,1,ae,Le)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,ee.depth,ae,ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,me,ue.width,ue.height,ee.depth,0,ue.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ue.width,ue.height,ee.depth,ae,Ee,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,me,ue.width,ue.height,ee.depth,0,ae,Ee,ue.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{Fe&&Ge&&t.texStorage2D(i.TEXTURE_2D,de,me,Pe[0].width,Pe[0].height);for(let ne=0,fe=Pe.length;ne<fe;ne++)ue=Pe[ne],v.format!==gn?ae!==null?Fe?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,ae,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,me,ue.width,ue.height,0,ue.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?V&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ue.width,ue.height,ae,Ee,ue.data):t.texImage2D(i.TEXTURE_2D,ne,me,ue.width,ue.height,0,ae,Ee,ue.data)}else if(v.isDataArrayTexture)if(Fe){if(Ge&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,me,ee.width,ee.height,ee.depth),V)if(v.layerUpdates.size>0){let ne=Qc(ee.width,ee.height,v.format,v.type);for(let fe of v.layerUpdates){let ve=ee.data.subarray(fe*ne/ee.data.BYTES_PER_ELEMENT,(fe+1)*ne/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,fe,ee.width,ee.height,1,ae,Ee,ve)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ae,Ee,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,me,ee.width,ee.height,ee.depth,0,ae,Ee,ee.data);else if(v.isData3DTexture)Fe?(Ge&&t.texStorage3D(i.TEXTURE_3D,de,me,ee.width,ee.height,ee.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ae,Ee,ee.data)):t.texImage3D(i.TEXTURE_3D,0,me,ee.width,ee.height,ee.depth,0,ae,Ee,ee.data);else if(v.isFramebufferTexture){if(Ge)if(Fe)t.texStorage2D(i.TEXTURE_2D,de,me,ee.width,ee.height);else{let ne=ee.width,fe=ee.height;for(let ve=0;ve<de;ve++)t.texImage2D(i.TEXTURE_2D,ve,me,ne,fe,0,ae,Ee,null),ne>>=1,fe>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let ne=i.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),ee.parentNode!==ne){ne.appendChild(ee),u.add(v),ne.onpaint=fe=>{let ve=fe.changedElements;for(let re of u)ve.includes(re.image)&&(re.needsUpdate=!0)},ne.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ee);else{let ve=i.RGBA,re=i.RGBA,Le=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ve,re,Le,ee)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(Fe&&Ge){let ne=tt(Pe[0]);t.texStorage2D(i.TEXTURE_2D,de,me,ne.width,ne.height)}for(let ne=0,fe=Pe.length;ne<fe;ne++)ue=Pe[ne],Fe?V&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ae,Ee,ue):t.texImage2D(i.TEXTURE_2D,ne,me,ae,Ee,ue);v.generateMipmaps=!1}else if(Fe){if(Ge){let ne=tt(ee);t.texStorage2D(i.TEXTURE_2D,de,me,ne.width,ne.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae,Ee,ee)}else t.texImage2D(i.TEXTURE_2D,0,me,ae,Ee,ee);f(v)&&M(D),oe.__version=se.version,v.onUpdate&&v.onUpdate(v)}I.__version=v.version}function be(I,v,$){if(v.image.length!==6)return;let D=Ne(I,v),H=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+$);let se=n.get(H);if(H.version!==se.__version||D===!0){t.activeTexture(i.TEXTURE0+$);let oe=Ke.getPrimaries(Ke.workingColorSpace),Z=v.colorSpace===fi?null:Ke.getPrimaries(v.colorSpace),ee=v.colorSpace===fi||oe===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let ae=v.isCompressedTexture||v.image[0].isCompressedTexture,Ee=v.image[0]&&v.image[0].isDataTexture,me=[];for(let re=0;re<6;re++)!ae&&!Ee?me[re]=m(v.image[re],!0,s.maxCubemapSize):me[re]=Ee?v.image[re].image:v.image[re],me[re]=At(v,me[re]);let ue=me[0],Pe=r.convert(v.format,v.colorSpace),Fe=r.convert(v.type),Ge=b(v.internalFormat,Pe,Fe,v.normalized,v.colorSpace),V=v.isVideoTexture!==!0,de=se.__version===void 0||D===!0,ne=H.dataReady,fe=w(v,ue);pe(i.TEXTURE_CUBE_MAP,v);let ve;if(ae){V&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Ge,ue.width,ue.height);for(let re=0;re<6;re++){ve=me[re].mipmaps;for(let Le=0;Le<ve.length;Le++){let Ce=ve[Le];v.format!==gn?Pe!==null?V?ne&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Ce.width,Ce.height,Pe,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,Ge,Ce.width,Ce.height,0,Ce.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,0,0,Ce.width,Ce.height,Pe,Fe,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le,Ge,Ce.width,Ce.height,0,Pe,Fe,Ce.data)}}}else{if(ve=v.mipmaps,V&&de){ve.length>0&&fe++;let re=tt(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Ge,re.width,re.height)}for(let re=0;re<6;re++)if(Ee){V?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,me[re].width,me[re].height,Pe,Fe,me[re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,me[re].width,me[re].height,0,Pe,Fe,me[re].data);for(let Le=0;Le<ve.length;Le++){let mt=ve[Le].image[re].image;V?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,mt.width,mt.height,Pe,Fe,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,Ge,mt.width,mt.height,0,Pe,Fe,mt.data)}}else{V?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Pe,Fe,me[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ge,Pe,Fe,me[re]);for(let Le=0;Le<ve.length;Le++){let Ce=ve[Le];V?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,0,0,Pe,Fe,Ce.image[re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+re,Le+1,Ge,Pe,Fe,Ce.image[re])}}}f(v)&&M(i.TEXTURE_CUBE_MAP),se.__version=H.version,v.onUpdate&&v.onUpdate(v)}I.__version=v.version}function he(I,v,$,D,H,se){let oe=r.convert($.format,$.colorSpace),Z=r.convert($.type),ee=b($.internalFormat,oe,Z,$.normalized,$.colorSpace),ae=n.get(v),Ee=n.get($);if(Ee.__renderTarget=v,!ae.__hasExternalTextures){let me=Math.max(1,v.width>>se),ue=Math.max(1,v.height>>se);H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?t.texImage3D(H,se,ee,me,ue,v.depth,0,oe,Z,null):t.texImage2D(H,se,ee,me,ue,0,oe,Z,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),Mt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,D,H,Ee.__webglTexture,0,yt(v)):(H===i.TEXTURE_2D||H>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&H<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,D,H,Ee.__webglTexture,se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(I,v,$){if(i.bindRenderbuffer(i.RENDERBUFFER,I),v.depthBuffer){let D=v.depthTexture,H=D&&D.isDepthTexture?D.type:null,se=T(v.stencilBuffer,H),oe=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Mt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(v),se,v.width,v.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(v),se,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,se,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,I)}else{let D=v.textures;for(let H=0;H<D.length;H++){let se=D[H],oe=r.convert(se.format,se.colorSpace),Z=r.convert(se.type),ee=b(se.internalFormat,oe,Z,se.normalized,se.colorSpace);Mt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(v),ee,v.width,v.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(v),ee,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ee,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xt(I,v,$){let D=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let H=n.get(v.depthTexture);if(H.__renderTarget=v,(!H.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),D){if(H.__webglInit===void 0&&(H.__webglInit=!0,v.depthTexture.addEventListener("dispose",y)),H.__webglTexture===void 0){H.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture),pe(i.TEXTURE_CUBE_MAP,v.depthTexture);let ae=r.convert(v.depthTexture.format),Ee=r.convert(v.depthTexture.type),me;v.depthTexture.format===Vn?me=i.DEPTH_COMPONENT24:v.depthTexture.format===Fi&&(me=i.DEPTH24_STENCIL8);for(let ue=0;ue<6;ue++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,me,v.width,v.height,0,ae,Ee,null)}}else Q(v.depthTexture,0);let se=H.__webglTexture,oe=yt(v),Z=D?i.TEXTURE_CUBE_MAP_POSITIVE_X+$:i.TEXTURE_2D,ee=v.depthTexture.format===Fi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Vn)Mt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,Z,se,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,ee,Z,se,0);else if(v.depthTexture.format===Fi)Mt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,Z,se,0,oe):i.framebufferTexture2D(i.FRAMEBUFFER,ee,Z,se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ye(I){let v=n.get(I),$=I.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==I.depthTexture){let D=I.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),D){let H=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,D.removeEventListener("dispose",H)};D.addEventListener("dispose",H),v.__depthDisposeCallback=H}v.__boundDepthTexture=D}if(I.depthTexture&&!v.__autoAllocateDepthBuffer)if($)for(let D=0;D<6;D++)xt(v.__webglFramebuffer[D],I,D);else{let D=I.texture.mipmaps;D&&D.length>0?xt(v.__webglFramebuffer[0],I,0):xt(v.__webglFramebuffer,I,0)}else if($){v.__webglDepthbuffer=[];for(let D=0;D<6;D++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[D]),v.__webglDepthbuffer[D]===void 0)v.__webglDepthbuffer[D]=i.createRenderbuffer(),ze(v.__webglDepthbuffer[D],I,!1);else{let H=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=v.__webglDepthbuffer[D];i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,H,i.RENDERBUFFER,se)}}else{let D=I.texture.mipmaps;if(D&&D.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ze(v.__webglDepthbuffer,I,!1);else{let H=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,H,i.RENDERBUFFER,se)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Qe(I,v,$){let D=n.get(I);v!==void 0&&he(D.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&Ye(I)}function nt(I){let v=I.texture,$=n.get(I),D=n.get(v);I.addEventListener("dispose",_);let H=I.textures,se=I.isWebGLCubeRenderTarget===!0,oe=H.length>1;if(oe||(D.__webglTexture===void 0&&(D.__webglTexture=i.createTexture()),D.__version=v.version,o.memory.textures++),se){$.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0){$.__webglFramebuffer[Z]=[];for(let ee=0;ee<v.mipmaps.length;ee++)$.__webglFramebuffer[Z][ee]=i.createFramebuffer()}else $.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){$.__webglFramebuffer=[];for(let Z=0;Z<v.mipmaps.length;Z++)$.__webglFramebuffer[Z]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(oe)for(let Z=0,ee=H.length;Z<ee;Z++){let ae=n.get(H[Z]);ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&Mt(I)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Z=0;Z<H.length;Z++){let ee=H[Z];$.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[Z]);let ae=r.convert(ee.format,ee.colorSpace),Ee=r.convert(ee.type),me=b(ee.internalFormat,ae,Ee,ee.normalized,ee.colorSpace,I.isXRRenderTarget===!0),ue=yt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,me,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,$.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),ze($.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture),pe(i.TEXTURE_CUBE_MAP,v);for(let Z=0;Z<6;Z++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)he($.__webglFramebuffer[Z][ee],I,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ee);else he($.__webglFramebuffer[Z],I,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);f(v)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let Z=0,ee=H.length;Z<ee;Z++){let ae=H[Z],Ee=n.get(ae),me=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(me=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(me,Ee.__webglTexture),pe(me,ae),he($.__webglFramebuffer,I,ae,i.COLOR_ATTACHMENT0+Z,me,0),f(ae)&&M(me)}t.unbindTexture()}else{let Z=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Z=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,D.__webglTexture),pe(Z,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)he($.__webglFramebuffer[ee],I,v,i.COLOR_ATTACHMENT0,Z,ee);else he($.__webglFramebuffer,I,v,i.COLOR_ATTACHMENT0,Z,0);f(v)&&M(Z),t.unbindTexture()}I.depthBuffer&&Ye(I)}function Xe(I){let v=I.textures;for(let $=0,D=v.length;$<D;$++){let H=v[$];if(f(H)){let se=A(I),oe=n.get(H).__webglTexture;t.bindTexture(se,oe),M(se),t.unbindTexture()}}}let pt=[],Tt=[];function Wt(I){if(I.samples>0){if(Mt(I)===!1){let v=I.textures,$=I.width,D=I.height,H=i.COLOR_BUFFER_BIT,se=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(I),Z=v.length>1;if(Z)for(let ae=0;ae<v.length;ae++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer);let ee=I.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ae=0;ae<v.length;ae++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(H|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(H|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[ae]);let Ee=n.get(v[ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ee,0)}i.blitFramebuffer(0,0,$,D,0,0,$,D,H,i.NEAREST),c===!0&&(pt.length=0,Tt.length=0,pt.push(i.COLOR_ATTACHMENT0+ae),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(pt.push(se),Tt.push(se),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Tt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ae=0;ae<v.length;ae++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,oe.__webglColorRenderbuffer[ae]);let Ee=n.get(v[ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,Ee,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){let v=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function yt(I){return Math.min(s.maxSamples,I.samples)}function Mt(I){let v=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function G(I){let v=o.render.frame;h.get(I)!==v&&(h.set(I,v),I.update())}function At(I,v){let $=I.colorSpace,D=I.format,H=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||$!==Jt&&$!==fi&&(Ke.getTransfer($)===rt?(D!==gn||H!==ln)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",$)),v}function tt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=L,this.getTextureUnits=C,this.setTextureUnits=N,this.setTexture2D=Q,this.setTexture2DArray=K,this.setTexture3D=J,this.setTextureCube=te,this.rebindTextures=Qe,this.setupRenderTarget=nt,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function By(i,e){function t(n,s=fi){let r,o=Ke.getTransfer(s);if(n===ln)return i.UNSIGNED_BYTE;if(n===Pa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===La)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Vc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===zc)return i.BYTE;if(n===Hc)return i.SHORT;if(n===js)return i.UNSIGNED_SHORT;if(n===Ia)return i.INT;if(n===Dn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===Nn)return i.HALF_FLOAT;if(n===Wc)return i.ALPHA;if(n===Xc)return i.RGB;if(n===gn)return i.RGBA;if(n===Vn)return i.DEPTH_COMPONENT;if(n===Fi)return i.DEPTH_STENCIL;if(n===Da)return i.RED;if(n===Na)return i.RED_INTEGER;if(n===Oi)return i.RG;if(n===Ua)return i.RG_INTEGER;if(n===Fa)return i.RGBA_INTEGER;if(n===Yr||n===Kr||n===Zr||n===jr)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oa||n===Ba||n===ka||n===za)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Oa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ba)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ka)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===za)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===Jr||n===$a)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ha||n===Va)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ga)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Wa)return r.COMPRESSED_R11_EAC;if(n===Xa)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Jr)return r.COMPRESSED_RG11_EAC;if(n===$a)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===qa||n===Ya||n===Ka||n===Za||n===ja||n===Ja||n===Qa||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===ol)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===qa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ya)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ka)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Za)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ja)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ja)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===el)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===tl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===il)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rl)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ol)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===al||n===ll||n===cl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===al)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ll)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===cl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hl||n===ul||n===Qr||n===dl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===hl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ul)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Qr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Js?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var ky=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Dr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new pn({vertexShader:ky,fragmentShader:zy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new Nr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yh=class extends vn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,g=null,x=typeof XRWebGLBinding<"u",m=new xh,f={},M=t.getContextAttributes(),A=null,b=null,T=[],w=[],y=new Ue,_=null,E=null,R=new Et;R.viewport=new at;let P=new Et;P.viewport=new at;let O=[R,P],L=new Ma,C=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let X=T[U];return X===void 0&&(X=new Os,T[U]=X),X.getTargetRaySpace()},this.getControllerGrip=function(U){let X=T[U];return X===void 0&&(X=new Os,T[U]=X),X.getGripSpace()},this.getHand=function(U){let X=T[U];return X===void 0&&(X=new Os,T[U]=X),X.getHandSpace()};function F(U){let X=w.indexOf(U.inputSource);if(X===-1)return;let ie=T[X];ie!==void 0&&(ie.update(U.inputSource,U.frame,l||o),ie.dispatchEvent({type:U.type,data:U.inputSource}))}function k(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",Q);for(let U=0;U<T.length;U++){let X=w[U];X!==null&&(w[U]=null,T[U].disconnect(X))}C=null,N=null,m.reset();for(let U in f)delete f[U];if(e.setRenderTarget(A),p=null,d=null,u=null,s=null,b=null,Ne.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(y.width,y.height,!1),E!==null){let U=E.camera;U.fov=E.fov,U.zoom=E.zoom,U.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){r=U,n.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(U){l=U},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(U){if(s=U,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",k),s.addEventListener("inputsourceschange",Q),M.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,be=null,he=null;M.depth&&(he=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=M.stencil?Fi:Vn,be=M.stencil?Js:Dn);let ze={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(ze),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new sn(d.textureWidth,d.textureHeight,{format:gn,type:ln,depthTexture:new Ri(d.textureWidth,d.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ie),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new sn(p.framebufferWidth,p.framebufferHeight,{format:gn,type:ln,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ne.setContext(s),Ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Q(U){for(let X=0;X<U.removed.length;X++){let ie=U.removed[X],be=w.indexOf(ie);be>=0&&(w[be]=null,T[be].disconnect(ie))}for(let X=0;X<U.added.length;X++){let ie=U.added[X],be=w.indexOf(ie);if(be===-1){for(let ze=0;ze<T.length;ze++)if(ze>=w.length){w.push(ie),be=ze;break}else if(w[ze]===null){w[ze]=ie,be=ze;break}if(be===-1)break}let he=T[be];he&&he.connect(ie)}}let K=new W,J=new W;function te(U,X,ie){K.setFromMatrixPosition(X.matrixWorld),J.setFromMatrixPosition(ie.matrixWorld);let be=K.distanceTo(J),he=X.projectionMatrix.elements,ze=ie.projectionMatrix.elements,xt=he[14]/(he[10]-1),Ye=he[14]/(he[10]+1),Qe=(he[9]+1)/he[5],nt=(he[9]-1)/he[5],Xe=(he[8]-1)/he[0],pt=(ze[8]+1)/ze[0],Tt=xt*Xe,Wt=xt*pt,yt=be/(-Xe+pt),Mt=yt*-Xe;if(X.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(Mt),U.translateZ(yt),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),he[10]===-1)U.projectionMatrix.copy(X.projectionMatrix),U.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{let G=xt+yt,At=Ye+yt,tt=Tt-Mt,I=Wt+(be-Mt),v=Qe*Ye/At*G,$=nt*Ye/At*G;U.projectionMatrix.makePerspective(tt,I,v,$,G,At),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function ce(U,X){X===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(X.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(s===null)return;let X=U.near,ie=U.far;m.texture!==null&&(m.depthNear>0&&(X=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),L.near=P.near=R.near=X,L.far=P.far=R.far=ie,(C!==L.near||N!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),C=L.near,N=L.far),L.layers.mask=U.layers.mask|6,R.layers.mask=L.layers.mask&-5,P.layers.mask=L.layers.mask&-3;let be=U.parent,he=L.cameras;ce(L,be);for(let ze=0;ze<he.length;ze++)ce(he[ze],be);he.length===2?te(L,R,P):L.projectionMatrix.copy(R.projectionMatrix),E===null&&U.isPerspectiveCamera&&(E={camera:U,fov:U.fov,zoom:U.zoom}),le(U,L,be)};function le(U,X,ie){ie===null?U.matrix.copy(X.matrixWorld):(U.matrix.copy(ie.matrixWorld),U.matrix.invert(),U.matrix.multiply(X.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(X.projectionMatrix),U.projectionMatrixInverse.copy(X.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=Zi*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(U){c=U,d!==null&&(d.fixedFoveation=U),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=U)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function(U){return f[U]};let Oe=null;function pe(U,X){if(h=X.getViewerPose(l||o),g=X,h!==null){let ie=h.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let be=!1;ie.length!==L.cameras.length&&(L.cameras.length=0,be=!0);for(let Ye=0;Ye<ie.length;Ye++){let Qe=ie[Ye],nt=null;if(p!==null)nt=p.getViewport(Qe);else{let pt=u.getViewSubImage(d,Qe);nt=pt.viewport,Ye===0&&(e.setRenderTargetTextures(b,pt.colorTexture,pt.depthStencilTexture),e.setRenderTarget(b))}let Xe=O[Ye];Xe===void 0&&(Xe=new Et,Xe.layers.enable(Ye),Xe.viewport=new at,O[Ye]=Xe),Xe.matrix.fromArray(Qe.transform.matrix),Xe.matrix.decompose(Xe.position,Xe.quaternion,Xe.scale),Xe.projectionMatrix.fromArray(Qe.projectionMatrix),Xe.projectionMatrixInverse.copy(Xe.projectionMatrix).invert(),Xe.viewport.set(nt.x,nt.y,nt.width,nt.height),Ye===0&&(L.matrix.copy(Xe.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),be===!0&&L.cameras.push(Xe)}let he=s.enabledFeatures;if(he&&he.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let Ye=u.getDepthInformation(ie[0]);Ye&&Ye.isValid&&Ye.texture&&m.init(Ye,s.renderState)}if(he&&he.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let Ye=0;Ye<ie.length;Ye++){let Qe=ie[Ye].camera;if(Qe){let nt=f[Qe];nt||(nt=new Dr,f[Qe]=nt);let Xe=u.getCameraImage(Qe);nt.sourceTexture=Xe}}}}for(let ie=0;ie<T.length;ie++){let be=w[ie],he=T[ie];be!==null&&he!==void 0&&he.update(be,X,l||o)}Oe&&Oe(U,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),g=null}let Ne=new bf;Ne.setAnimationLoop(pe),this.setAnimationLoop=function(U){Oe=U},this.dispose=function(){}}},Hy=new We,Af=new Ve;Af.set(-1,0,0,0,1,0,0,0,1);function Vy(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Zc(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,A,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,b)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,M,A):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===tn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===tn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=e.get(f),A=M.envMap,b=M.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(Hy.makeRotationFromEuler(b)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Af),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,M,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=A*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===tn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Gy(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(b,T){let w=T.program;n.uniformBlockBinding(b,w)}function l(b,T){let w=s[b.id];w===void 0&&(m(b),w=h(b),s[b.id]=w,b.addEventListener("dispose",M));let y=T.program;n.updateUBOMapping(b,y);let _=e.render.frame;r[b.id]!==_&&(d(b),r[b.id]=_)}function h(b){let T=u();b.__bindingPointIndex=T;let w=i.createBuffer(),y=b.__size,_=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,y,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,w),w}function u(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){let T=s[b.id],w=b.uniforms,y=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,E=w.length;_<E;_++){let R=w[_];if(Array.isArray(R))for(let P=0,O=R.length;P<O;P++)p(R[P],_,P,y);else p(R,_,0,y)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(b,T,w,y){if(x(b,T,w,y)===!0){let _=b.__offset,E=b.value;if(Array.isArray(E)){let R=0;for(let P=0;P<E.length;P++){let O=E[P],L=f(O);g(O,b.__data,R),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(R+=L.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,b.__data)}}function g(b,T,w){typeof b=="number"||typeof b=="boolean"?T[0]=b:b.isMatrix3?(T[0]=b.elements[0],T[1]=b.elements[1],T[2]=b.elements[2],T[3]=0,T[4]=b.elements[3],T[5]=b.elements[4],T[6]=b.elements[5],T[7]=0,T[8]=b.elements[6],T[9]=b.elements[7],T[10]=b.elements[8],T[11]=0):ArrayBuffer.isView(b)?T.set(new b.constructor(b.buffer,b.byteOffset,T.length)):b.toArray(T,w)}function x(b,T,w,y){let _=b.value,E=T+"_"+w;if(y[E]===void 0)return typeof _=="number"||typeof _=="boolean"?y[E]=_:ArrayBuffer.isView(_)?y[E]=_.slice():y[E]=_.clone(),!0;{let R=y[E];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return y[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function m(b){let T=b.uniforms,w=0,y=16;for(let E=0,R=T.length;E<R;E++){let P=Array.isArray(T[E])?T[E]:[T[E]];for(let O=0,L=P.length;O<L;O++){let C=P[O],N=Array.isArray(C.value)?C.value:[C.value];for(let F=0,k=N.length;F<k;F++){let Q=N[F],K=f(Q),J=w%y,te=J%K.boundary,ce=J+te;w+=te,ce!==0&&y-ce<K.storage&&(w+=y-ce),C.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=w,w+=K.storage}}}let _=w%y;return _>0&&(w+=y-_),b.__size=w,b.__cache={},this}function f(b){let T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(T.boundary=16,T.storage=b.byteLength):Ie("WebGLRenderer: Unsupported uniform value type.",b),T}function M(b){let T=b.target;T.removeEventListener("dispose",M);let w=o.indexOf(T.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function A(){for(let b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:c,update:l,dispose:A}}var Wy=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Kn=null;function Xy(){return Kn===null&&(Kn=new Hs(Wy,16,16,Oi,Nn),Kn.name="DFG_LUT",Kn.minFilter=It,Kn.magFilter=It,Kn.wrapS=yn,Kn.wrapT=yn,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}var ls=class{constructor(e={}){let{canvas:t=Xd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:p=ln}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let x=p,m=new Set([Fa,Ua,Na]),f=new Set([ln,Dn,js,Js,Pa,La]),M=new Uint32Array(4),A=new Int32Array(4),b=new W,T=null,w=null,y=[],_=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,O=null,L=null,C=null,N=null;this._outputColorSpace=Nt;let F=0,k=0,Q=null,K=-1,J=null,te=new at,ce=new at,le=null,Oe=new De(0),pe=0,Ne=t.width,U=t.height,X=1,ie=null,be=null,he=new at(0,0,Ne,U),ze=new at(0,0,Ne,U),xt=!1,Ye=new Vs,Qe=!1,nt=!1,Xe=new We,pt=new W,Tt=new at,Wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function Mt(){return Q===null?X:1}let G=n;function At(S,B){return t.getContext(S,B)}let tt,I,v,$,D,H,se,oe,Z,ee,ae,Ee,me,ue,Pe,Fe,Ge,V,de,ne,fe,ve,re;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",mt,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",Mn,!1),G===null){let B="webgl2";if(G=At(B,S),G===null)throw At(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Le()}catch(S){throw t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),He("WebGLRenderer: "+S.message),S}function Le(){tt=new J_(G),tt.init(),fe=new By(G,tt),I=new V_(G,tt,e,fe),v=new Fy(G,tt),I.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),L=G.createFramebuffer(),C=G.createFramebuffer(),N=G.createFramebuffer(),$=new tx(G),D=new My,H=new Oy(G,tt,v,D,I,fe,$),se=new j_(R),oe=new ig(G),ve=new z_(G,oe),Z=new Q_(G,oe,$,ve),ee=new ix(G,Z,oe,ve,$),V=new nx(G,I,H),Pe=new G_(D),ae=new by(R,se,tt,I,ve,Pe),Ee=new Vy(R,D),me=new Ey,ue=new Iy(tt),Ge=new k_(R,se,v,ee,g,c),Fe=new Uy(R,ee,I),re=new Gy(G,$,I,v),de=new H_(G,tt,$),ne=new ex(G,tt,$),$.programs=ae.programs,R.capabilities=I,R.extensions=tt,R.properties=D,R.renderLists=me,R.shadowMap=Fe,R.state=v,R.info=$}x!==ln&&(E=new rx(x,t.width,t.height,a,s,r));let Ce=new yh(R,G);this.xr=Ce,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let S=tt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=tt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(S){S!==void 0&&(X=S,this.setSize(Ne,U,!1))},this.getSize=function(S){return S.set(Ne,U)},this.setSize=function(S,B,j=!0){if(Ce.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}Ne=S,U=B,t.width=Math.floor(S*X),t.height=Math.floor(B*X),j===!0&&(t.style.width=S+"px",t.style.height=B+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(Ne*X,U*X).floor()},this.setDrawingBufferSize=function(S,B,j){Ne=S,U=B,X=j,t.width=Math.floor(S*j),t.height=Math.floor(B*j),this.setViewport(0,0,S,B)},this.setEffects=function(S){if(x===ln){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let B=0;B<S.length;B++)if(S[B].isOutputPass===!0){Ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(te)},this.getViewport=function(S){return S.copy(he)},this.setViewport=function(S,B,j,q){S.isVector4?he.set(S.x,S.y,S.z,S.w):he.set(S,B,j,q),v.viewport(te.copy(he).multiplyScalar(X).round())},this.getScissor=function(S){return S.copy(ze)},this.setScissor=function(S,B,j,q){S.isVector4?ze.set(S.x,S.y,S.z,S.w):ze.set(S,B,j,q),v.scissor(ce.copy(ze).multiplyScalar(X).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(S){v.setScissorTest(xt=S)},this.setOpaqueSort=function(S){ie=S},this.setTransparentSort=function(S){be=S},this.getClearColor=function(S){return S.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,j=!0){let q=0;if(S){let Y=!1;if(Q!==null){let xe=Q.texture.format;Y=m.has(xe)}if(Y){let xe=Q.texture.type,Se=f.has(xe),_e=Ge.getClearColor(),Te=Ge.getClearAlpha(),Re=_e.r,$e=_e.g,Je=_e.b;Se?(M[0]=Re,M[1]=$e,M[2]=Je,M[3]=Te,G.clearBufferuiv(G.COLOR,0,M)):(A[0]=Re,A[1]=$e,A[2]=Je,A[3]=Te,G.clearBufferiv(G.COLOR,0,A))}else q|=G.COLOR_BUFFER_BIT}B&&(q|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(q|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&G.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),O=S},this.dispose=function(){t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),Ge.dispose(),me.dispose(),ue.dispose(),D.dispose(),se.dispose(),ee.dispose(),ve.dispose(),re.dispose(),ae.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",gu),Ce.removeEventListener("sessionend",_u),zi.stop()};function mt(S){S.preventDefault(),Sr("WebGLRenderer: Context Lost."),P=!0}function it(){Sr("WebGLRenderer: Context Restored."),P=!1;let S=$.autoReset,B=Fe.enabled,j=Fe.autoUpdate,q=Fe.needsUpdate,Y=Fe.type;Le(),$.autoReset=S,Fe.enabled=B,Fe.autoUpdate=j,Fe.needsUpdate=q,Fe.type=Y}function Mn(S){He("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Bn(S){let B=S.target;B.removeEventListener("dispose",Bn),Xp(B)}function Xp(S){$p(S),D.remove(S)}function $p(S){let B=D.get(S).programs;B!==void 0&&(B.forEach(function(j){ae.releaseProgram(j)}),S.isShaderMaterial&&ae.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,j,q,Y,xe){B===null&&(B=Wt);let Se=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,_e=Kp(S,B,j,q,Y);v.setMaterial(q,Se);let Te=j.index,Re=1;if(q.wireframe===!0){if(Te=Z.getWireframeAttribute(j),Te===void 0)return;Re=2}let $e=j.drawRange,Je=j.attributes.position,Ae=$e.start*Re,st=($e.start+$e.count)*Re;xe!==null&&(Ae=Math.max(Ae,xe.start*Re),st=Math.min(st,(xe.start+xe.count)*Re)),Te!==null?(Ae=Math.max(Ae,0),st=Math.min(st,Te.count)):Je!=null&&(Ae=Math.max(Ae,0),st=Math.min(st,Je.count));let Lt=st-Ae;if(Lt<0||Lt===1/0)return;ve.setup(Y,q,_e,j,Te);let vt,dt=de;if(Te!==null&&(vt=oe.get(Te),dt=ne,dt.setIndex(vt)),Y.isMesh)q.wireframe===!0?(v.setLineWidth(q.wireframeLinewidth*Mt()),dt.setMode(G.LINES)):dt.setMode(G.TRIANGLES);else if(Y.isLine){let Xt=q.linewidth;Xt===void 0&&(Xt=1),v.setLineWidth(Xt*Mt()),Y.isLineSegments?dt.setMode(G.LINES):Y.isLineLoop?dt.setMode(G.LINE_LOOP):dt.setMode(G.LINE_STRIP)}else Y.isPoints?dt.setMode(G.POINTS):Y.isSprite&&dt.setMode(G.TRIANGLES);if(Y.isBatchedMesh)if(tt.get("WEBGL_multi_draw"))dt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let Xt=Y._multiDrawStarts,Me=Y._multiDrawCounts,Zt=Y._multiDrawCount,et=Te?oe.get(Te).bytesPerElement:1,_n=D.get(q).currentProgram.getUniforms();for(let kn=0;kn<Zt;kn++)_n.setValue(G,"_gl_DrawID",kn),dt.render(Xt[kn]/et,Me[kn])}else if(Y.isInstancedMesh)dt.renderInstances(Ae,Lt,Y.count);else if(j.isInstancedBufferGeometry){let Xt=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,Me=Math.min(j.instanceCount,Xt);dt.renderInstances(Ae,Lt,Me)}else dt.render(Ae,Lt)};function mu(S,B,j,q){O!==null&&S.isNodeMaterial&&O.setObject(q,S),Qe===!0&&Pe.setState(S,j,!1),S.transparent===!0&&S.side===an&&S.forceSinglePass===!1?(S.side=tn,S.needsUpdate=!0,Eo(S,B,q),S.side=qn,S.needsUpdate=!0,Eo(S,B,q),S.side=an):Eo(S,B,q)}this.compile=function(S,B,j=null){j===null&&(j=S),O!==null&&O.renderStart(S,B,j),w=ue.get(j),w.init(B),_.push(w),j.traverseVisible(function(Y){Y.isLight&&Y.layers.test(B.layers)&&(w.pushLight(Y),Y.castShadow&&w.pushShadow(Y))}),S!==j&&S.traverseVisible(function(Y){Y.isLight&&Y.layers.test(B.layers)&&(w.pushLight(Y),Y.castShadow&&w.pushShadow(Y))}),w.setupLights(),O!==null&&O.updateLights(w.state.lightsArray),nt=this.localClippingEnabled,Qe=Pe.init(this.clippingPlanes,nt),Qe===!0&&Pe.setGlobalState(this.clippingPlanes,B),O!==null&&Fe.render(w.state.shadowsArray,j,B);let q=new Set;return S.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let xe=Y.material;if(xe)if(Array.isArray(xe))for(let Se=0;Se<xe.length;Se++){let _e=xe[Se];mu(_e,j,B,Y),q.add(_e)}else mu(xe,j,B,Y),q.add(xe)}),w=_.pop(),O!==null&&O.renderEnd(),q},this.compileAsync=function(S,B,j=null){let q=this.compile(S,B,j);return new Promise(Y=>{function xe(){if(q.forEach(function(Se){let Te=D.get(Se).currentProgram;(Te===void 0||Te.isReady())&&q.delete(Se)}),q.size===0){Y(S);return}setTimeout(xe,10)}tt.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Xl=null;function qp(S){Xl&&Xl(S)}function gu(){zi.stop()}function _u(){zi.start()}let zi=new bf;zi.setAnimationLoop(qp),typeof self<"u"&&zi.setContext(self),this.setAnimationLoop=function(S){Xl=S,Ce.setAnimationLoop(S),S===null?zi.stop():zi.start()},Ce.addEventListener("sessionstart",gu),Ce.addEventListener("sessionend",_u),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;O!==null&&O.renderStart(S,B);let j=Ce.enabled===!0&&Ce.isPresenting===!0,q=E!==null&&(Q===null||j)&&E.begin(R,Q);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(B),B=Ce.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,B,Q),w=ue.get(S,_.length),w.init(B),w.state.textureUnits=H.getTextureUnits(),_.push(w),Xe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ye.setFromProjectionMatrix(Xe,An,B.reversedDepth),nt=this.localClippingEnabled,Qe=Pe.init(this.clippingPlanes,nt),T=me.get(S,y.length),T.init(),y.push(T),Ce.enabled===!0&&Ce.isPresenting===!0){let Se=R.xr.getDepthSensingMesh();Se!==null&&$l(Se,B,-1/0,R.sortObjects)}$l(S,B,0,R.sortObjects),T.finish(),O!==null&&O.updateLights(w.state.lightsArray),R.sortObjects===!0&&T.sort(ie,be),yt=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,yt&&Ge.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Qe===!0&&Pe.beginShadows();let Y=w.state.shadowsArray;if(Fe.render(Y,S,B),Qe===!0&&Pe.endShadows(),(q&&E.hasRenderPass())===!1){let Se=T.opaque,_e=T.transmissive;if(w.setupLights(),B.isArrayCamera){let Te=B.cameras;if(_e.length>0)for(let Re=0,$e=Te.length;Re<$e;Re++){let Je=Te[Re];yu(Se,_e,S,Je)}yt&&Ge.render(S);for(let Re=0,$e=Te.length;Re<$e;Re++){let Je=Te[Re];xu(T,S,Je,Je.viewport)}}else _e.length>0&&yu(Se,_e,S,B),yt&&Ge.render(S),xu(T,S,B)}Q!==null&&k===0&&(H.updateMultisampleRenderTarget(Q),H.updateRenderTargetMipmap(Q)),q&&E.end(R),S.isScene===!0&&S.onAfterRender(R,S,B),ve.resetDefaultState(),K=-1,J=null,_.pop(),_.length>0?(w=_[_.length-1],H.setTextureUnits(w.state.textureUnits),Qe===!0&&Pe.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,y.pop(),y.length>0?T=y[y.length-1]:T=null,O!==null&&O.renderEnd()};function $l(S,B,j,q){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)j=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(Ye)){q&&Tt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Xe);let Se=ee.update(S),_e=S.material;_e.visible&&T.push(S,Se,_e,j,Tt.z,null,B)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(Ye))){let Se=ee.update(S),_e=S.material;if(q&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Tt.copy(S.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Tt.copy(Se.boundingSphere.center)),Tt.applyMatrix4(S.matrixWorld).applyMatrix4(Xe)),Array.isArray(_e)){let Te=Se.groups;for(let Re=0,$e=Te.length;Re<$e;Re++){let Je=Te[Re],Ae=_e[Je.materialIndex];Ae&&Ae.visible&&T.push(S,Se,Ae,j,Tt.z,Je,B)}}else _e.visible&&T.push(S,Se,_e,j,Tt.z,null,B)}}let xe=S.children;for(let Se=0,_e=xe.length;Se<_e;Se++)$l(xe[Se],B,j,q)}function xu(S,B,j,q){let{opaque:Y,transmissive:xe,transparent:Se}=S;w.setupLightsView(j),Qe===!0&&Pe.setGlobalState(R.clippingPlanes,j),q&&v.viewport(te.copy(q)),Y.length>0&&So(Y,B,j),xe.length>0&&So(xe,B,j),Se.length>0&&So(Se,B,j),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function yu(S,B,j,q){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[q.id]===void 0){let Ae=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[q.id]=new sn(1,1,{generateMipmaps:!0,type:Ae?Nn:ln,minFilter:Ln,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}let xe=w.state.transmissionRenderTarget[q.id],Se=q.viewport||te;xe.setSize(Se.z*R.transmissionResolutionScale,Se.w*R.transmissionResolutionScale);let _e=R.getRenderTarget(),Te=R.getActiveCubeFace(),Re=R.getActiveMipmapLevel();R.setRenderTarget(xe),R.getClearColor(Oe),pe=R.getClearAlpha(),pe<1&&R.setClearColor(16777215,.5),R.clear(),yt&&Ge.render(j);let $e=R.toneMapping;R.toneMapping=Pn;let Je=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),w.setupLightsView(q),Qe===!0&&Pe.setGlobalState(R.clippingPlanes,q),So(S,j,q),H.updateMultisampleRenderTarget(xe),H.updateRenderTargetMipmap(xe),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let st=0,Lt=B.length;st<Lt;st++){let vt=B[st],{object:dt,geometry:Xt,material:Me,group:Zt}=vt;if(Me.side===an&&dt.layers.test(q.layers)){let et=Me.side;Me.side=tn,Me.needsUpdate=!0,vu(dt,j,q,Xt,Me,Zt),Me.side=et,Me.needsUpdate=!0,Ae=!0}}Ae===!0&&(H.updateMultisampleRenderTarget(xe),H.updateRenderTargetMipmap(xe))}R.setRenderTarget(_e,Te,Re),R.setClearColor(Oe,pe),Je!==void 0&&(q.viewport=Je),R.toneMapping=$e}function So(S,B,j){let q=B.isScene===!0?B.overrideMaterial:null;for(let Y=0,xe=S.length;Y<xe;Y++){let Se=S[Y],{object:_e,geometry:Te,group:Re}=Se,$e=Se.material;$e.allowOverride===!0&&q!==null&&($e=q),_e.layers.test(j.layers)&&vu(_e,B,j,Te,$e,Re)}}function vu(S,B,j,q,Y,xe){O!==null&&Y.isNodeMaterial&&O.setObject(S,Y),S.onBeforeRender(R,B,j,q,Y,xe),S.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),Y.onBeforeRender(R,B,j,q,S,xe),Y.transparent===!0&&Y.side===an&&Y.forceSinglePass===!1?(Y.side=tn,Y.needsUpdate=!0,R.renderBufferDirect(j,B,q,Y,S,xe),Y.side=qn,Y.needsUpdate=!0,R.renderBufferDirect(j,B,q,Y,S,xe),Y.side=an):R.renderBufferDirect(j,B,q,Y,S,xe),S.onAfterRender(R,B,j,q,Y,xe)}function Eo(S,B,j){B.isScene!==!0&&(B=Wt);let q=D.get(S),Y=w.state.lights,xe=w.state.shadowsArray,Se=Y.state.version,_e=ae.getParameters(S,Y.state,xe,B,j,w.state.lightProbeGridArray),Te=ae.getProgramCacheKey(_e),Re=q.programs;q.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?B.environment:null,q.fog=B.fog;let $e=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;q.envMap=se.get(S.envMap||q.environment,$e),q.envMapRotation=q.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,Re===void 0&&(S.addEventListener("dispose",Bn),Re=new Map,q.programs=Re);let Je=Re.get(Te);if(Je!==void 0){if(q.currentProgram===Je&&q.lightsStateVersion===Se)return Mu(S,_e),Je}else _e.uniforms=ae.getUniforms(S),O!==null&&S.isNodeMaterial&&O.build(S,j,_e),S.onBeforeCompile(_e,R),Je=ae.acquireProgram(_e,Te),Re.set(Te,Je),q.uniforms=_e.uniforms;let Ae=q.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ae.clippingPlanes=Pe.uniform),Mu(S,_e),q.needsLights=jp(S),q.lightsStateVersion=Se,q.needsLights&&(Ae.ambientLightColor.value=Y.state.ambient,Ae.lightProbe.value=Y.state.probe,Ae.sunLights.value=Y.state.sun,Ae.sunLightShadows.value=Y.state.sunShadow,Ae.directionalLights.value=Y.state.directional,Ae.directionalLightShadows.value=Y.state.directionalShadow,Ae.spotLights.value=Y.state.spot,Ae.spotLightShadows.value=Y.state.spotShadow,Ae.rectAreaLights.value=Y.state.rectArea,Ae.ltc_1.value=Y.state.rectAreaLTC1,Ae.ltc_2.value=Y.state.rectAreaLTC2,Ae.pointLights.value=Y.state.point,Ae.pointLightShadows.value=Y.state.pointShadow,Ae.hemisphereLights.value=Y.state.hemi,Ae.sunShadowMatrix.value=Y.state.sunShadowMatrix,Ae.sunShadowCascade.value=Y.state.sunShadowCascade,Ae.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ae.spotLightMatrix.value=Y.state.spotLightMatrix,Ae.spotLightMap.value=Y.state.spotLightMap,Ae.pointShadowMatrix.value=Y.state.pointShadowMatrix),q.lightProbeGrid=w.state.lightProbeGridArray.length>0,q.currentProgram=Je,q.uniformsList=null,Je}function bu(S){if(S.uniformsList===null){let B=S.currentProgram.getUniforms();S.uniformsList=nr.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function Mu(S,B){let j=D.get(S);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function Yp(S,B){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;b.setFromMatrixPosition(B.matrixWorld);for(let j=0,q=S.length;j<q;j++){let Y=S[j];if(Y.texture!==null&&Y.boundingBox.containsPoint(b))return Y}return null}function Kp(S,B,j,q,Y){B.isScene!==!0&&(B=Wt),H.resetTextureUnits();let xe=B.fog,Se=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?B.environment:null,_e=Q===null?R.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Ke.workingColorSpace,Te=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Re=se.get(q.envMap||Se,Te),$e=q.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Je=!!j.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ae=!!j.morphAttributes.position,st=!!j.morphAttributes.normal,Lt=!!j.morphAttributes.color,vt=Pn;q.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(vt=R.toneMapping);let dt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Xt=dt!==void 0?dt.length:0,Me=D.get(q),Zt=w.state.lights;if(Qe===!0&&(nt===!0||S!==J)){let gt=S===J&&q.id===K;Pe.setState(q,S,gt)}let et=!1;q.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==Zt.state.version||Me.outputColorSpace!==_e||Y.isBatchedMesh&&Me.batching===!1||!Y.isBatchedMesh&&Me.batching===!0||Y.isBatchedMesh&&Me.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Me.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Me.instancing===!1||!Y.isInstancedMesh&&Me.instancing===!0||Y.isSkinnedMesh&&Me.skinning===!1||!Y.isSkinnedMesh&&Me.skinning===!0||Y.isInstancedMesh&&Me.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Me.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Me.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Me.instancingMorph===!1&&Y.morphTexture!==null||Me.envMap!==Re||q.fog===!0&&Me.fog!==xe||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==Pe.numPlanes||Me.numIntersection!==Pe.numIntersection)||Me.vertexAlphas!==$e||Me.vertexTangents!==Je||Me.morphTargets!==Ae||Me.morphNormals!==st||Me.morphColors!==Lt||Me.toneMapping!==vt||Me.morphTargetsCount!==Xt||!!Me.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(et=!0):(et=!0,Me.__version=q.version);let _n=Me.currentProgram;et===!0&&(_n=Eo(q,B,Y),O&&q.isNodeMaterial&&O.onUpdateProgram(q,_n,Me));let kn=!1,gi=!1,ps=!1,ct=_n.getUniforms(),Ct=Me.uniforms;if(v.useProgram(_n.program)&&(kn=!0,gi=!0,ps=!0),q.id!==K&&(K=q.id,gi=!0),Me.needsLights){let gt=Yp(w.state.lightProbeGridArray,Y);Me.lightProbeGrid!==gt&&(Me.lightProbeGrid=gt,gi=!0)}if(kn||J!==S){v.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ct.setValue(G,"projectionMatrix",S.projectionMatrix),ct.setValue(G,"viewMatrix",S.matrixWorldInverse);let xi=ct.map.cameraPosition;xi!==void 0&&xi.setValue(G,pt.setFromMatrixPosition(S.matrixWorld)),I.logarithmicDepthBuffer&&ct.setValue(G,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ct.setValue(G,"isOrthographic",S.isOrthographicCamera===!0),J!==S&&(J=S,gi=!0,ps=!0)}if(Me.needsLights&&(Zt.state.sunShadowMap.length>0&&ct.setValue(G,"sunShadowMap",Zt.state.sunShadowMap,H),Zt.state.directionalShadowMap.length>0&&ct.setValue(G,"directionalShadowMap",Zt.state.directionalShadowMap,H),Zt.state.spotShadowMap.length>0&&ct.setValue(G,"spotShadowMap",Zt.state.spotShadowMap,H),Zt.state.pointShadowMap.length>0&&ct.setValue(G,"pointShadowMap",Zt.state.pointShadowMap,H)),Y.isSkinnedMesh){ct.setOptional(G,Y,"bindMatrix"),ct.setOptional(G,Y,"bindMatrixInverse");let gt=Y.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),ct.setValue(G,"boneTexture",gt.boneTexture,H))}Y.isBatchedMesh&&(ct.setOptional(G,Y,"batchingTexture"),ct.setValue(G,"batchingTexture",Y._matricesTexture,H),ct.setOptional(G,Y,"batchingIdTexture"),ct.setValue(G,"batchingIdTexture",Y._indirectTexture,H),ct.setOptional(G,Y,"batchingColorTexture"),Y._colorsTexture!==null&&ct.setValue(G,"batchingColorTexture",Y._colorsTexture,H));let _i=j.morphAttributes;if((_i.position!==void 0||_i.normal!==void 0||_i.color!==void 0)&&V.update(Y,j,_n),(gi||Me.receiveShadow!==Y.receiveShadow)&&(Me.receiveShadow=Y.receiveShadow,ct.setValue(G,"receiveShadow",Y.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&B.environment!==null&&(Ct.envMapIntensity.value=B.environmentIntensity),Ct.dfgLUT!==void 0&&(Ct.dfgLUT.value=Xy()),gi){if(ct.setValue(G,"toneMappingExposure",R.toneMappingExposure),Me.needsLights&&Zp(Ct,ps),xe&&q.fog===!0&&Ee.refreshFogUniforms(Ct,xe),Ee.refreshMaterialUniforms(Ct,q,X,U,w.state.transmissionRenderTarget[S.id]),Me.needsLights&&Me.lightProbeGrid){let gt=Me.lightProbeGrid;Ct.probesSH.value=gt.texture,Ct.probesMin.value.copy(gt.boundingBox.min),Ct.probesMax.value.copy(gt.boundingBox.max),Ct.probesResolution.value.copy(gt.resolution)}nr.upload(G,bu(Me),Ct,H)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(nr.upload(G,bu(Me),Ct,H),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ct.setValue(G,"center",Y.center),ct.setValue(G,"modelViewMatrix",Y.modelViewMatrix),ct.setValue(G,"normalMatrix",Y.normalMatrix),ct.setValue(G,"modelMatrix",Y.matrixWorld),q.uniformsGroups!==void 0){let gt=q.uniformsGroups;for(let xi=0,ms=gt.length;xi<ms;xi++){let Eu=gt[xi];re.update(Eu,_n),re.bind(Eu,_n)}}return _n}function Zp(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.sunLights.needsUpdate=B,S.sunLightShadows.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function jp(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(S,B,j){let q=D.get(S);q.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),D.get(S.texture).__webglTexture=B,D.get(S.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:j,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,B){let j=D.get(S);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,j=0){Q=S,F=B,k=j;let q=null,Y=!1,xe=!1;if(S){let _e=D.get(S);if(_e.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(G.FRAMEBUFFER,_e.__webglFramebuffer),te.copy(S.viewport),ce.copy(S.scissor),le=S.scissorTest,v.viewport(te),v.scissor(ce),v.setScissorTest(le),K=-1;return}else if(_e.__webglFramebuffer===void 0)H.setupRenderTarget(S);else if(_e.__hasExternalTextures)H.rebindTextures(S,D.get(S.texture).__webglTexture,D.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let $e=S.depthTexture;if(_e.__boundDepthTexture!==$e){if($e!==null&&D.has($e)&&(S.width!==$e.image.width||S.height!==$e.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");H.setupDepthRenderbuffer(S)}}let Te=S.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(xe=!0);let Re=D.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Re[B])?q=Re[B][j]:q=Re[B],Y=!0):S.samples>0&&H.useMultisampledRTT(S)===!1?q=D.get(S).__webglMultisampledFramebuffer:Array.isArray(Re)?q=Re[j]:q=Re,te.copy(S.viewport),ce.copy(S.scissor),le=S.scissorTest}else te.copy(he).multiplyScalar(X).floor(),ce.copy(ze).multiplyScalar(X).floor(),le=xt;if(j!==0&&(q=L),v.bindFramebuffer(G.FRAMEBUFFER,q)&&v.drawBuffers(S,q),v.viewport(te),v.scissor(ce),v.setScissorTest(le),Y){let _e=D.get(S.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+B,_e.__webglTexture,j)}else if(xe){let _e=B;for(let Te=0;Te<S.textures.length;Te++){let Re=D.get(S.textures[Te]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Te,Re.__webglTexture,j,_e)}}else if(S!==null&&j!==0){let _e=D.get(S.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,_e.__webglTexture,j)}K=-1};function Su(S){let B=D.get(S);return(B.__readFormat!==S.format||B.__readType!==S.type)&&(B.__readFormat=S.format,B.__readType=S.type,B.__formatReadable=I.textureFormatReadable(S.format),B.__typeReadable=I.textureTypeReadable(S.type)),B}this.readRenderTargetPixels=function(S,B,j,q,Y,xe,Se,_e=0){if(!(S&&S.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=D.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te){v.bindFramebuffer(G.FRAMEBUFFER,Te);try{let Re=S.textures[_e],$e=Re.format,Je=Re.type;S.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+_e);let Ae=Su(Re);if(Ae.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ae.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-q&&j>=0&&j<=S.height-Y&&G.readPixels(B,j,q,Y,fe.convert($e),fe.convert(Je),xe)}finally{let Re=Q!==null?D.get(Q).__webglFramebuffer:null;v.bindFramebuffer(G.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(S,B,j,q,Y,xe,Se,_e=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=D.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te)if(B>=0&&B<=S.width-q&&j>=0&&j<=S.height-Y){v.bindFramebuffer(G.FRAMEBUFFER,Te);let Re=S.textures[_e],$e=Re.format,Je=Re.type;S.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+_e);let Ae=Su(Re);if(Ae.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ae.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,st),G.bufferData(G.PIXEL_PACK_BUFFER,xe.byteLength,G.STREAM_READ),G.readPixels(B,j,q,Y,fe.convert($e),fe.convert(Je),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let Lt=Q!==null?D.get(Q).__webglFramebuffer:null;v.bindFramebuffer(G.FRAMEBUFFER,Lt);let vt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await qd(G,vt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,st),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,xe),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(st),G.deleteSync(vt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,B=null,j=0){let q=Math.pow(2,-j),Y=Math.floor(S.image.width*q),xe=Math.floor(S.image.height*q),Se=B!==null?B.x:0,_e=B!==null?B.y:0;H.setTexture2D(S,0),G.copyTexSubImage2D(G.TEXTURE_2D,j,0,0,Se,_e,Y,xe),v.unbindTexture()},this.copyTextureToTexture=function(S,B,j=null,q=null,Y=0,xe=0){let Se,_e,Te,Re,$e,Je,Ae,st,Lt,vt=S.isCompressedTexture?S.mipmaps[xe]:S.image;if(j!==null)Se=j.max.x-j.min.x,_e=j.max.y-j.min.y,Te=j.isBox3?j.max.z-j.min.z:1,Re=j.min.x,$e=j.min.y,Je=j.isBox3?j.min.z:0;else{let Ct=Math.pow(2,-Y);Se=Math.floor(vt.width*Ct),_e=Math.floor(vt.height*Ct),S.isDataArrayTexture?Te=vt.depth:S.isData3DTexture?Te=Math.floor(vt.depth*Ct):Te=1,Re=0,$e=0,Je=0}q!==null?(Ae=q.x,st=q.y,Lt=q.z):(Ae=0,st=0,Lt=0);let dt=fe.convert(B.format),Xt=fe.convert(B.type),Me;B.isData3DTexture?(H.setTexture3D(B,0),Me=G.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(H.setTexture2DArray(B,0),Me=G.TEXTURE_2D_ARRAY):(H.setTexture2D(B,0),Me=G.TEXTURE_2D),v.activeTexture(G.TEXTURE0),v.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,B.flipY),v.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),v.pixelStorei(G.UNPACK_ALIGNMENT,B.unpackAlignment);let Zt=v.getParameter(G.UNPACK_ROW_LENGTH),et=v.getParameter(G.UNPACK_IMAGE_HEIGHT),_n=v.getParameter(G.UNPACK_SKIP_PIXELS),kn=v.getParameter(G.UNPACK_SKIP_ROWS),gi=v.getParameter(G.UNPACK_SKIP_IMAGES);v.pixelStorei(G.UNPACK_ROW_LENGTH,vt.width),v.pixelStorei(G.UNPACK_IMAGE_HEIGHT,vt.height),v.pixelStorei(G.UNPACK_SKIP_PIXELS,Re),v.pixelStorei(G.UNPACK_SKIP_ROWS,$e),v.pixelStorei(G.UNPACK_SKIP_IMAGES,Je);let ps=S.isDataArrayTexture||S.isData3DTexture,ct=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){let Ct=D.get(S),_i=D.get(B),gt=D.get(Ct.__renderTarget),xi=D.get(_i.__renderTarget);v.bindFramebuffer(G.READ_FRAMEBUFFER,gt.__webglFramebuffer),v.bindFramebuffer(G.DRAW_FRAMEBUFFER,xi.__webglFramebuffer);for(let ms=0;ms<Te;ms++)ps&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,D.get(S).__webglTexture,Y,Je+ms),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,D.get(B).__webglTexture,xe,Lt+ms)),G.blitFramebuffer(Re,$e,Se,_e,Ae,st,Se,_e,G.DEPTH_BUFFER_BIT,G.NEAREST);v.bindFramebuffer(G.READ_FRAMEBUFFER,null),v.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(Y!==0||S.isRenderTargetTexture||D.has(S)){let Ct=D.get(S),_i=D.get(B);v.bindFramebuffer(G.READ_FRAMEBUFFER,C),v.bindFramebuffer(G.DRAW_FRAMEBUFFER,N);for(let gt=0;gt<Te;gt++)ps?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ct.__webglTexture,Y,Je+gt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ct.__webglTexture,Y),ct?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,_i.__webglTexture,xe,Lt+gt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,_i.__webglTexture,xe),Y!==0?G.blitFramebuffer(Re,$e,Se,_e,Ae,st,Se,_e,G.COLOR_BUFFER_BIT,G.NEAREST):ct?G.copyTexSubImage3D(Me,xe,Ae,st,Lt+gt,Re,$e,Se,_e):G.copyTexSubImage2D(Me,xe,Ae,st,Re,$e,Se,_e);v.bindFramebuffer(G.READ_FRAMEBUFFER,null),v.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else ct?S.isDataTexture||S.isData3DTexture?G.texSubImage3D(Me,xe,Ae,st,Lt,Se,_e,Te,dt,Xt,vt.data):B.isCompressedArrayTexture?G.compressedTexSubImage3D(Me,xe,Ae,st,Lt,Se,_e,Te,dt,vt.data):G.texSubImage3D(Me,xe,Ae,st,Lt,Se,_e,Te,dt,Xt,vt):S.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,xe,Ae,st,Se,_e,dt,Xt,vt.data):S.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,xe,Ae,st,vt.width,vt.height,dt,vt.data):G.texSubImage2D(G.TEXTURE_2D,xe,Ae,st,Se,_e,dt,Xt,vt);v.pixelStorei(G.UNPACK_ROW_LENGTH,Zt),v.pixelStorei(G.UNPACK_IMAGE_HEIGHT,et),v.pixelStorei(G.UNPACK_SKIP_PIXELS,_n),v.pixelStorei(G.UNPACK_SKIP_ROWS,kn),v.pixelStorei(G.UNPACK_SKIP_IMAGES,gi),xe===0&&B.generateMipmaps&&G.generateMipmap(Me),v.unbindTexture()},this.initRenderTarget=function(S){D.get(S).__webglFramebuffer===void 0&&H.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?H.setTextureCube(S,0):S.isData3DTexture?H.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?H.setTexture2DArray(S,0):H.setTexture2D(S,0),v.unbindTexture()},this.resetState=function(){F=0,k=0,Q=null,v.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}};var Rf={type:"change"},bh={type:"start"},Pf={type:"end"},Ml=new oi,If=new fn,$y=Math.cos(70*rs.DEG2RAD),kt=new W,cn=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},vh=1e-6,Sl=class extends Xr{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new W,this.cursor=new W,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Di.ROTATE,MIDDLE:Di.DOLLY,RIGHT:Di.PAN},this.touches={ONE:Ni.ROTATE,TWO:Ni.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new W,this._lastQuaternion=new Ut,this._lastTargetPosition=new W,this._quat=new Ut().setFromUnitVectors(e.up,new W(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new qs,this._sphericalDelta=new qs,this._scale=1,this._panOffset=new W,this._rotateStart=new Ue,this._rotateEnd=new Ue,this._rotateDelta=new Ue,this._panStart=new Ue,this._panEnd=new Ue,this._panDelta=new Ue,this._dollyStart=new Ue,this._dollyEnd=new Ue,this._dollyDelta=new Ue,this._dollyDirection=new W,this._mouse=new Ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Yy.bind(this),this._onPointerDown=qy.bind(this),this._onPointerUp=Ky.bind(this),this._onContextMenu=nv.bind(this),this._onMouseWheel=Jy.bind(this),this._onKeyDown=Qy.bind(this),this._onTouchStart=ev.bind(this),this._onTouchMove=tv.bind(this),this._onMouseDown=Zy.bind(this),this._onMouseMove=jy.bind(this),this._interceptControlDown=iv.bind(this),this._interceptControlUp=sv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=lt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Rf),this.update(),this.state=lt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;kt.copy(t).sub(this.target),kt.applyQuaternion(this._quat),this._spherical.setFromVector3(kt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=cn:n>Math.PI&&(n-=cn),s<-Math.PI?s+=cn:s>Math.PI&&(s-=cn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(kt.setFromSpherical(this._spherical),kt.applyQuaternion(this._quatInverse),t.copy(this.target).add(kt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=kt.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new W(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new W(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=kt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ml.origin.copy(this.object.position),Ml.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ml.direction))<$y?this.object.lookAt(this.target):(If.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ml.intersectPlane(If,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>vh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>vh||this._lastTargetPosition.distanceToSquared(this.target)>vh?(this.dispatchEvent(Rf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?cn/60*this.autoRotateSpeed*e:cn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){kt.setFromMatrixColumn(t,0),kt.multiplyScalar(-e),this._panOffset.add(kt)}_panUp(e,t){this.screenSpacePanning===!0?kt.setFromMatrixColumn(t,1):(kt.setFromMatrixColumn(t,0),kt.crossVectors(this.object.up,kt)),kt.multiplyScalar(e),this._panOffset.add(kt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;kt.copy(s).sub(this.target);let r=kt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/t.clientHeight),this._rotateUp(cn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-cn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(cn*this._rotateDelta.x/t.clientHeight),this._rotateUp(cn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function qy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Yy(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Ky(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Pf),this.state=lt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Zy(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Di.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=lt.DOLLY;break;case Di.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}break;case Di.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(bh)}function jy(i){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Jy(i){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(i.preventDefault(),this.dispatchEvent(bh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Pf))}function Qy(i){this.enabled!==!1&&this._handleKeyDown(i)}function ev(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ni.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=lt.TOUCH_ROTATE;break;case Ni.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case Ni.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=lt.TOUCH_DOLLY_PAN;break;case Ni.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(bh)}function tv(i){switch(this._trackPointer(i),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=lt.NONE}}function nv(i){this.enabled!==!1&&i.preventDefault()}function iv(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function sv(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Mh(i,e){if(e===$c)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Qs||e===eo){let t=i.getIndex();if(t===null){let r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Qs)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Lf(i){let e=new Map,t=new Map,n=i.clone();return Df(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Df(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Df(i.children[n],e.children[n],t)}var hs=class extends Xn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Rh(t)}),this.register(function(t){return new Ih(t)}),this.register(function(t){return new kh(t)}),this.register(function(t){return new zh(t)}),this.register(function(t){return new Hh(t)}),this.register(function(t){return new Lh(t)}),this.register(function(t){return new Dh(t)}),this.register(function(t){return new Nh(t)}),this.register(function(t){return new Uh(t)}),this.register(function(t){return new Ch(t)}),this.register(function(t){return new Fh(t)}),this.register(function(t){return new Ph(t)}),this.register(function(t){return new Bh(t)}),this.register(function(t){return new Oh(t)}),this.register(function(t){return new Th(t)}),this.register(function(t){return new El(t,je.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new El(t,je.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Vh(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=di.extractUrlBase(e);o=di.resolveURL(l,this.path)}else o=di.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Xs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Bf){try{o[je.KHR_BINARY_GLTF]=new Gh(e)}catch(u){s&&s(u);return}r=JSON.parse(o[je.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Zh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:o[u]=new Ah;break;case je.KHR_DRACO_MESH_COMPRESSION:o[u]=new Wh(r,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:o[u]=new Xh;break;case je.KHR_MESH_QUANTIZATION:o[u]=new $h;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function rv(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Pt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Th=class{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new De(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Jt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new $n(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Vr(h),l.distance=u;break;case"spot":l=new Hr(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),jn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},Ah=class{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return Rn}extendParams(e,t,n){let s=[];e.color=new De(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Jt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Nt))}return Promise.all(s)}},Ch=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Rh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ue(r,r)}return Promise.all(s)}},Ih=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Ph=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Lh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Jt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Nt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Dh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Nh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(r[0],r[1],r[2],Jt),Promise.all(s)}},Uh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Fh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(r[0],r[1],r[2],Jt),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Nt)),Promise.all(s)}},Oh=class{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},Bh=class{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},kh=class{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},zh=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Hh=class{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},El=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(p){return p.buffer}):o.ready.then(function(){let p=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(p),h,u,d,s.mode,s.filter),p})})}else return null}},Vh=class{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==bn.TRIANGLES&&l.mode!==bn.TRIANGLE_STRIP&&l.mode!==bn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,p=[];for(let g of u){let x=new We,m=new W,f=new Ut,M=new W(1,1,1),A=new ji(g.geometry,g.material,d);for(let T=0;T<d;T++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&f.fromBufferAttribute(c.ROTATION,T),c.SCALE&&M.fromBufferAttribute(c.SCALE,T),A.setMatrixAt(T,x.compose(m,f,M));let b=null;for(let T in c)if(T==="_COLOR_0"){let w=c[T];A.instanceColor=new ai(w.array,w.itemSize,w.normalized)}else if(T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"){if(b===null){let y=A.geometry;b=new Ft,b.name=y.name;for(let _ in y.attributes)b.setAttribute(_,y.attributes[_]);for(let _ in y.morphAttributes)b.morphAttributes[_]=y.morphAttributes[_];y.index!==null&&b.setIndex(y.index),b.morphTargetsRelative=y.morphTargetsRelative;for(let _ of y.groups)b.addGroup(_.start,_.count,_.materialIndex);y.boundingBox!==null&&(b.boundingBox=y.boundingBox.clone()),y.boundingSphere!==null&&(b.boundingSphere=y.boundingSphere.clone()),b.drawRange.start=y.drawRange.start,b.drawRange.count=y.drawRange.count,b.userData=Object.assign({},y.userData),A.geometry=b}let w=c[T];b.setAttribute(T,new ai(w.array,w.itemSize,w.normalized))}bt.prototype.copy.call(A,g),this.parser.assignFinalMaterial(A),p.push(A)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},Bf="glTF",ro=12,Nf={JSON:1313821514,BIN:5130562},Gh=class{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ro),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Bf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-ro,r=new DataView(e,ro),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Nf.JSON){let l=new Uint8Array(e,ro+o,a);this.content=n.decode(l)}else if(c===Nf.BIN){let l=ro+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Wh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=Yh[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Yh[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],p=sr[d.componentType];l[u]=p.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(p){for(let g in p.attributes){let x=p.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}u(p)},a,l,Jt,d)})})}},Xh=class{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},$h=class{constructor(){this.name=je.KHR_MESH_QUANTIZATION}},wl=class extends Wn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,d=u*u,p=d*u,g=e*l,x=g-l,m=-2*p+3*d,f=p-d,M=1-m,A=f-d+u;for(let b=0;b!==a;b++){let T=o[x+b+a],w=o[x+b+c]*h,y=o[g+b+a],_=o[g+b]*h;r[b]=M*T+A*w+m*y+f*_}return r}},ov=new Ut,qh=class extends wl{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return ov.fromArray(r).normalize().toArray(r),r}},bn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},sr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Uf={9728:Rt,9729:It,9984:Ra,9985:Zs,9986:ss,9987:Ln},Ff={33071:yn,33648:Ls,10497:Ti},Sh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Yh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Bi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},av={CUBICSPLINE:void 0,LINEAR:Ki,STEP:Yi},Eh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function lv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new In({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qn})),i.DefaultMaterial}function cs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function jn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function cv(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function hv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function uv(i){let e,t=i.extensions&&i.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+wh(t.attributes):e=i.indices+":"+wh(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+wh(i.targets[n]);return e}function wh(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Kh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function dv(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var fv=new We,Zh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new rv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new kr(this.options.manager):this.textureLoader=new Gr(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return cs(r,a,s),jn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(di.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=Sh[s.type],a=sr[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new wt(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=Sh[s.type],l=sr[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,m;if(p&&p!==u){let f=Math.floor(d/p),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count,A=t.cache.get(M);A||(x=new l(a,f*p,s.count*p/h),A=new Bs(x,p/h),t.cache.add(M,A)),m=new ks(A,c,d%p/h,g)}else a===null?x=new l(s.count*c):x=new l(a,d,s.count*c),m=new wt(x,c,g);if(s.sparse!==void 0){let f=Sh.SCALAR,M=sr[s.sparse.indices.componentType],A=s.sparse.indices.byteOffset||0,b=s.sparse.values.byteOffset||0,T=new M(o[1],A,s.sparse.count*f),w=new l(o[2],b,s.sparse.count*c);a!==null&&(m=new wt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let y=0,_=T.length;y<_;y++){let E=T[y];if(m.setX(E,w[y*c]),c>=2&&m.setY(E,w[y*c+1]),c>=3&&m.setZ(E,w[y*c+2]),c>=4&&m.setW(E,w[y*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=Uf[d.magFilter]||It,h.minFilter=Uf[d.minFilter]||Ln,h.wrapS=Ff[d.wrapS]||Ti,h.wrapT=Ff[d.wrapT]||Ti,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Rt&&h.minFilter!==It,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let m=new Vt(x);m.needsUpdate=!0,d(m)}),t.load(di.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),jn(u,o),u.userData.mimeType=o.mimeType||dv(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[je.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Gs,en.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ci,en.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return In}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[je.KHR_MATERIALS_UNLIT]){let u=s[je.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new De(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Jt),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Nt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=an);let h=r.alphaMode||Eh.OPAQUE;if(h===Eh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Eh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Rn&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ue(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Rn&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Rn){let u=r.emissiveFactor;a.emissive=new De().setRGB(u[0],u[1],u[2],Jt)}return r.emissiveTexture!==void 0&&o!==Rn&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Nt)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),jn(u,r),t.associations.set(u,{materials:e}),r.extensions&&cs(s,u,r),u})}createUniqueName(e){let t=ht.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Of(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=uv(l),u=s[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[je.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Of(new Ft,l,t),l.mode===bn.TRIANGLE_STRIP?d=d.then(p=>Mh(p,eo)):l.mode===bn.TRIANGLE_FAN&&(d=d.then(p=>Mh(p,Qs))),s[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?lv(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let x=h[p],m=o[p],f,M=l[p];if(m.mode===bn.TRIANGLES||m.mode===bn.TRIANGLE_STRIP||m.mode===bn.TRIANGLE_FAN||m.mode===void 0){let A=r.isSkinnedMesh===!0,b=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");A&&b===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),f=A&&b?new Cr(x,M):new Gt(x,M),f.isSkinnedMesh===!0&&f.normalizeSkinWeights()}else if(m.mode===bn.LINES)f=new Qi(x,M);else if(m.mode===bn.LINE_STRIP)f=new Ji(x,M);else if(m.mode===bn.LINE_LOOP)f=new Ir(x,M);else if(m.mode===bn.POINTS)f=new Pr(x,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&hv(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),jn(f,r),m.extensions&&cs(s,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&cs(s,u[0],r),u[0];let d=new nn;r.extensions&&cs(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Et(rs.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Pi(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),jn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new We;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Rr(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let p=s.channels[u],g=s.samplers[p.sampler],x=p.target,m=x.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,M=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",f)),c.push(this.getDependency("accessor",M)),l.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],g=u[2],x=u[3],m=u[4],f=[];for(let A=0,b=d.length;A<b;A++){let T=d[A],w=p[A],y=g[A],_=x[A],E=m[A];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let R=n._createAnimationTracks(T,w,y,_,E);if(R)for(let P=0;P<R.length;P++)f.push(R[P])}let M=new es(r,void 0,f);return jn(M,s),M})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,fv)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);if(h.userData.pivot!==void 0&&u.length>0){let p=h.userData.pivot,g=u[0];h.pivot=new W().fromArray(p),h.position.x-=p[0],h.position.y-=p[1],h.position.z-=p[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new zs:l.length>1?h=new nn:l.length===1?h=l[0]:h=new bt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),jn(h,r),r.extensions&&cs(n,h,r),r.matrix!==void 0){let u=new We;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new nn;n.name&&(r.name=s.createUniqueName(n.name)),jn(r,n),n.extensions&&cs(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++){let d=c[h];d.parent!==null?r.add(Lf(d)):r.add(d)}let l=h=>{let u=new Map;for(let[d,p]of s.associations)(d instanceof en||d instanceof Vt)&&u.set(d,p);return h.traverse(d=>{let p=s.associations.get(d);p!=null&&u.set(d,p)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];function l(p){p.morphTargetInfluences&&c.push(p.name?p.name:p.uuid)}Bi[r.path]===Bi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(a);let h;switch(Bi[r.path]){case Bi.weights:h=ci;break;case Bi.rotation:h=hi;break;case Bi.translation:case Bi.scale:h=Ii;break;default:n.itemSize===1?h=ci:h=Ii;break}let u=s.interpolation!==void 0?av[s.interpolation]:Ki,d=this._getArrayFromAccessor(n);for(let p=0,g=c.length;p<g;p++){let x=new h(c[p]+"."+Bi[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),o.push(x)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Kh(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof hi?qh:wl;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function pv(i,e,t){let n=e.attributes,s=new Qt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new W(c[0],c[1],c[2]),new W(l[0],l[1],l[2])),a.normalized){let h=Kh(sr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new W,c=new W;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let x=Kh(sr[d.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new rn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Of(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=Yh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Ke.workingColorSpace!==Jt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),jn(i,e),pv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?cv(i,e.targets,t):i})}var jh={rotationX:-Math.PI/2,scale:[1.86/1.74*1.05,2/1.89*1.05,1.66/1.09*1.05],offset:[0,0,0]},Tl={light:{input:2656238,hidden:10989753,kc:16565822,output:1318700,spike:2656238,dim:14607335,shell:2656238,shellOpacity:.07,edgeOpacity:.16},dark:{input:2656238,hidden:8884636,kc:16565822,output:16185594,spike:16773544,dim:2964040,shell:9417727,shellOpacity:.1,edgeOpacity:.18}},us=matchMedia("(prefers-reduced-motion: reduce)").matches;function kf(i,e,{mobile:t=!1,assetBase:n="",theme:s="light",autoRotate:r=!us}={}){let o;try{o=new ls({antialias:!t,alpha:!0,powerPreference:"low-power"})}catch{return null}o.setPixelRatio(Math.min(devicePixelRatio,t?1.25:2)),i.appendChild(o.domElement);let a=new Ai,c=new Et(45,1,.01,50);c.position.set(0,.55,2.8);let l=new Sl(c,o.domElement);l.enableDamping=!0,l.dampingFactor=.08,l.minDistance=1.2,l.maxDistance=8,l.autoRotate=r&&!us,l.autoRotateSpeed=.4,a.add(new Li(16777215,.9));let h=new $n(16777215,1.2);h.position.set(2,3,4),a.add(h);let u=t?e.nodes.filter((U,X)=>U.layer!=="hidden"||X%3===0):e.nodes,d=new Map(u.map((U,X)=>[e.nodes.indexOf(U),X])),p=(t?e.edges.slice(0,2e3):e.edges).filter(([U,X])=>d.has(U)&&d.has(X)).map(([U,X,ie])=>[d.get(U),d.get(X),ie]),g=u.length,x=Tl[s]??Tl.light,m=new Ur(.011,8,6),f=new Fr({color:16777215}),M=new ji(m,f,g),A=new Float32Array(g*3),b=new bt,T=U=>U.layer==="input"?x.input:U.layer==="output"?x.output:U.isKC?x.kc:x.hidden,w=U=>U.layer==="output"?1.6:U.layer==="input"?1.1:1,y=new De;u.forEach((U,X)=>{A.set(U.xyz,X*3),b.position.set(U.xyz[0],U.xyz[1],U.xyz[2]),b.scale.setScalar(w(U)),b.updateMatrix(),M.setMatrixAt(X,b.matrix),M.setColorAt(X,y.setHex(T(U)))}),M.instanceMatrix.needsUpdate=!0,M.instanceColor.needsUpdate=!0,a.add(M);let _=new Float32Array(p.length*6),E=new Float32Array(p.length*6),R=new Ft;function P(){p.forEach(([U,X],ie)=>{_.set(u[U].xyz,ie*6),_.set(u[X].xyz,ie*6+3),y.setHex(T(u[U])),E.set([y.r,y.g,y.b],ie*6),y.setHex(T(u[X])),E.set([y.r,y.g,y.b],ie*6+3)}),R.setAttribute("position",new wt(_,3)),R.setAttribute("color",new wt(E,3))}P();let O=new Ci({vertexColors:!0,transparent:!0,opacity:x.edgeOpacity}),L=new Qi(R,O);a.add(L);let C=new nn;C.rotation.x=jh.rotationX,C.scale.set(...jh.scale),C.position.set(...jh.offset),a.add(C);let N=new Yt({color:x.shell,transparent:!0,opacity:x.shellOpacity,roughness:.6,metalness:0,side:an,depthWrite:!1});new hs().load(`${n}models/brain_shell.glb`,U=>{U.scene.traverse(X=>{X.isMesh&&(X.material=N)}),C.add(U.scene),ce()},void 0,()=>{});let F={roi:"",showKC:!0,showEdges:!0,showShell:!0,activity:null},k=new De,Q=new De;function K(){let U=F.activity;U&&(k.setHex(x.dim),Q.setHex(x.spike)),u.forEach((X,ie)=>{let be=(F.showKC||!X.isKC)&&(!F.roi||X.roi===F.roi||X.layer==="output"),he=U?U[ie]:0,ze=(be?1:0)*w(X)*(U?.6+he*1.7:1);b.position.set(A[ie*3],A[ie*3+1],A[ie*3+2]),b.scale.setScalar(ze),b.updateMatrix(),M.setMatrixAt(ie,b.matrix),U?(y.copy(k).lerp(Q,he),M.setColorAt(ie,y)):M.setColorAt(ie,y.setHex(T(X)))}),M.instanceMatrix.needsUpdate=!0,M.instanceColor.needsUpdate=!0,L.visible=F.showEdges,L.material.opacity=U?x.edgeOpacity*.4:x.edgeOpacity,C.visible=F.showShell,ce()}let J=null,te=!1;function ce(){o.render(a,c)}function le(){l.update(),ce(),J=requestAnimationFrame(le)}function Oe(){J===null&&!te&&le()}function pe(){J!==null&&cancelAnimationFrame(J),J=null}function Ne(){let U=i.clientWidth,X=i.clientHeight;!U||!X||(o.setSize(U,X,!1),c.aspect=U/X,c.updateProjectionMatrix(),ce())}return new ResizeObserver(Ne).observe(i),Ne(),us?l.addEventListener("change",ce):Oe(),{nodes:u,edges:p,mesh:M,setRoi(U){F.roi=U,K()},setKC(U){F.showKC=U,K()},setEdges(U){F.showEdges=U,K()},setShell(U){F.showShell=U,K()},setAutoRotate(U){l.autoRotate=U&&!us},setTheme(U){x=Tl[U]??Tl.light,N.color.setHex(x.shell),N.opacity=x.shellOpacity,P(),R.attributes.color.needsUpdate=!0,K()},highlightActivity(U){if(!U){F.activity&&(F.activity=null,K());return}let X=new Float32Array(g);for(let ie=0;ie<U.length;ie++){let be=d.get(ie);be!==void 0&&(X[be]=U[ie])}F.activity=X,K()},pause(){te=!0,pe()},resume(){te=!1,Ne(),us?ce():Oe()},dispose(){pe(),o.dispose()}}}function zf(i,{assetBase:e=""}={}){let t;try{t=new ls({canvas:i,antialias:!0,alpha:!0})}catch{return null}t.setPixelRatio(Math.min(devicePixelRatio,2));let n=new Ai,s=new Et(35,1,.1,20);s.position.set(0,.3,4.2),n.add(new Li(16777215,1.1));let r=new $n(16777215,1.6);r.position.set(3,4,2),n.add(r);let o=new nn;n.add(o);let a=new hs,c=new In({color:8884636,roughness:.6,metalness:.05}),l=(g,x,m,f=0)=>a.load(`${e}models/${g}`,M=>{M.scene.traverse(A=>{A.isMesh&&(A.material=c)}),M.scene.position.set(x,f,0),M.scene.scale.setScalar(m),o.add(M.scene),u()},void 0,()=>{});l("fly.glb",-.9,1.05),l("fly_head.glb",1.1,.75,-.05);let h=null;function u(){t.render(n,s)}function d(){let g=i.clientWidth,x=i.clientHeight;!g||!x||(t.setSize(g,x,!1),s.aspect=g/x,s.updateProjectionMatrix(),u())}function p(){o.rotation.y+=.004,u(),h=requestAnimationFrame(p)}return new ResizeObserver(d).observe(i),d(),us||p(),{renderer:t,pause(){h!==null&&cancelAnimationFrame(h),h=null},resume(){d(),!us&&h===null&&p()}}}var ye=(i,e=2)=>i==null||Number.isNaN(i)?"\u2014":Number(i).toFixed(e),Be=(i,e=0)=>i==null?"\u2014":`${(i*100).toFixed(e)}%`;function z(i,e={},t){let n=document.createElement(i);for(let[s,r]of Object.entries(e))s==="class"?n.className=r:n.setAttribute(s,r);return t!==void 0&&(n.textContent=t),n}function we(i,e={},t){let n=document.createElementNS("http://www.w3.org/2000/svg",i);for(let[s,r]of Object.entries(e))n.setAttribute(s,r);return t!==void 0&&(n.textContent=t),n}function rr(i,e=18){let t=we("svg",{width:e,height:e,"aria-hidden":"true"});return t.appendChild(we("use",{href:`#${i}`})),t}function oo(i){let e=atob(i),t=new Uint8Array(200);for(let n=0;n<200;n++)t[n]=e.charCodeAt(n>>3)>>(n&7)&1;return t}var mv=i=>`oklch(${(.97-i*.346).toFixed(3)} ${(.02+i*.156).toFixed(3)} 252)`;function Hf(i,{q:e,row:t,ref:n=null,dnTypes:s=[]}){let r=e.n,o=t*r,a=n===null?-1:n*r,c=document.createDocumentFragment(),l=0;for(let h=0;h<r;h++){let u=e.data[o+h],d=a>=0&&u!==e.data[a+h];d&&l++;let p=e.max>e.min?e.min+u/255*(e.max-e.min):e.min,g=z("div",{class:`cell${d?" changed":""}`,title:`${s[h]??"DN"} #${h}: ${p.toFixed(4)}`});g.style.background=mv(u/255),c.appendChild(g)}return i.replaceChildren(c),{changed:l}}function Jh(i,e){let t=new Set;for(let n=0;n<e;n++)t.add(i.data.slice(n*i.n,(n+1)*i.n).join(","));return t.size}function Un({title:i="\uC544\uC9C1 \uCE21\uC815\uD55C \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694",desc:e="",cta:t=null,href:n="#/versus",hint:s=""}={}){let r=z("div",{class:"empty-state"}),o=z("div",{class:"empty-icon","aria-hidden":"true"});return o.appendChild(z("i")),r.append(o,z("div",{class:"empty-title"},i)),e&&r.appendChild(z("p",{class:"empty-desc"},e)),t&&r.appendChild(z("a",{class:"btn btn-primary btn-lg",href:n},t)),s&&r.appendChild(z("p",{class:"empty-hint"},s)),r}function Vf(i){let e=z("div",{class:"card"});return e.appendChild(Un(i)),e}var gv="fly-matchlog";var ds=null,ft={matches:[],decisions:[],loaded:!1},Qh=new Set,lo=()=>{for(let i of Qh)try{i(ft)}catch(e){console.warn("matchlog listener",e)}},Xf=i=>(Qh.add(i),()=>Qh.delete(i));function _v(){return new Promise(i=>{if(!globalThis.indexedDB)return i(null);let e;try{e=indexedDB.open(gv,1)}catch{return i(null)}e.onupgradeneeded=()=>{let t=e.result;t.objectStoreNames.contains("matches")||t.createObjectStore("matches",{keyPath:"id"}),t.objectStoreNames.contains("decisions")||t.createObjectStore("decisions",{keyPath:"id"})},e.onsuccess=()=>i(e.result),e.onerror=()=>i(null),e.onblocked=()=>i(null)})}var Gf=i=>new Promise(e=>{if(!ds)return e([]);try{let t=ds.transaction(i,"readonly").objectStore(i).getAll();t.onsuccess=()=>e(t.result??[]),t.onerror=()=>e([])}catch{e([])}});function ao(i,e=[],t=[]){if(ds)try{let s=ds.transaction(i,"readwrite").objectStore(i);for(let r of e)s.put(r);for(let r of t)s.delete(r)}catch(n){console.warn("matchlog write",n)}}async function $f(){if(ft.loaded)return ft;ds=await _v();let[i,e]=await Promise.all([Gf("matches"),Gf("decisions")]);return ft.matches=i.sort((t,n)=>n.startedAt-t.startedAt).slice(0,20),ft.decisions=e.sort((t,n)=>t.id-n.id).slice(-60),ft.loaded=!0,ft.storage=ds?"indexeddb":"memory",lo(),ft}globalThis.__matchlog={get state(){return ft},get db(){return!!ds},totals:()=>co(),clear:()=>eu()};var Fn=()=>ft;var hn=i=>i?ft.decisions.filter(e=>e.matchId===i):ft.decisions.slice();function qf(i){let e={id:Date.now(),startedAt:Date.now(),endedAt:null,winner:null,reason:null,seed:i?.seed??null,flyPlaceMs:i?.flyPlaceMs??null,model:i?.model??null,human:null,fly:null,think:null,timeline:[],decisionCount:0,quality:[]};ft.matches.unshift(e);let t=ft.matches.splice(20);return t.length&&ao("matches",[],t.map(n=>n.id)),lo(),e.id}var Wf=i=>({pieces:i.pieces,attack:i.player.stats.attack,sent:i.player.stats.sent,lines:i.player.stats.lines,tetris:i.player.stats.tetris,tspin:i.player.stats.tspin,tspinMini:i.player.stats.tspinMini,maxCombo:i.player.stats.maxCombo,holds:i.player.stats.holds,garbageReceived:i.player.stats.garbageReceived,perfectClear:i.player.stats.perfectClear,dead:i.player.dead});function Yf(i,e,t){let n=ft.matches.find(r=>r.id===i);if(!n)return;let s=[...t].sort((r,o)=>r-o);n.endedAt=Date.now(),n.winner=e.winner,n.reason=e.reason,n.human=Wf(e.human),n.fly=Wf(e.fly),n.think=s.length?{n:s.length,median:s[s.length>>1],min:s[0],max:s[s.length-1],mean:s.reduce((r,o)=>r+o,0)/s.length}:null,n.timeline=e.log.map(r=>({...r})),n.decisionCount=ft.decisions.filter(r=>r.matchId===i).length,ao("matches",[n]),lo()}var xv=4e3;function Kf(i,e){let t=ft.matches.find(n=>n.id===i);!t||t.quality.length>=xv||t.quality.push(e)}var yv=0;function Zf(i,e,t){let n={id:Date.now()*1e3+yv++%1e3,matchId:i,at:Date.now(),ms:t,...e};ft.decisions.push(n);let s=ft.decisions.splice(0,Math.max(0,ft.decisions.length-60));return ao("decisions",[n],s.map(r=>r.id)),lo(),n}function eu(){let i=ft.matches.map(t=>t.id),e=ft.decisions.map(t=>t.id);ft.matches=[],ft.decisions=[],ao("matches",[],i),ao("decisions",[],e),lo()}function co(){let i=ft.matches.filter(o=>o.endedAt);if(!i.length)return null;let e=i.filter(o=>o.winner==="human").length,t=i.filter(o=>o.winner==="fly").length,n=o=>i.reduce((a,c)=>a+(o(c)??0),0),s=o=>{let a=i.map(o).filter(c=>c!=null).sort((c,l)=>c-l);return a.length?a[a.length>>1]:null},r=i.map(o=>o.think?.median).filter(o=>o!=null).sort((o,a)=>o-a);return{games:i.length,wins:e,losses:t,draws:i.length-e-t,humanPieces:n(o=>o.human?.pieces),flyPieces:n(o=>o.fly?.pieces),humanAttack:n(o=>o.human?.attack),flyAttack:n(o=>o.fly?.attack),humanLines:n(o=>o.human?.lines),flyLines:n(o=>o.fly?.lines),humanTetris:n(o=>o.human?.tetris),flyTetris:n(o=>o.fly?.tetris),humanPiecesMedian:s(o=>o.human?.pieces),flyPiecesMedian:s(o=>o.fly?.pieces),humanAttackMedian:s(o=>o.human?.attack),flyAttackMedian:s(o=>o.fly?.attack),thinkMedian:r.length?r[r.length>>1]:null,decisions:ft.decisions.length}}function Al(i=ft.decisions){let e=i.filter(l=>l.teacherAligned&&l.candidates.length>1);if(!e.length)return null;let t=0,n=0,s=0,r=0,o=0,a=0,c=0;for(let l of e){let h=l.candidates.length,u=l.candidates[l.chosen].teacherRank;u===0&&t++,n+=1-u/(h-1),u>=h/2&&s++;let d=l.candidates.map(w=>w.teacher),p=Math.max(...d),g=Math.min(...d);r+=p-d[l.chosen],o+=p-g;let x=l.candidates.map(w=>w.score),m=d,f=0,M=0,A=0,b=0;for(let w=0;w<h;w++)for(let y=w+1;y<h;y++){let _=Math.sign(x[w]-x[y]),E=Math.sign(m[w]-m[y]);if(!(_===0&&E===0)){if(_===0){A++;continue}if(E===0){b++;continue}_===E?f++:M++}}let T=Math.sqrt((f+M+A)*(f+M+b));T>0&&(a+=(f-M)/T,c++)}return{decisions:e.length,candidatesPerDecision:e.reduce((l,h)=>l+h.candidates.length,0)/e.length,top1:t/e.length,pickPercentile:n/e.length,bottomHalfRate:s/e.length,relRegret:o>0?r/o:0,tau:c?a/c:null}}var ho=10,Cl=20,vv=["I","O","T","S","Z","J","L"],Rl={empty:"#eef1f4",fixed:"#a7b0b9",placed:"#2887ee",gone:"#ffe1e1"},uo={brand:"#2887ee",chosen:"#007738",other:"#c5cbd2"},bv="#e3e7ec";function jf(i){let e=document.getElementById("decision-body"),t=document.getElementById("decision-grid"),n=document.getElementById("dec-notice"),s=document.getElementById("decision-empty"),r=document.getElementById("dec-match"),o=document.getElementById("dec-board"),a=document.getElementById("dec-strip"),c=document.getElementById("dec-heat"),l=document.getElementById("dec-bump"),h=document.getElementById("dec-label"),u={matchId:null,d:0,c:0},d=[],p=!1;function g(y,_,E,R){let P=y.getContext("2d");P.clearRect(0,0,y.width,y.height);for(let O=0;O<Cl;O++)for(let L=0;L<ho;L++){let C=O*ho+L,N=E[C],F=_?_[C]:0;P.fillStyle=!N&&!F?Rl.empty:N&&!F?Rl.placed:N?Rl.fixed:Rl.gone,P.fillRect(L*R,O*R,R,R)}if(R>=6){P.strokeStyle=bv,P.lineWidth=1,P.beginPath();for(let O=1;O<ho;O++)P.moveTo(O*R+.5,0),P.lineTo(O*R+.5,Cl*R);for(let O=1;O<Cl;O++)P.moveTo(0,O*R+.5),P.lineTo(ho*R,O*R+.5);P.stroke()}}function x(){let y=Fn().matches.filter(_=>hn(_.id).length);r.replaceChildren(...y.map((_,E)=>{let R=hn(_.id).length,P=new Date(_.startedAt).toLocaleString("ko-KR",{dateStyle:"short",timeStyle:"short"}),O=_.winner==="human"?"\uB0B4\uAC00 \uC774\uAE40":_.winner==="fly"?"\uCD08\uD30C\uB9AC\uAC00 \uC774\uAE40":_.endedAt?"\uBB34\uC2B9\uBD80":"\uC9C4\uD589 \uC911";return z("option",{value:String(_.id),selected:E===0&&u.matchId===null?"selected":void 0},`${P} \xB7 ${O} \xB7 \uACB0\uC815 ${R}`)})),u.matchId!==null&&(r.value=String(u.matchId))}function m(){let y=0,_=-1;return d.forEach((E,R)=>{if(E.candidates.length<4)return;let P=Jh(E.dn,E.candidates.length)/E.candidates.length;P>_&&(_=P,y=R)}),y}function f(){let y=d[u.d],_=oo(y.boardBefore);h.textContent=`\uACB0\uC815 ${u.d+1}/${d.length} \xB7 ${vv[y.piece]??"?"} \xB7 \uD6C4\uBCF4 ${y.candidates.length} \xB7 \uC0DD\uAC01 ${y.ms} ms`,a.replaceChildren(...y.candidates.map((E,R)=>{let P=z("canvas",{width:String(ho*3),height:String(Cl*3),role:"option",title:`${E.useHold?"HOLD \xB7 ":""}col ${E.col} rot ${E.rot} \xB7 \uBAA8\uB378 ${ye(E.score,2)} \xB7 \uAD50\uC0AC ${ye(E.teacher,1)}`});return g(P,_,oo(E.board),3),P.addEventListener("click",()=>{u.c=R,M()}),P})),M()}function M(){let y=d[u.d],_=y.candidates[u.c],E=oo(y.boardBefore);g(o,E,oo(_.board),20),[...a.children].forEach((L,C)=>{L.className=`${C===u.c?"selected ":""}${C===y.chosen?"chosen":""}`,L.setAttribute("aria-selected",String(C===u.c))});let R=u.c===y.chosen;document.getElementById("dec-info").innerHTML=`\uD6C4\uBCF4 <b>${_.useHold?"HOLD \xB7 ":""}col ${_.col} \xB7 rot ${_.rot}</b>${_.lines?` \xB7 ${_.lines}\uC904 \uC81C\uAC70`:""}${_.sent?` \xB7 \uACF5\uACA9 ${_.sent}`:""}${R?' \xB7 <span class="chosen">\uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uBC30\uCE58</span>':""}<br>\uBAA8\uB378 \uC810\uC218 <b>${ye(_.score,2)}</b> \xB7 \uAD50\uC0AC \uC810\uC218 <b>${ye(_.teacher,1)}</b>${y.teacherAligned?` \xB7 \uAD50\uC0AC \uC21C\uC704 <b>${_.teacherRank+1}/${y.candidates.length}</b>`:""}`;let{changed:P}=Hf(c,{q:y.dn,row:u.c,ref:R?null:y.chosen,dnTypes:T}),O=Jh(y.dn,y.candidates.length);document.getElementById("dec-heat-title").textContent=`\uCC3D ${A(y)} \uC2A4\uD15D \uD3C9\uADE0 \xB7 \uC774 \uACB0\uC815\uC758 \uCD5C\uC19F\uAC12~\uCD5C\uB313\uAC12\uC73C\uB85C \uC815\uADDC\uD654 \xB7 ${y.dn.n}\uAC1C`,document.getElementById("dec-heat-min").textContent=ye(y.dn.min,3),document.getElementById("dec-heat-max").textContent=ye(y.dn.max,3),document.getElementById("dec-heat-info").innerHTML=`\uC774 \uACB0\uC815\uC758 \uD6C4\uBCF4 ${y.candidates.length}\uAC1C \uC911 \uC11C\uB85C \uB2E4\uB978 DN \uBCA1\uD130 <b>${O}</b>\uAC1C`+(R?"":` \xB7 \uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uD6C4\uBCF4\uC640 \uB2E4\uB978 DN <b>${P}</b>/${y.dn.n} (\uC8FC\uD669 \uD14C\uB450\uB9AC)`),b(y),i?.(y,u.c)}let A=y=>y.trace?.T??25;function b(y){let _=y.candidates.length,E=[...y.candidates.keys()].sort((X,ie)=>y.candidates[ie].score-y.candidates[X].score||X-ie),R=[...y.candidates.keys()].sort((X,ie)=>y.candidates[ie].teacher-y.candidates[X].teacher||X-ie),P=16,O=26,L=76,C=76,N=380,F=O+_*P+10;l.setAttribute("viewBox",`0 0 ${N} ${F}`),l.replaceChildren();let k=we("g");k.appendChild(we("text",{x:L,y:14,"text-anchor":"end",style:"font-weight:600"},"A \uBAA8\uB378 \uC21C\uC704")),k.appendChild(we("text",{x:N-C,y:14,style:"font-weight:600"},"B \uAD50\uC0AC \uC21C\uC704"));let Q=X=>O+X*P+P/2,K=new Map(E.map((X,ie)=>[X,ie])),J=new Map(R.map((X,ie)=>[X,ie]));y.candidates.forEach((X,ie)=>{let be=Q(K.get(ie)),he=Q(J.get(ie)),ze=ie===u.c,xt=ie===y.chosen;k.appendChild(we("line",{x1:L+4,y1:be,x2:N-C-4,y2:he,stroke:ze?uo.brand:xt?uo.chosen:uo.other,"stroke-width":ze||xt?2:1,opacity:ze||xt?1:.8}))});let te=X=>X===u.c?`fill:${uo.brand};font-weight:600`:X===y.chosen?`fill:${uo.chosen};font-weight:600`:"",ce=X=>`${X.useHold?"h":""}c${X.col} r${X.rot}`;E.forEach((X,ie)=>{let be=we("text",{x:L,y:Q(ie)+4,"text-anchor":"end",style:te(X)},`${ie+1}. ${ce(y.candidates[X])}`);be.style.cursor="pointer",be.addEventListener("click",()=>{u.c=X,M()}),k.appendChild(be)}),R.forEach((X,ie)=>{let be=we("text",{x:N-C,y:Q(ie)+4,style:te(X)},`${ie+1}. ${ce(y.candidates[X])}`);be.style.cursor="pointer",be.addEventListener("click",()=>{u.c=X,M()}),k.appendChild(be)}),l.appendChild(k);let le=J.get(y.chosen)+1,Oe=y.candidates.map(X=>X.teacher),pe=Math.max(...Oe),Ne=Math.min(...Oe),U=pe-Oe[y.chosen];document.getElementById("dec-rank-info").innerHTML=`\uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uBC30\uCE58\uC758 \uAD50\uC0AC \uC21C\uC704 <b>${le} / ${_}</b> \xB7 \uC0C1\uB300 regret <b>${ye(pe>Ne?U/(pe-Ne):0,3)}</b> (0 \uC774\uBA74 \uAD50\uC0AC \uCD5C\uC120)<br>\uCD08\uB85D = \uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uBC30\uCE58, \uD30C\uB791 = \uBCF4\uB294 \uC911\uC778 \uD6C4\uBCF4. \uB450 \uC21C\uC704\uB97C \uC787\uB294 \uC120\uC774 \uD3C9\uD589\uD560\uC218\uB85D \uBAA8\uB378\uC774 \uAD50\uC0AC\uC758 \uC21C\uC704\uB97C \uADF8\uB300\uB85C \uC548\uB2E4\uB294 \uB73B\uC774\uC5D0\uC694.`}let T=[];function w(){d=hn(u.matchId);let y=d.length>0;if(p=y,t.hidden=!y,n.hidden=!y,document.getElementById("dec-controls").hidden=!y,s.hidden=y,!y){s.replaceChildren(Un({desc:"\uB300\uC804\uC5D0\uC11C \uCD08\uD30C\uB9AC\uAC00 \uC218\uB97C \uB450\uBA74 \uADF8 \uACB0\uC815\uC758 \uD6C4\uBCF4 \uBC30\uCE58\xB7DN \uCC3D\uD3C9\uADE0\xB7\uAD50\uC0AC \uC21C\uC704\uAC00 \uC5EC\uAE30\uC5D0 \uC313\uC5EC\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uD55C \uD310\uB9CC \uD574\uB3C4 \uCD5C\uADFC \uACB0\uC815 \uC218\uC2ED \uAC1C\uB97C \uBCFC \uC218 \uC788\uC5B4\uC694"}));return}x(),u.d>=d.length&&(u.d=m()),u.c=d[u.d].chosen,f()}return document.getElementById("dec-prev").addEventListener("click",()=>{u.d=(u.d-1+d.length)%d.length,u.c=d[u.d].chosen,f()}),document.getElementById("dec-next").addEventListener("click",()=>{u.d=(u.d+1)%d.length,u.c=d[u.d].chosen,f()}),r.addEventListener("change",()=>{u.matchId=Number(r.value),d=hn(u.matchId),u.d=m(),u.c=d[u.d]?.chosen??0,f()}),{state:u,setDnTypes(y){T=y},refresh(){let y=hn(u.matchId).length>0;p!==y?w():y&&(d=hn(u.matchId),u.d>=d.length&&(u.d=d.length-1,u.c=d[u.d].chosen,f()),x())},render:w,get decision(){return d[u.d]??null},get candidate(){return u.c}}}var fo={input:"#2887ee",hidden:"#a7b0b9",output:"#141f2c"},Jf={input:"\uC785\uB825 LC/LPLC",hidden:"\uC911\uAC04",output:"\uCD9C\uB825 DN"},Il={muted:"#6a7480",cursor:"#ff8800",grid:"#e3e7ec"},Mv=matchMedia("(prefers-reduced-motion: reduce)").matches;function Qf(i,e){let t=document.getElementById("act-raster"),n=document.getElementById("act-chart"),s=document.getElementById("activity-grid"),r=document.getElementById("activity-empty"),o={input:0,hidden:1,output:2},a=i.nodes.map((L,C)=>C).sort((L,C)=>o[i.nodes[L].layer]-o[i.nodes[C].layer]||L-C),c=new Int32Array(i.nodes.length);a.forEach((L,C)=>{c[L]=C});let l={input:0,hidden:0,output:0};for(let L of i.nodes)l[L.layer]++;let h={dec:null,t:0,playing:!1,timer:null},u=[],d=()=>h.dec?.trace?.T??25,p=()=>!!h.dec?.trace,g=(L,C)=>h.dec.trace.data[L*h.dec.trace.n+C]/255,x=L=>{let C=h.dec.trace;return C.max>C.min?C.min+L*(C.max-C.min):C.min},m=()=>{let L=h.dec.trace;return Math.max(1e-6,Math.abs(L.min),Math.abs(L.max))},f=(L,C)=>Math.abs(x(g(L,C)))/m();function M(){if(!p()||t.clientWidth===0)return;let L=Math.min(devicePixelRatio,2),C=t.clientWidth,N=t.clientHeight;t.width=C*L,t.height=N*L;let F=t.getContext("2d");F.setTransform(L,0,0,L,0,0),F.clearRect(0,0,C,N);let k=74,Q=12,K=26,J=12,te=a.length,ce=d(),le=(C-k-J)/ce,Oe=(N-Q-K)/te,pe=getComputedStyle(document.body).fontFamily,Ne=[["input",0,l.input],["hidden",l.input,te-l.output],["output",te-l.output,te]];for(let[U,X,ie]of Ne)F.fillStyle=fo[U],F.globalAlpha=.06,F.fillRect(k,Q+X*Oe,C-k-J,(ie-X)*Oe),F.globalAlpha=1,F.fillStyle=fo[U],F.font=`600 11px ${pe}`,F.textAlign="right",F.fillText(Jf[U],k-8,Q+(X+(ie-X)/2)*Oe+4);for(let U=0;U<ce;U++){let X=k+U*le,ie=U>h.t;for(let be=0;be<a.length;be++){let he=f(U,be);if(he<.03)continue;let ze=c[be];F.globalAlpha=ie?he*.22:he,F.fillStyle=fo[i.nodes[be].layer],F.fillRect(X,Q+ze*Oe,Math.max(1,le),Math.max(1,Oe))}}F.globalAlpha=1,F.strokeStyle=Il.cursor,F.lineWidth=1.5,F.beginPath(),F.moveTo(k+(h.t+1)*le,Q),F.lineTo(k+(h.t+1)*le,N-K),F.stroke(),F.fillStyle=Il.muted,F.textAlign="center",F.font=`500 10px ${pe}`;for(let U=0;U<ce;U+=5)F.fillText(`${U}`,k+(U+.5)*le,N-9);F.fillText("\uC2A4\uD15D",C-22,N-9)}function A(){if(!p())return;let L=d(),C=380,N=n.clientWidth?Math.round(C*n.clientHeight/n.clientWidth):240,F=46,k=12,Q=18,K=28;n.setAttribute("viewBox",`0 0 ${C} ${N}`),n.replaceChildren();let J={input:new Float64Array(L),hidden:new Float64Array(L),output:new Float64Array(L)};for(let pe=0;pe<L;pe++){let Ne={input:0,hidden:0,output:0};for(let U=0;U<a.length;U++)Ne[i.nodes[U].layer]+=Math.abs(x(g(pe,U)));for(let U of["input","hidden","output"])J[U][pe]=l[U]?Ne[U]/l[U]:0}let te=Math.max(1e-6,...["input","hidden","output"].flatMap(pe=>[...J[pe]])),ce=pe=>F+pe/Math.max(1,L-1)*(C-F-k),le=pe=>Q+(1-pe/te)*(N-Q-K),Oe=we("g",{class:"axis"});for(let pe=0;pe<=4;pe++){let Ne=te*pe/4;Oe.appendChild(we("line",{x1:F,x2:C-k,y1:le(Ne),y2:le(Ne)})),Oe.appendChild(we("text",{x:F-6,y:le(Ne)+3,"text-anchor":"end"},Ne.toFixed(2)))}for(let pe=0;pe<L;pe+=5)Oe.appendChild(we("text",{x:ce(pe),y:N-8,"text-anchor":"middle"},`${pe}`));Oe.appendChild(we("text",{x:C-k,y:N-8,"text-anchor":"end"},"\uC2A4\uD15D")),n.appendChild(Oe),["input","hidden","output"].forEach((pe,Ne)=>{let U=[...J[pe]].map((X,ie)=>`${ce(ie)},${le(X)}`).join(" ");n.appendChild(we("polyline",{points:U,fill:"none",stroke:fo[pe],"stroke-width":2,"stroke-linejoin":"round"})),n.appendChild(we("text",{x:F+4+Ne*68,y:12,style:`fill:${fo[pe]};font-weight:600`},Jf[pe]))}),n.appendChild(we("line",{x1:ce(h.t),x2:ce(h.t),y1:Q,y2:N-K,stroke:Il.cursor,"stroke-width":1.5})),n.appendChild(we("text",{x:C-k,y:12,"text-anchor":"end",style:`fill:${Il.muted}`},`\uD45C\uBCF8 ${a.length} \uB274\uB7F0 (\uC804\uCCB4 ${i.meta?.total?.toLocaleString?.()??"8,000"})`))}function b(){for(let L of u)L.play.replaceChildren(rr(h.playing?"i-pause":"i-play"),document.createTextNode(h.playing?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD")),L.play.setAttribute("aria-pressed",String(h.playing)),L.play.disabled=!p(),L.step.disabled=!p(),L.reset.disabled=!p()}function T(){let L=p()?`\uC2A4\uD15D ${h.t+1} / ${d()} \xB7 \uC774 \uC2A4\uD15D \uD3C9\uADE0 |\uD65C\uC131| ${ye(w(),3)}`:"\uB300\uC804\uC5D0\uC11C \uCD08\uD30C\uB9AC\uAC00 \uC218\uB97C \uB450\uBA74 \uC7AC\uC0DD\uD560 \uC218 \uC788\uC5B4\uC694";for(let N of u)N.label.textContent=L;M(),A(),b(),e?.highlightActivity(p()?y(h.t):null);let C=document.getElementById("act-info");if(C&&p()){let N=h.dec.trace;C.innerHTML=`\uD65C\uC131 \uBC94\uC704 <b>${ye(N.min,3)} ~ ${ye(N.max,3)}</b> (tanh \uC0C1\uD0DC) \xB7 \uCC3D ${d()} \uC2A4\uD15D \xB7 \uD45C\uBCF8 ${N.n} \uB274\uB7F0 \xB7 \uACB0\uC815 \uC0DD\uAC01 \uC2DC\uAC04 <b>${h.dec.ms} ms</b> \xB7 \uD6C4\uBCF4 ${h.dec.candidates.length}\uAC1C`}}function w(){let L=0;for(let C=0;C<a.length;C++)L+=Math.abs(x(g(h.t,C)));return L/a.length}function y(L){let C=new Float32Array(a.length);for(let F=0;F<a.length;F++){let k=Math.abs(x(g(L,F)));C[F]=k}let N=0;for(let F of C)F>N&&(N=F);if(N>0)for(let F=0;F<C.length;F++)C[F]/=N;return C}function _(L){let C=d();h.t=(L%C+C)%C,T()}function E(){h.playing=!1,h.timer&&clearInterval(h.timer),h.timer=null,b()}function R(){p()&&(h.t>=d()-1&&(h.t=0),h.playing=!0,b(),h.timer=setInterval(()=>{if(h.t>=d()-1){E();return}_(h.t+1)},Mv?400:180))}function P(L){if(!L)return;let C={play:L.querySelector('[data-sp="play"]'),step:L.querySelector('[data-sp="step"]'),reset:L.querySelector('[data-sp="reset"]'),label:L.querySelector('[data-sp="label"]')};C.play.addEventListener("click",()=>h.playing?E():R()),C.step.addEventListener("click",()=>{E(),_(h.t+1)}),C.reset.addEventListener("click",()=>{E(),_(0)}),u.push(C),b()}function O(){let L=p();s&&(s.hidden=!L);let C=document.getElementById("act-notice");C&&(C.hidden=!L);let N=document.getElementById("act-play");N&&(N.hidden=!L),r&&(r.hidden=L,L||r.replaceChildren(Un({desc:"\uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uBC30\uCE58\uB97C \uBC30\uC120 \uC81C\uC57D \uB124\uD2B8\uC6CC\uD06C\uC5D0 \uB123\uC5C8\uC744 \uB54C, \uD45C\uBCF8 \uB274\uB7F0 907\uAC1C\uC758 \uC2A4\uD15D\uBCC4 \uD65C\uC131\uC744 \uC5EC\uAE30\uC11C \uC7AC\uC0DD\uD574\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uCEE4\uB125\uD1B0 3D \uD654\uBA74\uC5D0\uC11C\uB3C4 \uAC19\uC740 \uC7AC\uC0DD\uC744 \uBCFC \uC218 \uC788\uC5B4\uC694"})))}return new ResizeObserver(()=>M()).observe(t),new ResizeObserver(()=>A()).observe(n),{bindControls:P,setDecision(L){E(),h.dec=L,h.t=0,O(),T()},redraw(){O(),M(),A()},clearHighlight(){e?.highlightActivity(null)},get hasTrace(){return p()}}}var ki={human:"#2887ee",fly:"#141f2c",muted:"#6a7480",grid:"#e3e7ec",warn:"#ff8800"};function ep(i){let e=document.getElementById("analysis-empty"),t=document.getElementById("analysis-cards"),n=document.getElementById("an-match"),s=null;function r(l,h,{yLabel:u,yMax:d=null,xMax:p}){l.setAttribute("viewBox","0 0 460 210"),l.replaceChildren();let b=d??Math.max(1,...h.flatMap(_=>_.points.map(E=>E[1]))),T=_=>42+_/Math.max(1,p)*406,w=_=>16+(1-_/b)*166,y=we("g",{class:"axis"});for(let _=0;_<=4;_++){let E=b*_/4;y.appendChild(we("line",{x1:42,x2:448,y1:w(E),y2:w(E)})),y.appendChild(we("text",{x:36,y:w(E)+3,"text-anchor":"end"},`${Math.round(E)}`))}for(let _=0;_<=4;_++){let E=Math.round(p*_/4);y.appendChild(we("text",{x:T(E),y:201,"text-anchor":_===4?"end":"middle"},_===4?`${E} \uC870\uAC01`:`${E}`))}l.appendChild(y),h.forEach((_,E)=>{_.points.length>1&&l.appendChild(we("polyline",{points:_.points.map(([R,P])=>`${T(R)},${w(P)}`).join(" "),fill:"none",stroke:_.color,"stroke-width":1.8,"stroke-linejoin":"round",opacity:.95})),l.appendChild(we("text",{x:46+E*62,y:11,style:`fill:${_.color};font-weight:600`},_.label))}),l.appendChild(we("text",{x:448,y:11,"text-anchor":"end",style:`fill:${ki.muted}`},u))}function o(l,h,{fmtV:u=g=>`${g}`,color:d=ki.fly,note:p=""}){let A=p?24:8,b=8+h.length*26+A;l.setAttribute("viewBox",`0 0 460 ${b}`),l.replaceChildren();let T=Math.max(1e-9,...h.map(w=>w.value));h.forEach((w,y)=>{let _=8+y*26;l.appendChild(we("text",{x:110,y:_+26/2+4,"text-anchor":"end"},w.label));let E=w.value/T*296;l.appendChild(we("rect",{x:120,y:_+4,width:Math.max(1,E),height:16,rx:3,fill:w.color??d,opacity:.9})),l.appendChild(we("text",{x:120+E+6,y:_+26/2+4,style:`fill:${ki.muted}`},u(w.value)))}),p&&l.appendChild(we("text",{x:120,y:b-8,style:`fill:${ki.muted};font-size:9px`},p))}function a(){let l=Fn().matches.filter(h=>(h.quality?.length??0)>0||hn(h.id).length);return n.replaceChildren(...l.map(h=>{let u=new Date(h.startedAt).toLocaleString("ko-KR",{dateStyle:"short",timeStyle:"short"}),d=h.winner==="human"?"\uB0B4\uAC00 \uC774\uAE40":h.winner==="fly"?"\uCD08\uD30C\uB9AC\uAC00 \uC774\uAE40":h.endedAt?"\uBB34\uC2B9\uBD80":"\uC9C4\uD589 \uC911";return z("option",{value:String(h.id)},`${u} \xB7 ${d}`)})),s&&(n.value=String(s)),l}function c(){let l=Fn().matches.filter(C=>(C.quality?.length??0)>0||hn(C.id).length),h=l.length>0;if(t.hidden=!h,document.getElementById("an-controls").hidden=!h,e.hidden=h,!h){e.replaceChildren(Un({desc:"\uC870\uAC01\uC744 \uB193\uC744 \uB54C\uB9C8\uB2E4\uC758 \uAD6C\uBA4D\xB7\uB192\uC774\uC640, \uCD08\uD30C\uB9AC\uAC00 \uAD50\uC0AC \uC21C\uC704\uC5D0\uC11C \uBA87 \uBC88\uC9F8\uB97C \uACE8\uB790\uB294\uC9C0\uB97C \uC5EC\uAE30\uC5D0 \uBAA8\uC544\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uC0AC\uB78C \uCABD\uACFC \uCD08\uD30C\uB9AC \uCABD\uC744 \uAC19\uC740 \uCD95\uC5D0 \uB193\uACE0 \uBD10\uC694"}));return}a(),(!s||!l.some(C=>C.id===s))&&(s=l[0].id),n.value=String(s);let d=Fn().matches.find(C=>C.id===s)?.quality??[],p=hn(s),g=Math.max(1,...d.map(C=>C.at)),x=(C,N)=>d.filter(F=>F.side===C).map(F=>[F.at,F[N]]);r(document.getElementById("an-holes"),[{label:"\uC0AC\uB78C",color:ki.human,points:x("human","holes")},{label:"\uCD08\uD30C\uB9AC",color:ki.fly,points:x("fly","holes")}],{yLabel:"\uAD6C\uBA4D \uC218",xMax:g}),r(document.getElementById("an-height"),[{label:"\uC0AC\uB78C",color:ki.human,points:x("human","height")},{label:"\uCD08\uD30C\uB9AC",color:ki.fly,points:x("fly","height")}],{yLabel:"\uCD5C\uACE0 \uB192\uC774 (\uCE78)",yMax:20,xMax:g});let m=p.filter(C=>C.teacherAligned&&C.candidates.length>1),f=[0,0,0,0,0];for(let C of m){let N=C.candidates[C.chosen].teacherRank/(C.candidates.length-1);f[Math.min(4,Math.floor(N*5))]++}let M=m.length||1;o(document.getElementById("an-rank"),[{label:"\uC0C1\uC704 20% \uC548",value:f[0]/M,color:"#007738"},{label:"20\u201340%",value:f[1]/M},{label:"40\u201360%",value:f[2]/M},{label:"60\u201380%",value:f[3]/M},{label:"\uD558\uC704 20%",value:f[4]/M,color:"#f03848"}],{fmtV:C=>Be(C,0),note:`\uCD08\uD30C\uB9AC \uACB0\uC815 ${m.length}\uAC1C \xB7 \uAD50\uC0AC \uC21C\uC704\uC5D0\uC11C \uBA87 \uBC88\uC9F8\uB97C \uACE8\uB790\uB098`});let A=[0,0,0,0],b=0;for(let C of p)C.candidates[C.chosen]?.useHold&&b++;for(let C of d.filter(N=>N.side==="fly"))C.lines>=1&&A[C.lines-1]++;let T=A.reduce((C,N)=>C+N,0)||1;o(document.getElementById("an-lines"),[{label:"\uC2F1\uAE00",value:A[0]/T},{label:"\uB354\uBE14",value:A[1]/T},{label:"\uD2B8\uB9AC\uD50C",value:A[2]/T},{label:"\uD14C\uD2B8\uB9AC\uC2A4",value:A[3]/T,color:"#2887ee"}],{fmtV:C=>Be(C,0),note:`\uCD08\uD30C\uB9AC\uAC00 \uC9C0\uC6B4 \uC904 ${T-(T===1&&!A.some(Boolean)?1:0)}\uD68C \uAE30\uC900 \xB7 hold \uC0AC\uC6A9 ${p.length?Be(b/p.length,0):"\u2014"}`});let w=Al(p),y=i?.ranking?.trained??null,_=document.getElementById("an-summary"),E=(C,N,F,k)=>{let Q=z("div",{class:"card kpi"});return Q.append(z("div",{class:"label"},C),z("div",{class:"value"},N),z("div",{class:"sub"},`${F}${k?` \xB7 ${k}`:""}`)),Q};_.replaceChildren(E("\uAD50\uC0AC \uCD5C\uC120\uC744 \uACE0\uB978 \uBE44\uC728",w?Be(w.top1,1):"\u2014",`\uC624\uD504\uB77C\uC778 ${y?Be(y.top1,1):"\u2014"}`,`\uB0B4 \uB300\uC804 \uACB0\uC815 ${w?.decisions??0}\uAC1C`),E("\uC0C1\uB300 regret",w?ye(w.relRegret,3):"\u2014",`\uC624\uD504\uB77C\uC778 ${y?ye(y.relRegret,3):"\u2014"}`,"0 \uC774\uBA74 \uD56D\uC0C1 \uAD50\uC0AC \uCD5C\uC120"),E("\uACB0\uC815 \uB0B4 \uCF04\uB2EC \u03C4",w?.tau!=null?ye(w.tau,3):"\u2014",`\uC624\uD504\uB77C\uC778 ${y?ye(y.tau,3):"\u2014"}`,"\uBAA8\uB378 \uC21C\uC704 \u2194 \uAD50\uC0AC \uC21C\uC704"),E("\uD558\uC704 \uC808\uBC18\uC744 \uACE0\uB978 \uBE44\uC728",w?Be(w.bottomHalfRate,1):"\u2014",`\uC624\uD504\uB77C\uC778 ${y?Be(y.bottomHalfRate,1):"\u2014"}`,"\uB0AE\uC744\uC218\uB85D \uC88B\uC544\uC694"));let R=document.getElementById("an-foot"),P=d.filter(C=>C.side==="fly"),O=d.filter(C=>C.side==="human"),L=(C,N)=>{let F=C.map(k=>k[N]).sort((k,Q)=>k-Q);return F.length?F[F.length>>1]:null};R.innerHTML=`\uC774 \uD310: \uCD08\uD30C\uB9AC \uC870\uAC01 ${P.length} \xB7 \uAD6C\uBA4D \uC911\uC559\uAC12 ${L(P,"holes")??"\u2014"} \xB7 \uCD5C\uACE0 \uB192\uC774 \uC911\uC559\uAC12 ${L(P,"height")??"\u2014"} \xB7 \uC6B0\uBB3C \uAE4A\uC774 \uC911\uC559\uAC12 ${L(P,"well")??"\u2014"} / \uC0AC\uB78C \uC870\uAC01 ${O.length} \xB7 \uAD6C\uBA4D ${L(O,"holes")??"\u2014"} \xB7 \uB192\uC774 ${L(O,"height")??"\u2014"} \xB7 \uC6B0\uBB3C ${L(O,"well")??"\u2014"}.`+(y?` \uC624\uD504\uB77C\uC778 \uC2E4\uCE21(\uD14C\uC2A4\uD2B8 \uBD84\uD560 ${i.ranking.decisions} \uACB0\uC815)\uC740 \uAC19\uC740 \uC815\uC758\uB85C \uC7B0 \uAC12\uC774\uC5D0\uC694 \u2014 \uB300\uC804\uC740 \uD310\uB9C8\uB2E4 \uACB0\uC815 \uC218\uAC00 \uC801\uC5B4 \uAC12\uC774 \uD06C\uAC8C \uD754\uB4E4\uB824\uC694.`:"")}return n.addEventListener("change",()=>{s=Number(n.value),c()}),{render:c,refresh:c}}var or={human:"#2887ee",fly:"#141f2c",grid:"#e3e7ec",muted:"#6a7480",red:"#f03848"},Sv={human:["\uB0B4\uAC00 \uC774\uAE40","tag-green"],fly:["\uCD08\uD30C\uB9AC\uAC00 \uC774\uAE40","tag-red"]};function tp(){let i=document.getElementById("matches-body"),e=document.getElementById("matches-empty"),t=document.getElementById("matches-kpis"),n=document.getElementById("matches-list"),s=document.getElementById("matches-timeline"),r=document.getElementById("matches-timeline-card"),o=document.getElementById("matches-summary-card"),a=document.getElementById("matches-list-card"),c=null;document.getElementById("matches-clear")?.addEventListener("click",()=>{confirm("\uB300\uC804 \uAE30\uB85D\uC744 \uBAA8\uB450 \uC9C0\uC6B8\uAE4C\uC694? \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC5B4\uC694.")&&eu()});let l=(p,g,x)=>{let m=z("div",{class:"card kpi"});return m.append(z("div",{class:"label"},p),z("div",{class:"value"},g),z("div",{class:"sub"},x)),m};function h(p){s.replaceChildren();let g=p.timeline??[],x=Math.max(1,p.human?.pieces??1,p.fly?.pieces??1),m=640,f=54,M=24,A=26,b=56,T=14,w=M+f*2+A;s.setAttribute("viewBox",`0 0 ${m} ${w}`);let y=R=>b+R/x*(m-b-T),_=Math.max(1,...g.map(R=>R.sent??0)),E=we("g",{class:"axis"});for(let R=0;R<=4;R++){let P=Math.round(x*R/4);E.appendChild(we("line",{x1:y(P),x2:y(P),y1:M-6,y2:w-A})),E.appendChild(we("text",{x:y(P),y:w-10,"text-anchor":R===4?"end":"middle"},R===4?`${P} \uC870\uAC01`:`${P}`))}s.appendChild(E),[["human","\uC0AC\uB78C",0],["fly","\uCD08\uD30C\uB9AC",1]].forEach(([R,P,O])=>{let L=M+O*f;s.appendChild(we("text",{x:b-10,y:L+f/2+4,"text-anchor":"end",style:`fill:${R==="human"?or.human:or.fly};font-weight:600`},P)),s.appendChild(we("line",{x1:b,x2:m-T,y1:L+f-10,y2:L+f-10,stroke:or.grid,"stroke-width":1}));for(let C of g){if(C.side!==R||!(C.sent>0))continue;let N=6+C.sent/_*(f-22),F=we("rect",{x:y(C.at)-1.5,y:L+f-10-N,width:3,height:N,rx:1.5,fill:R==="human"?or.human:or.fly,opacity:.9});F.appendChild(we("title",{},`${P} ${C.at}\uBC88\uC9F8 \uC870\uAC01 \xB7 \uACF5\uACA9 ${C.sent}\uC904${C.tspin?" \xB7 T-\uC2A4\uD540":""}${C.combo>1?` \xB7 ${C.combo} \uCF64\uBCF4`:""}`)),s.appendChild(F)}}),s.appendChild(we("text",{x:b,y:14,style:`fill:${or.muted}`},`\uB9C9\uB300 \uD558\uB098\uAC00 \uBCF4\uB0B8 \uACF5\uACA9 \uD55C \uBC88 (\uB192\uC774 = \uC904 \uC218, \uCD5C\uB300 ${_}\uC904)`))}function u(){let p=Fn().matches.filter(x=>x.endedAt),g=document.createDocumentFragment();p.forEach((x,m)=>{m&&g.appendChild(z("div",{class:"divider"}));let f=z("button",{class:`list-row as-button${c===x.id?" on":""}`,type:"button"}),[M,A]=Sv[x.winner]??["\uBB34\uC2B9\uBD80","tag"],b=z("div",{class:`avatar${x.winner==="human"?" on":""}`},x.winner==="human"?"\uC2B9":x.winner==="fly"?"\uD328":"\uBB34"),T=z("div",{class:"main"});T.append(z("b",{},new Date(x.startedAt).toLocaleString("ko-KR",{dateStyle:"medium",timeStyle:"short"})),z("span",{class:"num"},`\uC870\uAC01 ${x.human?.pieces??0} vs ${x.fly?.pieces??0} \xB7 \uACF5\uACA9 ${x.human?.attack??0} vs ${x.fly?.attack??0} \xB7 \uACB0\uC815 \uAE30\uB85D ${hn(x.id).length}`));let w=z("div",{class:"end"});w.append(z("span",{class:`tag ${A}`},M),z("span",{class:"num"},x.think?`${x.think.median} ms/\uC218`:"\u2014")),f.append(b,T,w),f.addEventListener("click",()=>{c=x.id,d()}),g.appendChild(f)}),n.replaceChildren(g)}function d(){let p=co(),g=!!p;for(let m of[o,a,r])m&&(m.hidden=!g);if(e.hidden=g,!g){e.replaceChildren(Un({desc:"\uCD08\uD30C\uB9AC\uC640 \uD55C \uD310 \uB450\uBA74 \uC804\uC801\uACFC \uACF5\uACA9 \uC8FC\uACE0\uBC1B\uAE30\uAC00 \uC5EC\uAE30\uC5D0 \uC313\uC5EC\uC694. \uD310\uC744 \uACE0\uB974\uBA74 \uB2E4\uB978 \uD654\uBA74\uB4E4\uB3C4 \uADF8 \uD310\uC744 \uB530\uB77C\uAC00\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uAE30\uB85D\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uB0A8\uC544\uC694 (\uCD5C\uADFC 20\uD310)"}));return}t.replaceChildren(l("\uC804\uC801",`${p.wins}\uC2B9 ${p.losses}\uD328${p.draws?` ${p.draws}\uBB34`:""}`,`${p.games}\uD310 \xB7 \uAE30\uB85D\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uB0A8\uC544\uC694`),l("\uC870\uAC01 \uC911\uC559\uAC12",`${p.humanPiecesMedian??0} vs ${p.flyPiecesMedian??0}`,"\uC67C\uCABD\uC774 \uB098, \uC624\uB978\uCABD\uC774 \uCD08\uD30C\uB9AC\uC608\uC694"),l("\uACF5\uACA9 \uC911\uC559\uAC12",`${p.humanAttackMedian??0} vs ${p.flyAttackMedian??0}`,`\uD569\uACC4 ${p.humanAttack} vs ${p.flyAttack}\uC904`),l("\uCD08\uD30C\uB9AC \uC0DD\uAC01 \uC2DC\uAC04",p.thinkMedian!==null?`${p.thinkMedian} ms`:"\u2014","\uD55C \uC218\uB97C \uACE0\uB974\uB294 \uB370 \uAC78\uB9B0 \uC2DC\uAC04\uC758 \uC911\uC559\uAC12")),(!c||!Fn().matches.some(m=>m.id===c&&m.endedAt))&&(c=Fn().matches.find(m=>m.endedAt)?.id??null),u();let x=Fn().matches.find(m=>m.id===c);if(x){h(x);let m=Al(hn(x.id)),f=document.getElementById("matches-timeline-foot"),M=x.winner==="human"?"\uCD08\uD30C\uB9AC\uAC00 \uD0D1\uC544\uC6C3\uD588\uC5B4\uC694":x.winner==="fly"?"\uB0B4\uAC00 \uD0D1\uC544\uC6C3\uD588\uC5B4\uC694":x.reason??"";f.innerHTML=`${new Date(x.startedAt).toLocaleString("ko-KR",{dateStyle:"medium",timeStyle:"short"})} \xB7 ${M} \xB7 \uB0B4 \uC904 ${x.human?.lines??0}(\uD14C\uD2B8\uB9AC\uC2A4 ${x.human?.tetris??0}) \xB7 \uCD08\uD30C\uB9AC \uC904 ${x.fly?.lines??0}(\uD14C\uD2B8\uB9AC\uC2A4 ${x.fly?.tetris??0}) \xB7 \uBC1B\uC740 \uAC00\uBE44\uC9C0 ${x.human?.garbageReceived??0} vs ${x.fly?.garbageReceived??0}`+(m?` \xB7 \uC774 \uD310\uC758 \uCD08\uD30C\uB9AC \uACB0\uC815 ${m.decisions}\uAC1C: \uAD50\uC0AC \uCD5C\uC120 \uC120\uD0DD ${(m.top1*100).toFixed(0)}% \xB7 \uC0C1\uB300 regret ${ye(m.relRegret,3)}`:"")}}return{render:d,refresh:d,select(p){c=p,d()}}}function Ev(i){let e=i>>>0^2654435769,t=new Uint32Array(4);for(let n=0;n<4;n++){e=e+2654435769>>>0;let s=e;s=Math.imul(s^s>>>16,2246822507)>>>0,s=Math.imul(s^s>>>13,3266489909)>>>0,t[n]=(s^s>>>16)>>>0}return t.every(n=>n===0)&&(t[0]=1),t}function Jn(i=1){let e=Ev(i),t=e[0],n=e[1],s=e[2],r=e[3];function o(){let a=n+r>>>0,c=a<n?1:0,l=t+s+c>>>0,h=t,u=n,d=s,p=r;return t=d,n=p,h=(h^(h<<23|u>>>9))>>>0,u=(u^u<<23)>>>0,u=(u^(u>>>18|h<<14))>>>0,h=(h^h>>>18)>>>0,h=(h^d)>>>0,u=(u^p)>>>0,u=(u^(p>>>5|d<<27))>>>0,h=(h^d>>>5)>>>0,s=h,r=u,(l*2097152+(a>>>11))/9007199254740992}return{next:o,int:a=>Math.floor(o()*a),uniform:(a,c)=>a+(c-a)*o(),shuffle(a){for(let c=a.length-1;c>0;c--){let l=Math.floor(o()*(c+1)),h=a[c];a[c]=a[l],a[l]=h}return a}}}var ke=10,_t=20,go=ke*_t,wv=4,Tv=ke*wv,On=["I","O","T","S","Z","J","L"],np={I:[`....
XXXX
....
....`,`..X.
..X.
..X.
..X.`,`....
....
XXXX
....`,`.X..
.X..
.X..
.X..`],O:[`XX
XX`,`XX
XX`,`XX
XX`,`XX
XX`],T:[`.X.
XXX
...`,`.X.
.XX
.X.`,`...
XXX
.X.`,`.X.
XX.
.X.`],S:[`.XX
XX.
...`,`.X.
.XX
..X`,`...
.XX
XX.`,`X..
XX.
.X.`],Z:[`XX.
.XX
...`,`..X
.XX
.X.`,`...
XX.
.XX`,`.X.
XX.
X..`],J:[`X..
XXX
...`,`.XX
.X.
.X.`,`...
XXX
..X`,`.X.
.X.
XX.`],L:[`..X
XXX
...`,`.X.
.X.
.XX`,`...
XXX
X..`,`XX.
.X.
.X.`]};function Av(i){let e=i.split(`
`),t=[];e.forEach((l,h)=>[...l].forEach((u,d)=>{u==="X"&&t.push([d,h])}));let n=Math.min(...t.map(l=>l[0])),s=Math.min(...t.map(l=>l[1])),r=t.map(([l,h])=>[l-n,h-s]).sort((l,h)=>l[1]-h[1]||l[0]-h[0]),o=Math.max(...r.map(l=>l[0]))+1,a=Math.max(...r.map(l=>l[1]))+1,c=new Array(o).fill(-1);for(let[l,h]of r)c[l]=Math.max(c[l],h);return{cells:r,w:o,h:a,bottom:c}}var pi=On.map(i=>np[i].map(Av));function nu(){return new Uint8Array(go)}function ip(i,e){for(let t=0;t<_t;t++)if(i[t*ke+e])return t;return _t}function Cv(i,e,t,n){let s=pi[e][n&3];if(t<0||t+s.w>ke)return null;let r=_t;for(let o=0;o<s.w;o++){let a=ip(i,t+o)-1-s.bottom[o];a<r&&(r=a)}return r}function Pl(i,e,t,n,s){let r=pi[e][n&3];if(s===void 0&&(s=Cv(i,e,t,n)),s===null)throw new RangeError(`placement out of bounds: piece ${On[e]} col ${t} rot ${n}`);if(s<0)return{board:new Uint8Array(i),linesCleared:0,gameOver:!0,landingRow:s,erodedPieceCells:0};let o=new Uint8Array(i);for(let[u,d]of r.cells)o[(s+d)*ke+t+u]=1;let a=new Set(r.cells.map(([,u])=>s+u)),c=0,l=0,h=_t-1;for(let u=_t-1;u>=0;u--){let d=!0;for(let p=0;p<ke;p++)if(!o[u*ke+p]){d=!1;break}if(d){c++,a.has(u)&&(l+=r.cells.filter(([,p])=>s+p===u).length);continue}h!==u&&o.copyWithin(h*ke,u*ke,(u+1)*ke),h--}return h>=0&&o.fill(0,0,(h+1)*ke),{board:o,linesCleared:c,gameOver:!1,landingRow:s,erodedPieceCells:l}}var Rv=5,Iv=8,Pv=[0,0,1,2,4],Lv=[0,2,4,6],Dv=10,tu=[[2,0],[4,1],[6,2],[10,3],[1/0,4]];function Nv(i){if(i<=0)return 0;for(let[e,t]of tu)if(i<=e)return t;return tu[tu.length-1][1]}function Uv(i){let e=i.split(`
`),t=[];return e.forEach((n,s)=>[...n].forEach((r,o)=>{r==="X"&&t.push([o,s])})),{cells:t,size:e.length,minX:Math.min(...t.map(n=>n[0])),minY:Math.min(...t.map(n=>n[1]))}}var iu=On.map(i=>np[i].map(Uv)),Fv={"0>1":[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],"1>0":[[0,0],[1,0],[1,1],[0,-2],[1,-2]],"1>2":[[0,0],[1,0],[1,1],[0,-2],[1,-2]],"2>1":[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],"2>3":[[0,0],[1,0],[1,-1],[0,2],[1,2]],"3>2":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"3>0":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"0>3":[[0,0],[1,0],[1,-1],[0,2],[1,2]]},Ov={"0>1":[[0,0],[-2,0],[1,0],[-2,1],[1,-2]],"1>0":[[0,0],[2,0],[-1,0],[2,-1],[-1,2]],"1>2":[[0,0],[-1,0],[2,0],[-1,-2],[2,1]],"2>1":[[0,0],[1,0],[-2,0],[1,2],[-2,-1]],"2>3":[[0,0],[2,0],[-1,0],[2,-1],[-1,2]],"3>2":[[0,0],[-2,0],[1,0],[-2,1],[1,-2]],"3>0":[[0,0],[1,0],[-2,0],[1,2],[-2,-1]],"0>3":[[0,0],[-1,0],[2,0],[-1,-2],[2,1]]},Bv=(i,e,t)=>(On[i]==="I"?Ov:Fv)[`${e}>${t}`],kv=On.indexOf("T"),sp=On.indexOf("O"),zv=2;function rp(i){let e=new Int32Array(ke);for(let t=0;t<ke;t++)e[t]=ip(i,t);return e}function op(i){let e=rp(i);return Array.from(e,t=>_t-t)}function Hv(i){let e=iu[i][0],t=Math.max(...e.cells.map(n=>n[1]));return{bx:Math.floor((ke-e.size)/2),by:-(t+1)}}var fs=On.map((i,e)=>iu[e].map(t=>({xs:Int8Array.from(t.cells.map(n=>n[0])),ys:Int8Array.from(t.cells.map(n=>n[1])),minX:t.minX,maxX:Math.max(...t.cells.map(n=>n[0])),minY:t.minY,maxY:Math.max(...t.cells.map(n=>n[1])),size:t.size}))),Vv=On.map((i,e)=>Array.from({length:16},(t,n)=>{let s=n>>2,r=n&3;return(r===(s+1)%4||r===(s+3)%4)&&e!==sp?Bv(e,s,r):null}));function mo(i,e,t,n){let{xs:s,ys:r}=e;for(let o=0;o<4;o++){let a=t+s[o],c=n+r[o];if(a<0||a>=ke||c<-zv||c>=_t||c>=0&&i[c*ke+a])return!1}return!0}function Gv(i,e,t,n,s,{spin:r,kick5:o=!1}){if(e!==kv||!r)return null;let a=iu[e][n&3],c=t-a.minX,l=s-a.minY,h=(f,M)=>f<0||f>=ke||M>=_t||M>=0&&i[M*ke+f]===1,u=h(c,l),d=h(c+2,l),p=h(c,l+2),g=h(c+2,l+2);if(u+d+p+g<3)return null;let m=[[u,d],[d,g],[p,g],[u,p]][n&3];return m[0]&&m[1]||o?"full":"mini"}function Wv(i,e,t){if(e<=0)return{board:new Uint8Array(i),toppedOut:!1};let n=new Uint8Array(go),s=!1;for(let r=0;r<e*ke;r++)if(i[r]){s=!0;break}n.set(i.subarray(e*ke),0);for(let r=_t-e;r<_t;r++)for(let o=0;o<ke;o++)n[r*ke+o]=o===t?0:1;return{board:n,toppedOut:s}}var po=new Map;function ap(i){if(po.has(i))return po.get(i);po.size>=512&&po.clear();let e=Jn(i),t=[],n={seed:i,at(s){for(;t.length<=s;){let r=e.shuffle([0,1,2,3,4,5,6]);for(;r.length;)t.push(r.pop())}return t[s]}};return po.set(i,n),n}function _o(i){let e=ap(i);return{seed:i,seq:e,drawn:1,current:e.at(0),hold:null,holdUsed:!1,board:nu(),garbage:[],combo:0,pieces:0,dead:!1,stats:{attack:0,sent:0,cancelled:0,lines:0,tetris:0,tspin:0,tspinMini:0,perfectClear:0,garbageReceived:0,maxCombo:0,holds:0}}}var Ll=(i,e=Rv)=>Array.from({length:e},(t,n)=>i.seq.at(i.drawn+n)),xo=i=>i.garbage.reduce((e,t)=>e+t.lines,0),su=i=>i.hold===null?i.seq.at(i.drawn):i.hold;function ru(i){if(i.holdUsed)throw new Error("hold already used for this placement");return i.hold===null?{...i,hold:i.current,current:i.seq.at(i.drawn),drawn:i.drawn+1,holdUsed:!0,stats:{...i.stats,holds:i.stats.holds+1}}:{...i,hold:i.current,current:i.hold,holdUsed:!0,stats:{...i.stats,holds:i.stats.holds+1}}}function ou(i,e,t){if(e<=0)return i;if(!(t>=0&&t<ke))throw new RangeError(`garbage hole out of range: ${t}`);return{...i,garbage:[...i.garbage,{lines:e,hole:t}]}}function au(i,{col:e,rot:t,top:n,spin:s=!1,kick5:r=!1}){if(i.dead)throw new Error("player is dead");let o=i.current,a=Pl(i.board,o,e,t,n),c=a.landingRow,l={piece:o,col:e,rot:t,top:c,spin:s,landingRow:c,erodedPieceCells:a.erodedPieceCells};if(a.gameOver)return{player:{...i,dead:!0,holdUsed:!1},event:{...l,linesCleared:0,tspin:null,perfectClear:!1,combo:0,attack:0,sent:0,cancelled:0,garbageInserted:0,toppedOut:!0,board:a.board}};let h=Gv(i.board,o,e,t,c,{spin:s,kick5:r}),u=a.linesCleared,d=u>0?i.combo+1:0,p=!1;if(u>0){p=!0;for(let y=0;y<go;y++)if(a.board[y]){p=!1;break}}let g=0;u>0&&(g=(h==="full"?Lv[u]:Pv[u])+Nv(d)+(p?Dv:0));let x=i.garbage,m=g,f=0;if(g>0&&x.length){let y=g;x=[];for(let _ of i.garbage)y>=_.lines?(y-=_.lines,f+=_.lines):y>0?(x.push({lines:_.lines-y,hole:_.hole}),f+=y,y=0):x.push(_);m=y}let M=a.board,A=0,b=!1;if(u===0&&x.length){let y=Iv,_=[];for(let E of x){if(y<=0){_.push(E);continue}let R=Math.min(y,E.lines),P=Wv(M,R,E.hole);M=P.board,b=b||P.toppedOut,A+=R,y-=R,R<E.lines&&_.push({lines:E.lines-R,hole:E.hole})}x=_}let T={...i.stats,attack:i.stats.attack+g,sent:i.stats.sent+m,cancelled:i.stats.cancelled+f,lines:i.stats.lines+u,tetris:i.stats.tetris+(u===4?1:0),tspin:i.stats.tspin+(h==="full"&&u>0?1:0),tspinMini:i.stats.tspinMini+(h==="mini"&&u>0?1:0),perfectClear:i.stats.perfectClear+(p?1:0),garbageReceived:i.stats.garbageReceived+A,maxCombo:Math.max(i.stats.maxCombo,d)};return{player:{...i,board:M,garbage:x,combo:d,holdUsed:!1,pieces:i.pieces+1,dead:b,stats:T,current:i.seq.at(i.drawn),drawn:i.drawn+1},event:{...l,linesCleared:u,tspin:h,perfectClear:p,combo:d,attack:g,sent:m,cancelled:f,garbageInserted:A,toppedOut:b,board:a.board}}}function Dl(i,e){let t=e.useHold?ru(i):i;return au(t,e)}function ar(i,e,t,n,s){return mo(i,fs[e][t&3],n,s)}function lp(i,e,t,n){let s=fs[i][e&3],r=[];for(let o=0;o<4;o++)r.push([t+s.xs[o],n+s.ys[o]]);return r}function Nl(i,e,t,n){let s=fs[i][e&3];return{col:t+s.minX,rot:e&3,top:n+s.minY,lockOut:n+s.minY<0}}function lu(i,e,t,n,s){return!mo(i,fs[e][t&3],n,s+1)}function yo(i,e,t,n,s){let r=fs[e][t&3],o=s;for(;mo(i,r,n,o+1);)o++;return o}function Ul(i,e,t,n,s,r){let o=t&3,a=n&3;if(e===sp)return{rot:o,bx:s,by:r,kick5:!1,kick:0};if(o===a)return{rot:o,bx:s,by:r,kick5:!1,kick:0};let c=Vv[e][o<<2|a];if(!c)return mo(i,fs[e][a],s,r)?{rot:a,bx:s,by:r,kick5:!1,kick:0}:null;let l=fs[e][a];for(let h=0;h<c.length;h++){let u=s+c[h][0],d=r+c[h][1];if(mo(i,l,u,d))return{rot:a,bx:u,by:d,kick5:h===4,kick:h}}return null}function Fl(i,e){let{bx:t,by:n}=Hv(e);return ar(i,e,0,t,n)?{rot:0,bx:t,by:n}:null}var vo={gravityMs:800,softDropMs:12,dasMs:120,arrMs:12,lockDelayMs:500,lockResets:15},bo={left:!1,right:!1,softDrop:!1,hardDrop:!1,cw:!1,ccw:!1,flip:!1,hold:!1};function kl(i,e,t=null){let n=Fl(i,e);return n?{piece:e,rot:n.rot,bx:n.bx,by:n.by,lockMs:0,resets:0,gravMs:0,repeatMs:t?.repeatMs??0,dasDir:t?.dasDir??0,dasMs:t?.dasMs??0,lowestBy:n.by,spin:!1,kick5:!1,prev:{...bo,...t?.prev??{}}}:null}var hu=(i,e)=>({prev:{...bo,...e??i?.prev??{}},dasDir:i?.dasDir??0,dasMs:i?.dasMs??0,repeatMs:i?.repeatMs??0}),Ol=(i,e,t,n)=>ar(e,i.piece,i.rot,i.bx+t,i.by+n)?(i.bx+=t,i.by+=n,!0):!1,cu=(i,e,t)=>{let n=Ul(e,i.piece,i.rot,t,i.bx,i.by);return!n||n.rot===i.rot&&n.bx===i.bx&&n.by===i.by?!1:(i.rot=n.rot,i.bx=n.bx,i.by=n.by,i.kick5=n.kick5,!0)};function Bl(i,e,t,n){i.spin=n,n||(i.kick5=!1),i.by>i.lowestBy&&(i.lowestBy=i.by,i.resets=0),lu(e,i.piece,i.rot,i.bx,i.by)&&i.resets<t.lockResets&&(i.lockMs=0,i.resets++)}function cp(i){let e=Nl(i.piece,i.rot,i.bx,i.by);return{col:e.col,rot:e.rot,top:e.top,spin:i.spin,kick5:i.kick5,lockOut:e.lockOut}}function hp(i,e,t,n,s=vo){let r={...bo,...n},o=i.prev,a=!1,c=!1,l=r.hold&&!o.hold;r.cw&&!o.cw?c=cu(i,e,i.rot+1&3)||c:r.ccw&&!o.ccw?c=cu(i,e,i.rot+3&3)||c:r.flip&&!o.flip&&(c=cu(i,e,i.rot+2&3)||c),c&&Bl(i,e,s,!0);let h=r.left&&!r.right?-1:r.right&&!r.left?1:0;if(h===0)i.dasDir=0,i.dasMs=0,i.repeatMs=0;else if(i.dasDir!==h)i.dasDir=h,i.dasMs=0,i.repeatMs=0,Ol(i,e,h,0)&&(a=!0,Bl(i,e,s,!1));else if(i.dasMs+=t,i.dasMs>=s.dasMs)if(s.arrMs<=0){for(;Ol(i,e,h,0);)a=!0;a&&Bl(i,e,s,!1)}else for(i.repeatMs+=t;i.repeatMs>=s.arrMs&&(i.repeatMs-=s.arrMs,Ol(i,e,h,0));)a=!0,Bl(i,e,s,!1);if(r.hardDrop&&!o.hardDrop){let g=yo(e,i.piece,i.rot,i.bx,i.by);return g!==i.by&&(i.by=g,i.spin=!1,i.kick5=!1),i.prev=r,{lock:cp(i),holdRequest:!1,moved:!0,rotated:c,hardDrop:!0}}let u=r.softDrop?s.softDropMs:s.gravityMs,d=!1;for(i.gravMs+=t;i.gravMs>=u;)if(i.gravMs-=u,Ol(i,e,0,1))a=!0,d=!0,i.spin=!1,i.kick5=!1,i.by>i.lowestBy&&(i.lowestBy=i.by,i.resets=0);else{i.gravMs=0;break}let p=null;return lu(e,i.piece,i.rot,i.bx,i.by)?(d?i.lockMs=0:i.lockMs+=t,i.lockMs>=s.lockDelayMs&&(p=cp(i))):i.lockMs=0,i.prev=r,{lock:p,holdRequest:l,moved:a,rotated:c,hardDrop:!1}}var up=(i,e)=>yo(e,i.piece,i.rot,i.bx,i.by);function fp({seedHuman:i=1,seedFly:e=1,garbageSeed:t=7,tuning:n=vo,cap:s=2e3}={}){let r=_o(i),o=_o(e);return{rng:Jn(t),tuning:n,cap:s,human:{player:r,k:kl(r.board,r.current),lastEvent:null,pieces:0,keys:null},fly:{player:o,k:null,lastEvent:null,pieces:0},over:!1,winner:null,reason:null,log:[]}}var dp=i=>i==="human"?"fly":"human";function zl(i,e,t){i.over=!0,i.winner=e,i.reason=t}function pp(i,e,t,n){let s=i[e];if(s.player=t,s.lastEvent=n,s.pieces++,n.sent>0){let r=i[dp(e)];r.player=ou(r.player,n.sent,i.rng.int(ke))}return i.log.push({side:e,sent:n.sent,cancelled:n.cancelled,lines:n.linesCleared,tspin:n.tspin,combo:n.combo,at:i[e].pieces}),i.log.length>40&&i.log.shift(),t.dead||n.toppedOut?(zl(i,dp(e),`${e} \uD0D1\uC544\uC6C3`),!0):s.pieces>=i.cap?(zl(i,null,"\uC870\uAC01 \uC0C1\uD55C"),!0):!1}function mp(i,e,t){if(i.over)return{locked:!1,held:!1,event:null};let n=i.human;if(!n.k)return zl(i,"fly","human \uC2A4\uD3F0 \uBD88\uAC00"),{locked:!1,held:!1,event:null};n.keys=t;let s=hp(n.k,n.player.board,e,t,i.tuning);if(s.holdRequest&&!n.player.holdUsed){let l=hu(n.k,t);return n.player=ru(n.player),n.k=kl(n.player.board,n.player.current,l),{locked:!1,held:!0,event:null}}if(!s.lock)return{locked:!1,held:!1,event:null};let{player:r,event:o}=au(n.player,{col:s.lock.col,rot:s.lock.rot,top:s.lock.top,spin:s.lock.spin,kick5:s.lock.kick5}),a=hu(n.k,t),c=pp(i,"human",r,o);return n.k=c?null:kl(r.board,r.current,a),{locked:!0,held:!1,event:o}}function gp(i){let e=i.fly.player;return{board:Uint8Array.from(e.board),current:e.current,hold:e.hold,holdUsed:e.holdUsed,seed:e.seed,drawn:e.drawn,combo:e.combo,pieces:e.pieces,dead:e.dead,garbage:e.garbage.map(t=>({...t})),stats:{...e.stats},next:Ll(e,5),pending:xo(e)}}function _p(i,e){if(i.over)return null;if(!e)return zl(i,"human","fly \uB193\uC744 \uC790\uB9AC \uC5C6\uC74C"),null;let{player:t,event:n}=Dl(i.fly.player,e);return pp(i,"fly",t,n),n}function xp(i,e){let t=i[e],n=t.player,s={board:n.board,current:n.current,hold:n.hold,holdUsed:n.holdUsed,next:Ll(n,5),pending:xo(n),stats:n.stats,combo:n.combo,pieces:t.pieces,dead:n.dead,piece:null,ghost:null};return e==="human"&&t.k&&(s.piece={piece:t.k.piece,rot:t.k.rot,bx:t.k.bx,by:t.k.by},s.ghost={piece:t.k.piece,rot:t.k.rot,bx:t.k.bx,by:up(t.k,n.board)}),s}function yp(i,e,t,n){return pi[i][e].cells.map(([r,o])=>(n+o)*ke+t+r).sort((r,o)=>r-o).reduce((r,o)=>r*256+o+32,0)}function vp(i,e,{useHold:t=!1,col:n,rot:s,top:r}){let o=Fl(i,e);if(!o)return null;let a=yp(e,s,n,r),c=u=>(u.rot*64+u.bx+16)*64+u.by+16,l=new Map([[c(o),null]]),h=[o];for(let u=0;u<h.length;u++){let d=h[u],p=yo(i,e,d.rot,d.bx,d.by),g=Nl(e,d.rot,d.bx,p);if(!g.lockOut&&yp(e,g.rot,g.col,g.top)===a){let m=["hardDrop"];for(let f=c(d);l.get(f);f=c(l.get(f)[0]))m.unshift(l.get(f)[1]);return t&&m.unshift("hold"),m}let x=(m,f)=>{let M=c(m);l.has(M)||(l.set(M,[d,f]),h.push(m))};for(let[m,f]of[[d.rot+1&3,"cw"],[d.rot+3&3,"ccw"]]){let M=Ul(i,e,d.rot,m,d.bx,d.by);M&&(M.rot!==d.rot||M.bx!==d.bx||M.by!==d.by)&&x({rot:M.rot,bx:M.bx,by:M.by},f)}ar(i,e,d.rot,d.bx-1,d.by)&&x({...d,bx:d.bx-1},"left"),ar(i,e,d.rot,d.bx+1,d.by)&&x({...d,bx:d.bx+1},"right"),p>d.by&&x({...d,by:p},"softDrop"),p>d.by+1&&x({...d,by:d.by+1},"down")}return null}var bp=["oklch(0.700 0.130 205)","oklch(0.840 0.171 87)","oklch(0.624 0.176 300)","oklch(0.600 0.150 154)","oklch(0.628 0.218 22)","oklch(0.624 0.176 254)","oklch(0.748 0.183 56)"],Xv="oklch(0.957 0.005 247)",$v="oklch(0.913 0.008 247)",qv="oklch(0.752 0.016 251)",Yv="oklch(0.978 0.003 247)",mi=2,Hl=_t+mi,Kv=i=>({width:ke*i,height:Hl*i});function uu(i,{cell:e=30}={}){let t=Kv(e),n=Math.min(2,globalThis.devicePixelRatio||1);i.width=Math.round(t.width*n),i.height=Math.round(t.height*n),i.style.width=`${t.width}px`,i.style.height=`${t.height}px`;let s=i.getContext("2d");s.scale(n,n);let r=l=>(l+mi)*e,o=Math.max(2,Math.round(e*.12)),a=(l,h,u,d=1)=>{s.globalAlpha=d,s.fillStyle=u,s.beginPath(),s.roundRect(l*e+1,r(h)+1,e-2,e-2,o),s.fill(),s.globalAlpha=1};function c(l){s.fillStyle=Yv,s.fillRect(0,0,t.width,mi*e),s.fillStyle=Xv,s.fillRect(0,mi*e,t.width,_t*e),s.strokeStyle=$v,s.lineWidth=1,s.beginPath();for(let u=1;u<ke;u++)s.moveTo(u*e+.5,0),s.lineTo(u*e+.5,t.height);for(let u=1;u<Hl;u++)s.moveTo(0,u*e+.5),s.lineTo(t.width,u*e+.5);s.stroke(),s.strokeStyle="oklch(0.840 0.012 248)",s.beginPath(),s.moveTo(0,mi*e+.5),s.lineTo(t.width,mi*e+.5),s.stroke();for(let u=0;u<_t;u++)for(let d=0;d<ke;d++)l.board[u*ke+d]&&a(d,u,qv);let h=(u,d)=>{for(let[p,g]of lp(u.piece,u.rot,u.bx,u.by))g>=-mi&&g<_t&&p>=0&&p<ke&&a(p,g,bp[u.piece],d)};l.ghost&&h(l.ghost,.2),l.piece&&h(l.piece,1)}return{draw:c,size:t,cell:e}}function du(i,e,t){let n=e[i][0],s=document.createElement("div");s.className="vs-mini",s.style.gridTemplateColumns=`repeat(${n.w}, ${t}px)`,s.style.gridTemplateRows=`repeat(${n.h}, ${t}px)`;let r=new Set(n.cells.map(([o,a])=>a*n.w+o));for(let o=0;o<n.w*n.h;o++){let a=document.createElement("div");r.has(o)&&(a.style.background=bp[i]),s.appendChild(a)}return s}var Vl={landingHeight:-4.500158825082766,erodedPieceCells:3.4181268101392694,rowTransitions:-3.2178882868487753,columnTransitions:-9.348695305445199,holes:-7.899265427351652,cumulativeWells:-3.3855972247263626};var Sp=["landingHeight","erodedPieceCells","rowTransitions","columnTransitions","holes","cumulativeWells"],tb={ceilingFrac:.05,topSpikeShare:.3,dnActive:40,medianRateHz:[.5,40]};var qw={saturatedFrac:.05,dnActive:tb.dnActive,cosineSeparation:.01};var tT=Sp.map(i=>Vl[i]);var nb=["landingHeight","erodedPieceCells","attackSent","comboState"],ib=["rowTransitions","columnTransitions","holes","cumulativeWells","wellDepth","tspinSetup","garbageQueueHeight"],sb=[...nb,...ib];var rb=4,yT={weights:{landingHeight:-1.5,erodedPieceCells:Vl.erodedPieceCells,rowTransitions:-2,columnTransitions:-6,holes:-10,cumulativeWells:-.3,attackSent:15,comboState:.5,wellDepth:25,tspinSetup:3,garbageQueueHeight:-1.5},dangerHeight:13};function Ep(i){return ob(op(i))}function ob(i){let e=1/0,t=1/0,n=-1;for(let r=0;r<ke;r++)i[r]<e?(t=e,e=i[r],n=r):i[r]<t&&(t=i[r]);let s=0;for(let r=0;r<ke;r++){let a=(r===n?t:e)-i[r];a>s&&(s=a)}return Math.min(rb,s)}var ab=new Int32Array(_t);function wp(i){let e=0,t=0,n=0,s=0,r=new Int32Array(ke),o=ab;for(let a=0;a<ke;a++){let c=0,l=!1;for(let u=0;u<_t;u++){let d=i[u*ke+a];d!==c&&t++,c=d,d?l||(l=!0,r[a]=_t-u):l&&n++}c!==1&&t++;let h=0;for(let u=_t-1;u>=0;u--)h=i[u*ke+a]?0:h+1,o[u]=h;for(let u=0;u<_t;u++){if(i[u*ke+a])continue;let d=a===0?1:i[u*ke+a-1],p=a===ke-1?1:i[u*ke+a+1];d&&p&&(s+=o[u])}}for(let a=0;a<_t;a++){let c=1,l=a*ke;for(let h=0;h<ke;h++){let u=i[l+h];u!==c&&e++,c=u}c!==1&&e++}return{rowTransitions:e,columnTransitions:t,holes:n,cumulativeWells:s,heights:r}}var vT=sb.length+1;var Tp="fly.settings.v2",lb="fly.settings.v1",cb=matchMedia("(prefers-reduced-motion: reduce)").matches,hb={autoRotate:!cb,darkViz:!1,grayOverlap:!0,tabular:!1},ub={gravityMs:800,softDropMs:12,dasMs:120,arrMs:12},lr={...hb,...ub},Ap={gravityMs:{label:"\uC911\uB825",desc:"\uD55C \uCE78 \uC790\uB3D9\uC73C\uB85C \uB0B4\uB824\uAC00\uB294 \uC8FC\uAE30",min:100,max:1500,step:50},softDropMs:{label:"\uC18C\uD504\uD2B8\uB4DC\uB86D",desc:"\u2193 \uB97C \uB204\uB974\uACE0 \uC788\uC744 \uB54C \uD55C \uCE78 \uC8FC\uAE30",min:4,max:60,step:2},dasMs:{label:"DAS",desc:"\uC88C\uC6B0\uB97C \uB204\uB974\uACE0 \uC790\uB3D9 \uBC18\uBCF5\uC774 \uC2DC\uC791\uB418\uAE30\uAE4C\uC9C0",min:40,max:220,step:10},arrMs:{label:"ARR",desc:"\uC790\uB3D9 \uBC18\uBCF5 \uC8FC\uAE30 (0 \uC774\uBA74 \uC989\uC2DC \uBCBD\uAE4C\uC9C0)",min:0,max:80,step:1}},Cp=[[["\u2190","\u2192"],"\uC774\uB3D9"],[["\u2193"],"\uC18C\uD504\uD2B8\uB4DC\uB86D"],[["Space"],"\uD558\uB4DC\uB4DC\uB86D"],[["\u2191","X"],"\uD68C\uC804"],[["Z"],"\uBC18\uB300 \uD68C\uC804"],[["A"],"180\xB0"],[["C","Shift"],"\uD640\uB4DC"],[["P"],"\uC77C\uC2DC\uC815\uC9C0"],[["R"],"\uB9AC\uB9E4\uCE58"]];function db(){try{let i=JSON.parse(localStorage.getItem(Tp)??"null");if(i)return{...lr,...i};let e=JSON.parse(localStorage.getItem(lb)??"null");return{...lr,...e??{}}}catch{return{...lr}}}var fu=i=>{try{localStorage.setItem(Tp,JSON.stringify(i))}catch{}};function Rp(i){let e=db(),t=[...document.querySelectorAll("[data-setting]")],n=[...document.querySelectorAll("[data-tune]")],s=()=>{for(let r of t)r.checked=!!e[r.dataset.setting];for(let r of n){r.value=String(e[r.dataset.tune]);let o=document.getElementById(`${r.dataset.tune}-out`);o&&(o.textContent=`${e[r.dataset.tune]} ms`)}document.body.classList.toggle("tabular",!!e.tabular)};for(let r of t)r.addEventListener("change",()=>{e[r.dataset.setting]=r.checked,fu(e),s(),i?.(r.dataset.setting,r.checked,e)});for(let r of n)r.addEventListener("input",()=>{let o=Number(r.value);e[r.dataset.tune]=o;let a=document.getElementById(`${r.dataset.tune}-out`);a&&(a.textContent=`${o} ms`),fu(e),i?.(r.dataset.tune,o,e)});document.getElementById("settings-reset")?.addEventListener("click",()=>{Object.assign(e,lr),fu(e),s();for(let r of Object.keys(lr))i?.(r,e[r],e)}),s();for(let r of Object.keys(lr))i?.(r,e[r],e);return e}var Ip=i=>({gravityMs:i.gravityMs,softDropMs:i.softDropMs,dasMs:i.dasMs,arrMs:i.arrMs});var fb=matchMedia("(prefers-reduced-motion: reduce)").matches,Mo=new W(.75,.5,.75).normalize(),pb=.92,mb=90,gb=160;function Pp(i,{url:e}){let t;try{t=new ls({canvas:i,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{return null}t.setPixelRatio(Math.min(devicePixelRatio,2));let n=new Ai,s=new Et(30,1,.1,50);n.add(new Li(16777215,1.1));let r=new $n(16777215,1.6);r.position.set(3,4,2),n.add(r);let o=new In({color:8884636,roughness:.6,metalness:.05}),a=null,c=null,l=0;new hs().load(e,g=>{g.scene.traverse(x=>{x.isMesh&&(x.material=o,x.frustumCulled=!1)}),n.add(g.scene),a=new Wr(g.scene);for(let x of g.animations)a.clipAction(x).play();a.update(0),g.scene.updateMatrixWorld(!0),c=new Qt().setFromObject(g.scene),p()},void 0,g=>console.warn("\uB300\uC804 \uCD08\uD30C\uB9AC \uBAA8\uB378\uC744 \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694",g));let h=new W().crossVectors(new W(0,1,0),Mo).normalize(),u=new W().crossVectors(Mo,h);function d(){let g=Math.tan(rs.degToRad(s.fov/2))*pb,x=g*s.aspect,m=[];for(let M=0;M<8;M++)m.push(new W(M&1?c.max.x:c.min.x,M&2?c.max.y:c.min.y,M&4?c.max.z:c.min.z));let f=c.getCenter(new W);for(let M=0;M<2;M++){let A=0,b=m.map(E=>{let R=E.clone().sub(f);return[R.dot(h),R.dot(u),R.dot(Mo)]});for(let[E,R,P]of b)A=Math.max(A,Math.abs(E)/x+P,Math.abs(R)/g+P);let T=1/0,w=-1/0,y=1/0,_=-1/0;for(let[E,R,P]of b){let O=E/(A-P),L=R/(A-P);T=Math.min(T,O),w=Math.max(w,O),y=Math.min(y,L),_=Math.max(_,L)}if(M===1){s.position.copy(f).addScaledVector(Mo,A);break}f.addScaledVector(h,(T+w)/2*A).addScaledVector(u,(y+_)/2*A)}s.lookAt(s.position.clone().sub(Mo)),s.updateProjectionMatrix()}function p(){let g=i.clientWidth,x=i.clientHeight;!g||!x||(t.setSize(g,x,!1),s.aspect=g/x,c&&(d(),t.render(n,s)))}return new ResizeObserver(p).observe(i),{get loaded(){return!!a},get speed(){return l},update(g,x){if(!a)return;let m=x&&!fb?1:0;l===m&&m===0||(l+=(m-l)*(1-Math.exp(-g/(m>l?mb:gb))),Math.abs(m-l)<.01&&(l=m),a.update(g/1e3*l),t.render(n,s))}}}var _b={hold:"hold",cw:"cw",ccw:"ccw",left:"left",right:"right",softDrop:"down",down:"down",hardDrop:"drop"},xb=4,yb=40,Lp=85,vb=240,bb=.7,Dp=["","R","2","L"];function Mb(i){let e=i.linesCleared,t=i.perfectClear?"PERFECT CLEAR":i.tspin?`T-SPIN${i.tspin==="mini"?" MINI":""}${e?` ${["","SINGLE","DOUBLE","TRIPLE"][e]}`:""}`:e===4?"TETRIS":e?`+${e} line${e>1?"s":""}`:"no clear";return i.sent>0&&(t+=` \xB7 atk ${i.sent}`),t}function Np({n:i,piece:e,useHold:t,cands:n=null,ms:s=null,rot:r,col:o,event:a}){let c=[n!==null&&`${n} cands`,s!==null&&`${s}ms`].filter(Boolean).map(l=>` \xB7 ${l}`).join("");return[`#${String(i).padStart(3,"0")} ${t?"hold ":""}${On[e]}${c}`,` \u2192 ${Dp[r]?`${Dp[r]} `:""}x${o} \xB7 ${Mb(a)}`]}function Up(i,e){let t=Object.fromEntries([...i.querySelectorAll("[data-key]")].map(l=>[l.dataset.key,l])),n=[],s=Lp,r=0,o=0,a=null,c=l=>{a?.classList.remove("on"),a=l?t[l]??null:null,a?.classList.add("on")};return{press(l,h){n=l.map(u=>_b[u]),s=Math.max(yb,Math.min(Lp,vb/n.length)),r=h},update(l,h){if(!h){(n.length||a)&&(n=[],c(null));return}a&&l>=o&&c(null),n.length&&l>=r&&(c(n.shift()),o=l+s*bb,r=l+s)},log(l){let h=Object.assign(document.createElement("div"),{className:"vs-logline"});for(let d of[l].flat())h.appendChild(Object.assign(document.createElement("span"),{textContent:d}));for(e.appendChild(h);e.children.length>xb;)e.firstChild.remove();let u=e.lastChild.offsetHeight;u&&(e.style.transition="none",e.style.transform=`translateY(${u}px)`,e.offsetHeight,e.style.transition="",e.style.transform="")}}}var pu=150,Sb=8e3,ut=i=>document.getElementById(i);function Fp({settings:i,sampled:e=null,onRecord:t=null,build:n=""}={}){let s=n?`?v=${n}`:"",r=ut("vs-human"),o=ut("vs-fly"),a={human:{hold:ut("vs-humanHold"),next:ut("vs-humanNext"),garbage:ut("vs-humanGarbage"),combo:ut("vs-humanCombo"),badge:ut("vs-humanBadge")},fly:{hold:ut("vs-flyHold"),next:ut("vs-flyNext"),garbage:ut("vs-flyGarbage"),combo:ut("vs-flyCombo"),badge:ut("vs-flyBadge")}},c=ut("vs-resultScrim"),l=Up(ut("vs-flyKeys"),ut("vs-flyLog")),h={ArrowLeft:"left",ArrowRight:"right",ArrowDown:"softDrop",Space:"hardDrop",ArrowUp:"cw",KeyX:"cw",KeyZ:"ccw",ControlLeft:"ccw",KeyA:"flip",KeyC:"hold",ShiftLeft:"hold"},u={...bo},d=!1,p=!1,g=!1,x=null,m=null,f=null,M=!1,A=!1,b=0,T=0,w=null,y=null,_=!1,E=0,R=0,P=null,O=[],L=null,C=!1,N=0,F=0,k=null,Q=()=>({...vo,...Ip(i)});function K(){if(C)return;C=!0;let D=m.human,H=m.fly;ut("vs-resultTitle").textContent=m.winner==="human"?"\uC0AC\uB78C\uC774 \uC774\uACBC\uC5B4\uC694":m.winner==="fly"?"\uCD08\uD30C\uB9AC\uAC00 \uC774\uACBC\uC5B4\uC694":"\uBB34\uC2B9\uBD80\uC608\uC694",ut("vs-resultSub").textContent=m.winner==="human"?"\uCD08\uD30C\uB9AC\uAC00 \uD0D1\uC544\uC6C3\uD588\uC5B4\uC694":m.winner==="fly"?"\uD0D1\uC544\uC6C3\uD588\uC5B4\uC694":m.reason??"",ut("vs-rPiecesA").textContent=D.pieces,ut("vs-rPiecesB").textContent=H.pieces,ut("vs-rAttackA").textContent=D.player.stats.attack,ut("vs-rAttackB").textContent=H.player.stats.attack,ut("vs-rLinesA").textContent=`${D.player.stats.lines} \xB7 ${D.player.stats.tetris}`,ut("vs-rLinesB").textContent=`${H.player.stats.lines} \xB7 ${H.player.stats.tetris}`,ut("vs-rThink").textContent=P!==null?`${P} ms/\uC218`:"\u2014",c.classList.add("open"),l.log(m.winner==="fly"?"opponent topped out \u2192 WIN":m.winner==="human"?"topped out \u2192 LOSE":"piece cap \u2192 DRAW"),L&&(Yf(L,m,O),t?.())}let J=()=>c.classList.remove("open");function te(){for(let H of Object.keys(u))u[H]=!1;J(),m&&l.log("new match");let D=Math.random()*1e9|0;m=fp({seedHuman:D,seedFly:D,garbageSeed:D^1542469173,tuning:Q(),cap:5e3}),w=null,y=null,_=!1,b++,P=null,O=[],C=!1,L=qf({seed:D,flyPlaceMs:pu,model:"C0 (7\uB2E8\uACC4 A-4\u2032)"}),R=performance.now()+1200,le(),ie()}function ce(D,H){if(!L)return;let se=m[D],oe=wp(se.player.board),Z=0;for(let ee=0;ee<oe.heights.length;ee++)oe.heights[ee]>Z&&(Z=oe.heights[ee]);Kf(L,{side:D,at:se.pieces,height:Z,holes:oe.holes,well:se.player.dead?0:Ep(se.player.board),lines:H?.linesCleared??0,sent:H?.sent??0,pending:se.player.garbage.reduce((ee,ae)=>ee+ae.lines,0)})}function le(){!M||!m||m.over||_||w||(_=!0,E=performance.now(),T=++b,f.postMessage({type:"decide",id:T,snapshot:gp(m),detail:!0}))}function Oe(D){let H=D.data;if(H.type==="ready"){M=!0,pe("\uC0DD\uAC01 \uC911",!1),l.log(`C0 ready \xB7 ${H.backend} \xB7 ${H.loadMs}ms`),le();return}if(H.type==="decision"){if(_=!1,H.id!==T)return;w=H.cand,y={ms:H.ms,cands:H.detail?.candidates.length??null},P=H.ms,O.push(H.ms),H.detail&&L&&(Zf(L,H.detail,H.ms),t?.());return}H.type==="error"&&(_=!1,pe("\uC624\uB958",!0),console.error("\uCD08\uD30C\uB9AC \uC624\uB958:",H.error))}function pe(D,H){a.fly.badge.textContent=D,a.fly.badge.className=H?"vs-badge quiet":"vs-badge"}function Ne(){if(!(f||A)){try{f=new Worker(new URL(`fly-worker.js${s}`,document.baseURI))}catch(D){A=!0,pe("\uC6CC\uCEE4\uB97C \uB744\uC6B8 \uC218 \uC5C6\uC5B4\uC694",!0),console.error("\uC6CC\uCEE4\uB97C \uB744\uC6B0\uC9C0 \uBABB\uD588\uC5B4\uC694:",D);return}l.log("loading C0\u2026"),f.onmessage=Oe,f.onerror=D=>{A=!0,_=!1,pe("\uC624\uB958",!0),console.error("\uC6CC\uCEE4\uB97C \uB744\uC6B0\uC9C0 \uBABB\uD588\uC5B4\uC694:",D.message??D)},f.postMessage({type:"init",base:new URL("model",document.baseURI).href,ver:s,sampled:e})}}let U=D=>Math.max(5,Math.round((x?.human.cell??30)*D));function X(D,H){let se=a[D];if(se.hold.replaceChildren(),H.hold===null||H.hold===void 0)se.hold.appendChild(Object.assign(document.createElement("span"),{className:"empty",textContent:"\uC5C6\uC5B4\uC694"}));else{let Z=du(H.hold,pi,U(.4667));H.holdUsed&&Z.classList.add("used"),se.hold.appendChild(Z)}se.next.replaceChildren();for(let Z of(H.next??[]).slice(0,5))se.next.appendChild(du(Z,pi,U(.4)));let oe=Math.min(20,H.pending??0);se.garbage.style.height=`${oe/20*100}%`,se.garbage.classList.toggle("high",oe>=4),se.combo.innerHTML=H.combo>1?`${H.combo}<span>COMBO</span>`:""}function ie(){if(!(!m||!x)){for(let D of["human","fly"]){let H=xp(m,D);x[D].draw(H),X(D,H)}m.over||(a.human.badge.textContent=d?"\uC77C\uC2DC\uC815\uC9C0":p?"\uB450\uB294 \uC911":"\uB300\uAE30 \uC911",a.human.badge.className=d||!p?"vs-badge quiet":"vs-badge",M&&!A&&pe(_?"\uC0DD\uAC01 \uC911":"\uB450\uB294 \uC911",!1))}}function be(D,H=performance.now()){if(!m||m.over||d||!p){ie();return}m.tuning=Q();let se=mp(m,D,u);if(se.locked&&ce("human",se.event),!m.over&&(_&&H-E>Sb&&(_=!1,console.warn("\uCD08\uD30C\uB9AC \uACB0\uC815\uC774 \uB2A6\uC5B4 \uB2E4\uC2DC \uC694\uCCAD\uD574\uC694")),!w&&!_&&le(),w&&H>=R)){let oe=w,Z=m.fly.player,ee=oe.useHold?su(Z):Z.current,ae=vp(Z.board,ee,oe),Ee=_p(m,oe);Ee&&(ce("fly",Ee),l.press(ae??["hardDrop"],H),l.log(Np({n:m.fly.pieces,piece:ee,useHold:oe.useHold,...y,rot:oe.rot,col:oe.col,event:Ee}))),w=null,R=H+pu,m.over||le()}m.over&&K(),ie()}function he(D){F=requestAnimationFrame(he);let H=Math.min(100,D-N);N=D,be(H,D);let se=p&&!d&&!!m&&!m.over&&M&&!A;k?.update(H,se),l.update(D,se)}let ze=()=>{let D=document.activeElement;D&&D!==document.body&&typeof D.blur=="function"&&D.blur()};function xt(D){if(!g)return;let H=h[D.code];if((H||D.code==="KeyR"||D.code==="KeyP")&&(D.preventDefault(),ze(),!D.repeat)){if(D.code==="KeyR"){te(),p=!0;return}if(D.code==="KeyP"){d=!d,ie();return}p||(p=!0),u[H]=!0}}function Ye(D){if(!g)return;let H=h[D.code];H&&(D.preventDefault(),u[H]=!1)}let Qe=()=>{for(let D of Object.keys(u))u[D]=!1};addEventListener("keydown",xt,{passive:!1}),addEventListener("keyup",Ye,{passive:!1}),addEventListener("blur",Qe),document.addEventListener("visibilitychange",()=>{if(document.hidden){Qe();return}N=performance.now(),R=Math.max(R,N+300)}),ut("vs-restart").addEventListener("click",D=>{te(),p=!0,D.currentTarget.blur()}),ut("vs-again").addEventListener("click",D=>{te(),p=!0,D.currentTarget.blur()}),c.addEventListener("click",D=>{D.target===c&&J()});let nt=2.8+.4667+.3333+.4667+ke,Xe=40,pt=14,Tt=16,Wt=7,yt=.9,Mt=D=>Math.max(10,Math.min(64,Math.floor(D)));function G(){let D=document.querySelector(".vs-row"),H=document.querySelector(".vs-phead"),se=D?.clientHeight??0,oe=D?.clientWidth??0;if(!se||!oe)return{cell:x?.human.cell??30,fly:!!D?.classList.contains("with-fly")};if(D&&getComputedStyle(D).flexDirection==="column")return{cell:Mt((oe-Xe)/nt),fly:!1};let ee=(se-Xe-(H?.offsetHeight??44)-pt)/Hl,ae=Mt(Math.min(ee,((oe-Tt)/2-Xe)/nt)),Ee=Mt(Math.min(ee,(oe-2*Tt-2*Xe)/(2*nt+Wt)));return Ee>=ae*yt?{cell:Ee,fly:!0}:{cell:ae,fly:!1}}function At(D=!1){let{cell:H,fly:se}=G();if(document.querySelector(".vs-row")?.classList.toggle("with-fly",se),!(!D&&x&&x.human.cell===H)){document.documentElement.style.setProperty("--cell",`${H}px`),x={human:uu(r,{cell:H}),fly:uu(o,{cell:H})};for(let oe of["human","fly"]){let Z=ut(`vs-${oe}GarbageTrack`);Z&&(Z.style.marginTop=`${mi*H}px`,Z.style.height=`${_t*H}px`)}ie()}}let tt=new ResizeObserver(()=>{g&&At()}),I=document.querySelector(".vs-row");I&&tt.observe(I),addEventListener("resize",()=>{g&&At()}),document.fonts?.ready?.then(()=>{g&&At()});function v(){g||(g=!0,document.body.classList.add("playing"),Ne(),k??(k=Pp(ut("vs-flyModel"),{url:`models/fly_tapping.glb${s}`})),m||te(),At(!0),N=performance.now(),R=Math.max(R,N+300),F||(F=requestAnimationFrame(he)))}function $(){g&&(g=!1,document.body.classList.remove("playing"),J(),Qe(),F&&cancelAnimationFrame(F),F=0)}return globalThis.__versus={get match(){return m},keys:u,get started(){return p},get paused(){return d},get ready(){return M},get active(){return g},get awaiting(){return _},get failed(){return A},get pending(){return w},get nextAt(){return R-performance.now()},get matchId(){return L},get cell(){return x?.human.cell},get flyModel(){return k},tuning:Q,flyPlaceMs:pu,step:be,newMatch:te,press(D){dispatchEvent(new KeyboardEvent("keydown",{code:D,bubbles:!0,cancelable:!0}))},release(D){dispatchEvent(new KeyboardEvent("keyup",{code:D,bubbles:!0,cancelable:!0}))}},{activate:v,deactivate:$,get active(){return g}}}var St={c0:"#2887ee",teacher:"#141f2c",baseline:"#87919c",none:"#f03848",ok:"#007738",muted:"#6a7480"};function cr(i,e){let t=z("div",{class:"card chart"});t.appendChild(z("div",{class:"card-title"},i));let n=we("svg",{role:"img","aria-label":i});return t.appendChild(n),e&&t.appendChild(z("p",{class:"note"},e)),{card:t,svg:n}}function Gl(i,e,{min:t,max:n,fmtTick:s,ticks:r=4}){let d=12+e.length*24+26;i.setAttribute("viewBox",`0 0 440 ${d}`),i.replaceChildren();let p=x=>150+(x-t)/(n-t)*274,g=we("g",{class:"axis"});for(let x=0;x<=r;x++){let m=t+(n-t)*x/r;g.appendChild(we("line",{x1:p(m),x2:p(m),y1:12,y2:d-26})),g.appendChild(we("text",{x:p(m),y:d-10,"text-anchor":"middle"},s(m)))}i.appendChild(g),e.forEach((x,m)=>{let f=12+m*24+12;if(i.appendChild(we("text",{x:140,y:f+4,"text-anchor":"end",style:x.color===St.c0?`fill:${St.c0};font-weight:600`:x.none?`fill:${St.muted}`:""},x.label)),x.none){i.appendChild(we("text",{x:156,y:f+4,style:`fill:${St.none};font-weight:600;font-size:10px`},"\uC544\uC9C1 \uD559\uC2B5\uD558\uC9C0 \uC54A\uC74C"));return}x.ci&&i.appendChild(we("line",{x1:p(Math.max(t,x.ci[0])),x2:p(Math.min(n,x.ci[1])),y1:f,y2:f,stroke:x.color,"stroke-width":2,"stroke-linecap":"round",opacity:.9}));let M=p(Math.min(n,Math.max(t,x.value))),A=x.ci?p(Math.min(n,x.ci[1])):M,b=A+46>424;i.appendChild(we("circle",{cx:M,cy:f,r:3.6,fill:x.color})),i.appendChild(we("text",{x:b?p(Math.max(t,x.ci?.[0]??x.value))-8:A+8,y:f+3.5,"text-anchor":b?"end":"start",style:`fill:${St.muted};font-size:10px`},x.text??""))})}function Op(i){let e=document.getElementById("compare-charts"),t=document.getElementById("compare-extra");e.replaceChildren(),t.replaceChildren();let n=i.play.gate20,s=i.play.base50,r=i.teacher.play,o=i.play.random,a=i.nulls.map(y=>({label:`${y.key} ${y.ko}`,none:!0})),c=Math.max(1e3,r.piecesMedian)*1.02,l=cr("\uD50C\uB808\uC774: \uC870\uAC01 \uC911\uC559\uAC12 (\uC0C1\uD55C 1000)",`\uD55C \uD310\uC5D0\uC11C \uBA87 \uC218\uB97C \uB450\uACE0 \uBC84\uD2F0\uB294\uAC00\uC608\uC694. \uAD50\uC0AC\uB294 ${r.piecesMedian} (\uC0DD\uC874 ${Be(r.survival,0)}), \uCD08\uD30C\uB9AC\uB294 ${n.piecesMedian} \u2014 \uAD50\uC0AC\uC758 ${Be(n.piecesMedian/r.piecesMedian,0)}\uC608\uC694. \uBB34\uC791\uC704 \uBC30\uCE58\uB294 ${o?.piecesMedian??"\u2014"}.`);Gl(l.svg,[{label:"C0 \uC2E4\uC81C \uBC30\uC120 (20\uAC8C\uC784)",value:n.piecesMedian,ci:n.piecesMedianCI,color:St.c0,text:`${n.piecesMedian}`},...s?[{label:"C0 \uC2E4\uC81C \uBC30\uC120 (50\uAC8C\uC784)",value:s.piecesMedian,ci:s.piecesMedianCI,color:St.c0,text:`${s.piecesMedian}`}]:[],...a,{label:"\uAD50\uC0AC (\uD559\uC2B5 \uBAA9\uD45C)",value:r.piecesMedian,color:St.teacher,text:`${r.piecesMedian}`},...o?[{label:"\uBB34\uC791\uC704 \uBC30\uCE58",value:o.piecesMedian,ci:o.piecesMedianCI,color:St.baseline,text:`${o.piecesMedian}`}]:[]],{min:0,max:c,fmtTick:y=>`${Math.round(y)}`}),e.appendChild(l.card);let h=cr("\uD50C\uB808\uC774: \uACF5\uACA9 \uC911\uC559\uAC12 (\uBCF4\uB0B8 \uAC00\uBE44\uC9C0 \uC904)",`\uACF5\uACA9\uC740 \uC904\uC744 \uC5EC\uB7EC \uAC1C \uD55C \uBC88\uC5D0 \uC9C0\uC6B8\uC218\uB85D \uCEE4\uC838\uC694. \uCD08\uD30C\uB9AC\uAC00 \uC9C0\uC6B4 \uC904\uC758 ${Be(n.tetrisLineShare,1)}\uB9CC \uD14C\uD2B8\uB9AC\uC2A4(4\uC904)\uC608\uC694 \u2014 \uAD50\uC0AC\uB294 ${Be(r.lineComposition.shares[3],1)}.`);Gl(h.svg,[{label:"C0 \uC2E4\uC81C \uBC30\uC120 (20\uAC8C\uC784)",value:n.attackMedian,ci:n.attackMedianCI,color:St.c0,text:`${n.attackMedian}`},...s?[{label:"C0 \uC2E4\uC81C \uBC30\uC120 (50\uAC8C\uC784)",value:s.attackMedian,ci:s.attackMedianCI,color:St.c0,text:`${s.attackMedian}`}]:[],...a,{label:"\uAD50\uC0AC (\uD559\uC2B5 \uBAA9\uD45C)",value:r.attackMedian,color:St.teacher,text:`${r.attackMedian}`}],{min:0,max:Math.max(r.attackMedian*1.05,50),fmtTick:y=>`${Math.round(y)}`}),e.appendChild(h.card);let u=i.ranking,d=cr(`\uC21C\uC704: \uAD50\uC0AC \uCD5C\uC120\uC744 \uACE0\uB978 \uBE44\uC728 (\uD14C\uC2A4\uD2B8 \uACB0\uC815 ${u.decisions.toLocaleString()}\uAC1C, \uD6C4\uBCF4 \uD3C9\uADE0 ${ye(u.candidatesPerDecision,1)})`,"\uAC19\uC740 \uD14C\uC2A4\uD2B8 \uBD84\uD560\uC5D0\uC11C \uD559\uC2B5 \uC804 \xB7 \uD559\uC2B5 \uD6C4 \xB7 \uC6B0\uC5F0\uC744 \uB098\uB780\uD788 \uB193\uC558\uC5B4\uC694. \uC21C\uC704\uB294 \uBD84\uBA85\uD788 \uC62C\uB790\uC5B4\uC694 \u2014 \uC774 \uCD95\uC5D0\uC11C\uB294 \uBC30\uC120 \uC704 \uD559\uC2B5\uC774 \uC791\uB3D9\uD574\uC694.");Gl(d.svg,[{label:"\uD559\uC2B5 \uD6C4",value:u.trained.top1,ci:u.trained.top1CI,color:St.c0,text:Be(u.trained.top1,1)},{label:"\uD559\uC2B5 \uC804 (\uCD08\uAE30 \uAC00\uC911\uCE58)",value:u.untrained.top1,ci:u.untrained.top1CI,color:St.baseline,text:Be(u.untrained.top1,1)},{label:"\uC6B0\uC5F0 (\uBB34\uC791\uC704 \uC120\uD0DD)",value:u.chance.top1,ci:u.chance.top1CI,color:St.baseline,text:Be(u.chance.top1,1)}],{min:0,max:.6,fmtTick:y=>Be(y,0)}),e.appendChild(d.card);let p=cr("\uC21C\uC704: \uC0C1\uB300 regret (\uB0AE\uC744\uC218\uB85D \uAD50\uC0AC \uCD5C\uC120\uC5D0 \uAC00\uAE4C\uC6CC\uC694)","\uACE0\uB978 \uD6C4\uBCF4\uAC00 \uAD50\uC0AC \uCD5C\uC120\uBCF4\uB2E4 \uC5BC\uB9C8\uB098 \uB098\uC05C\uAC00\uB97C \uADF8 \uACB0\uC815\uC758 \uCD5C\uC120~\uCD5C\uC545 \uD3ED\uC73C\uB85C \uB098\uB208 \uAC12\uC774\uC5D0\uC694. 0 \uC774\uBA74 \uB9E4\uBC88 \uAD50\uC0AC \uCD5C\uC120\uC744 \uACE8\uB790\uB2E4\uB294 \uB73B\uC774\uC5D0\uC694.");Gl(p.svg,[{label:"\uD559\uC2B5 \uD6C4",value:u.trained.relRegret,ci:u.trained.relRegretCI,color:St.c0,text:ye(u.trained.relRegret,3)},{label:"\uD559\uC2B5 \uC804 (\uCD08\uAE30 \uAC00\uC911\uCE58)",value:u.untrained.relRegret,ci:u.untrained.relRegretCI,color:St.baseline,text:ye(u.untrained.relRegret,3)},{label:"\uC6B0\uC5F0 (\uBB34\uC791\uC704 \uC120\uD0DD)",value:u.chance.relRegret,ci:u.chance.relRegretCI,color:St.baseline,text:ye(u.chance.relRegret,3)}],{min:0,max:.6,fmtTick:y=>y.toFixed(2)}),e.appendChild(p.card);let g=i.gate,x=cr(`\uAC8C\uC774\uD2B8 ${g.passCount} / ${g.total}: \uAD50\uC0AC \uB300\uBE44 \uBE44\uC728`,"\uAE30\uC900\uC120(1.0)\uC740 \uADF8 \uD56D\uBAA9\uC758 \uD1B5\uACFC\uC120\uC774\uC5D0\uC694. \uC870\uAC01\uACFC \uACF5\uACA9\uC774 \uD06C\uAC8C \uBAA8\uC790\uB77C \uC5EC\uAE30\uC11C \uBA48\uCDC4\uC5B4\uC694. \uC21C\uC704 \uC9C0\uD45C\uB294 \uC624\uB974\uB294\uB370 \uD50C\uB808\uC774 \uAE38\uC774\uB294 \uC624\uB974\uC9C0 \uC54A\uB294 \uAC83\uC774 7\uB2E8\uACC4\uC758 \uACB0\uB860\uC774\uC5D0\uC694.");{let y=g.criteria.map(k=>{let Q=k.lower?k.measured>0?k.threshold/k.measured:2:k.measured/(k.threshold||1);return{label:k.label,ratio:Math.min(2,Q),passed:k.passed,raw:k}}),_=440,E=26,R=150,P=54,O=12,L=26,C=O+y.length*E+L;x.svg.setAttribute("viewBox",`0 0 ${_} ${C}`);let N=k=>R+k/2*(_-R-P),F=we("g",{class:"axis"});for(let k of[0,.5,1,1.5,2])F.appendChild(we("line",{x1:N(k),x2:N(k),y1:O,y2:C-L,stroke:k===1?St.muted:void 0})),F.appendChild(we("text",{x:N(k),y:C-10,"text-anchor":"middle"},`${k}\xD7`));x.svg.appendChild(F),y.forEach((k,Q)=>{let K=O+Q*E;x.svg.appendChild(we("text",{x:R-10,y:K+E/2+4,"text-anchor":"end"},k.label)),x.svg.appendChild(we("rect",{x:R,y:K+5,width:Math.max(1,N(k.ratio)-R),height:E-12,rx:3,fill:k.passed?St.ok:St.none,opacity:.85})),x.svg.appendChild(we("text",{x:N(k.ratio)+6,y:K+E/2+4,style:`fill:${St.muted};font-size:10px`},`${k.ratio>=2?"\u22652":k.ratio.toFixed(2)}\xD7`))}),x.svg.appendChild(we("line",{x1:N(1),x2:N(1),y1:O,y2:C-L,stroke:St.teacher,"stroke-width":1.5,"stroke-dasharray":"3 3"}))}e.appendChild(x.card);let m=i.play.lineComposition,f=cr("\uC9C0\uC6B4 \uC904\uC758 \uAD6C\uC131",`\uCD08\uD30C\uB9AC\uB294 \uC2F1\uAE00\uC774 ${Be(m.student.shares[0],1)}\uB85C \uB300\uBD80\uBD84\uC774\uC5D0\uC694. \uD14C\uD2B8\uB9AC\uC2A4\uB97C \uC313\uC73C\uB824\uBA74 \uC6B0\uBB3C\uC744 \uAE38\uAC8C \uC720\uC9C0\uD574\uC57C \uD558\uB294\uB370, \uC6B0\uBB3C \uAE38\uC774 \uC911\uC559\uAC12\uC774 ${i.play.wellRun.student.median} (\uAD50\uC0AC ${i.play.wellRun.teacher.median}) \uC774\uC5D0\uC694.`);{let y=["\uC2F1\uAE00","\uB354\uBE14","\uD2B8\uB9AC\uD50C","\uD14C\uD2B8\uB9AC\uC2A4"];f.svg.setAttribute("viewBox","0 0 440 124"),f.svg.replaceChildren();let N=["#c5cbd2","#a7b0b9","#6a7480","#2887ee"];[["\uCD08\uD30C\uB9AC",m.student.shares,0],["\uAD50\uC0AC",m.teacher.shares,1]].forEach(([F,k,Q])=>{let K=16+Q*40;f.svg.appendChild(we("text",{x:32,y:K+20,"text-anchor":"end",style:"font-weight:600"},F));let J=40;k.forEach((te,ce)=>{let le=te*388;if(le>0){let Oe=we("rect",{x:J,y:K+6,width:le,height:24,fill:N[ce],opacity:.95});Oe.appendChild(we("title",{},`${y[ce]} ${Be(te,1)}`)),f.svg.appendChild(Oe),le>34&&f.svg.appendChild(we("text",{x:J+le/2,y:K+22,"text-anchor":"middle",style:`fill:${ce===3||ce===2?"#fff":"#141f2c"};font-size:10px;font-weight:600`},Be(te,0)))}J+=le})}),y.forEach((F,k)=>{f.svg.appendChild(we("rect",{x:40+k*78,y:106,width:9,height:9,rx:2,fill:N[k]})),f.svg.appendChild(we("text",{x:40+k*78+13,y:114,style:`fill:${St.muted};font-size:10px`},F))})}t.appendChild(f.card);let M=z("div",{class:"card tint"});M.innerHTML=`<div class="card-title">\uB300\uC870\uAD70 ${i.nulls.filter(y=>y.trained).length} / ${i.nulls.length} \uD559\uC2B5\uB428</div>
    <p>"\uC2E4\uC81C \uBC30\uC120\uC774\uB77C\uC11C \uB418\uB294 \uAC83\uC778\uAC00"\uB97C \uAC00\uB974\uB824\uBA74 \uAC19\uC740 \uD30C\uB77C\uBBF8\uD130 \uC218\uB85C \uBC30\uC120\uB9CC \uBC14\uAFBC \uB300\uC870\uAD70\uC744 \uAC19\uC740 \uC808\uCC28\uB85C \uD559\uC2B5\uD574\uC57C \uD574\uC694.
    \uB9C8\uC2A4\uD06C 3\uC885\uC740 \uB9CC\uB4E4\uC5B4\uC838 \uC788\uACE0 sanity \uB3C4 \uD1B5\uACFC\uD588\uC9C0\uB9CC(\uC804\uBD80 P ${i.nulls[0]?.P?.toLocaleString()??"\u2014"} \uB85C C0 \uC640 \uC815\uD655\uD788 \uAC19\uC544\uC694), \uAC00\uC911\uCE58 \uD559\uC2B5\uC740 \uC544\uC9C1\uC774\uC5D0\uC694.
    \uADF8\uB798\uC11C \uC774 \uD398\uC774\uC9C0\uC5D0\uB294 <b>C0 \uC758 \uC790\uB9AC\uB9CC \uCC44\uC6CC\uC838 \uC788\uACE0 \uB300\uC870\uAD70 \uC904\uC740 \uBE44\uC5B4 \uC788\uC5B4\uC694.</b> \uAC12\uC744 \uCD94\uC815\uD574 \uCC44\uC6B0\uC9C0 \uC54A\uC544\uC694.</p>`;let A=z("table",{class:"mini-table"});A.innerHTML='<thead><tr><th>\uB300\uC870\uAD70</th><th>\uBD84\uB9AC\uD558\uB824\uB294 \uAC83</th><th class="r">\uC6D0\uBCF8 \uAC04\uC120 \uAD50\uC9D1\uD569</th><th class="r">\uCC28\uC218 \uBCF4\uC874</th><th class="r">\uC0C1\uD0DC</th></tr></thead>';let b=z("tbody");for(let y of i.nulls){let _=z("tr");_.append(z("td",{},`${y.key} ${y.ko}`),z("td",{},y.separatesWhat??"\u2014"),z("td",{class:"r"},y.sanity?.edgeOverlapWithOriginal!=null?`${Be(y.sanity.edgeOverlapWithOriginal,2)} (\uC6B0\uC5F0 ${Be(y.sanity.chanceOverlap,2)})`:"\u2014"),z("td",{class:"r"},y.sanity?.degreeIdentical?"\uC608":"\uC544\uB2C8\uC624"),z("td",{class:"r"},y.trained?"\uD559\uC2B5 \uC644\uB8CC":y.state==="interrupted"?"\uD559\uC2B5 \uC911\uB2E8":"\uBBF8\uC2DC\uC791")),b.appendChild(_)}A.appendChild(b);let T=z("div",{class:"table-wrap"});T.appendChild(A),M.appendChild(T),t.appendChild(M);let w=document.getElementById("compare-foot");w.innerHTML=`${i.phase} \xB7 ${new Date(i.ranAt).toLocaleString("ko-KR")} \xB7 ${ye(i.elapsedHours,2)} h \uD559\uC2B5 \xB7 \uAD50\uC0AC ${i.teacher.label} \xB7 \uD559\uC2B5 \uACB0\uC815 ${i.data.trainDecisions.toLocaleString()} / \uAC80\uC99D ${i.data.valDecisions.toLocaleString()} / \uD14C\uC2A4\uD2B8 ${i.data.testDecisions.toLocaleString()} \xB7 \uC190\uC2E4 ${i.data.hyper.loss}(\u03BB ${i.data.hyper.lambda}, \u03BC ${i.data.hyper.mu}) \xB7 DAgger ${i.data.hyper.daggerRounds} \uB77C\uC6B4\uB4DC. \uCEE4\uB125\uD1B0\uC5D0\uC11C \uC624\uB294 \uAC83\uC740 \uBC30\uC120\uBFD0\uC774\uACE0 \uAC00\uC911\uCE58 ${i.model.P.toLocaleString()}\uAC1C\uB294 \uD559\uC2B5\uB41C \uAC12\uC774\uC5D0\uC694 \u2014 corr(\uCD08\uAE30, \uCD5C\uC885) ${ye(i.weights.corr,3)}, \uC5B5\uC81C\uC131 ${Be(i.weights.inhibitoryFrac,1)}(\uCD08\uAE30 0%).`}function Bp(i,e){let t=i.gate,n=i.ranking,s=document.getElementById("home-kpis"),r=(y,_,E,R="")=>{let P=z("div",{class:`card kpi${R?` ${R}`:""}`});return P.append(z("div",{class:"label"},y),z("div",{class:"value"},_),z("div",{class:"sub"},E)),P},o=t.criteria.find(y=>y.key==="piecesMedian"),a=t.criteria.find(y=>y.key==="attackMedian"),c=t.criteria.find(y=>y.key==="relRegret");s.replaceChildren(r("\uAC8C\uC774\uD2B8",`${t.passCount} / ${t.total}`,`${t.phase} \xB7 \uAD50\uC0AC \uB300\uBE44 \uAE30\uC900 5\uAC1C \uC911 \uD1B5\uACFC \uC218`),r("\uC0C1\uB300 regret",ye(c.measured,3),`CI [${ye(c.ci?.[0],3)}, ${ye(c.ci?.[1],3)}] \xB7 0 \uC774\uBA74 \uB9E4 \uC218\uAC00 \uAD50\uC0AC \uCD5C\uC120`),r("\uC870\uAC01 \uC911\uC559\uAC12",`${o.measured}`,`\uAD50\uC0AC ${o.teacher} \uC758 ${Be(o.ratio,0)} \xB7 \uAE30\uC900 ${o.threshold}`),r("\uACF5\uACA9 \uC911\uC559\uAC12",`${a.measured}`,`\uAD50\uC0AC ${a.teacher} \uC758 ${Be(a.ratio,0)} \xB7 \uAE30\uC900 ${ye(a.threshold,1)}`)),document.getElementById("home-gate").replaceChildren(...t.criteria.flatMap((y,_)=>{let E=z("div",{class:"row lg"}),R=z("div",{class:"grow"});R.append(z("div",{class:"title"},y.label),z("div",{class:"desc"},y.desc));let P=z("div",{class:"val num"});P.append(z("b",{class:y.passed?"ok":"no"},`${ye(y.measured,y.key==="relRegret"||y.key==="garbageDeathShare"?3:1)}`),z("span",{class:"muted"},` ${y.lower?"\u2264":"\u2265"} ${ye(y.threshold,y.key==="relRegret"||y.key==="garbageDeathShare"?2:1)}`));let O=z("span",{class:`tag ${y.passed?"tag-green":"tag-red"}`},y.passed?"\uD1B5\uACFC":"\uBBF8\uB2EC");return E.append(R,P,O),_?[z("div",{class:"divider"}),E]:[E]}));let h=document.getElementById("home-mine");function u(){let y=co();if(!y){h.replaceChildren(Un({title:"\uC544\uC9C1 \uB300\uC804\uD55C \uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694",desc:"\uCD08\uD30C\uB9AC\uC640 \uD55C \uD310 \uB450\uBA74 \uC804\uC801\uC774 \uC5EC\uAE30\uC5D0 \uB0A8\uACE0, \uCEE4\uB125\uD1B0\xB7\uACB0\uC815 \uD0D0\uC0C9\xB7\uC2E0\uACBD \uD65C\uB3D9 \uD654\uBA74\uC774 \uADF8 \uD310\uC758 \uAC12\uC73C\uB85C \uCC44\uC6CC\uC838\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uD0A4\uBCF4\uB4DC \uBC29\uD5A5\uD0A4\uC640 \uC2A4\uD398\uC774\uC2A4\uB85C \uB46C\uC694"}));return}let _=z("div",{class:"card-head"}),E=z("div",{class:"grow"});E.append(z("div",{class:"card-title"},`${y.wins}\uC2B9 ${y.losses}\uD328${y.draws?` ${y.draws}\uBB34`:""}`),z("div",{class:"card-sub num"},`${y.games}\uD310 \xB7 \uCD08\uD30C\uB9AC \uC0DD\uAC01 \uC2DC\uAC04 \uC911\uC559\uAC12 ${y.thinkMedian??"\u2014"} ms/\uC218 \xB7 \uAE30\uB85D\uD55C \uACB0\uC815 ${y.decisions}\uAC1C`));let R=z("div",{class:"right"});R.appendChild(z("a",{class:"btn btn-secondary btn-sm",href:"#/matches"},"\uB300\uC804 \uAE30\uB85D")),_.append(E,R);let P=z("div",{class:"mini-stats"});[["\uC870\uAC01 \uC911\uC559\uAC12",`${y.humanPiecesMedian??0}`,`${y.flyPiecesMedian??0}`],["\uACF5\uACA9 \uC911\uC559\uAC12",`${y.humanAttackMedian??0}`,`${y.flyAttackMedian??0}`],["\uC9C0\uC6B4 \uC904 \uD569\uACC4",`${y.humanLines}`,`${y.flyLines}`],["\uD14C\uD2B8\uB9AC\uC2A4 \uD569\uACC4",`${y.humanTetris}`,`${y.flyTetris}`]].forEach(([O,L,C])=>{let N=z("div",{class:"ms"});N.append(z("span",{class:"k"},O),z("b",{class:"a num"},L),z("span",{class:"vs"},"vs"),z("b",{class:"b num"},C)),P.appendChild(N)}),h.replaceChildren(_,P,z("p",{class:"card-note"},"\uC67C\uCABD\uC774 \uB098, \uC624\uB978\uCABD\uC774 \uCD08\uD30C\uB9AC\uC608\uC694. \uAE30\uB85D\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uB0A8\uC544\uC694."))}u();let d=document.getElementById("home-bars"),p={top1:{name:"\uAD50\uC0AC \uCD5C\uC120\uC744 \uACE0\uB978 \uBE44\uC728",fmt:y=>Be(y,1),max:1},relRegret:{name:"\uC0C1\uB300 regret (\uB0AE\uC744\uC218\uB85D \uC88B\uC544\uC694)",fmt:y=>ye(y,3),max:.6,invert:!0},tau:{name:"\uACB0\uC815 \uB0B4 \uCF04\uB2EC \u03C4",fmt:y=>ye(y,3),max:.7}},g=[...document.querySelectorAll("#home-metric [data-metric]")],x=document.getElementById("home-metric-name");function m(y){let _=p[y];x.textContent=_.name;let E=[{k:"\uD559\uC2B5 \uD6C4",v:n.trained[y],on:!0},{k:"\uD559\uC2B5 \uC804",v:n.untrained[y]},{k:"\uC6B0\uC5F0",v:n.chance[y]}];d.replaceChildren(...E.map(R=>{let P=z("div",{class:`bar${R.on?" on":" diff"}`,title:`${R.k} \xB7 ${_.fmt(R.v)}`}),O=10+Math.max(0,Math.min(1,(R.v??0)/_.max))*150,L=z("div",{class:"b"});return L.style.height=`${O}px`,P.append(z("div",{class:"v"},_.fmt(R.v)),L,z("div",{class:"k"},R.k)),P})),g.forEach(R=>R.setAttribute("aria-selected",String(R.dataset.metric===y)))}let f="top1";g.forEach(y=>y.addEventListener("click",()=>{f=y.dataset.metric,m(f)})),m(f);let M=document.getElementById("home-recent"),A=[{key:"C0",ko:"\uC2E4\uC81C \uBC30\uC120",en:"real connectome",trained:!0,note:`\u03C4 ${ye(n.trained.tau,3)} \xB7 top-1 ${Be(n.trained.top1,1)}`},...i.nulls.map(y=>({key:y.key,ko:y.ko,en:y.name,trained:y.trained,note:y.trained?`\u03C4 ${ye(y.test?.tau,3)}`:"\uC544\uC9C1 \uD559\uC2B5\uD558\uC9C0 \uC54A\uC74C"}))];M.replaceChildren(...A.flatMap((y,_)=>{let E=z("a",{class:"list-row",href:"#/experiments"}),R=z("div",{class:`avatar${y.key==="C0"?" on":""}`},y.key),P=z("div",{class:"main"});P.append(z("b",{},`${y.ko} \xB7 ${y.en}`),z("span",{class:"num"},y.key==="C0"?`P ${i.model.P.toLocaleString()} \xB7 E ${i.model.E.toLocaleString()}`:"\uB9C8\uC2A4\uD06C\uB9CC \uC900\uBE44\uB428 \xB7 \uAC19\uC740 P"));let O=z("div",{class:"end"});return y.trained?O.append(z("b",{class:y.key==="C0"?"brand":""},y.note)):O.append(z("span",{class:"tag"},"\uBBF8\uD559\uC2B5"),z("span",{},"\uB300\uC870\uAD70")),E.append(R,P,O),_?[z("div",{class:"divider"}),E]:[E]})),M.appendChild(z("div",{class:"divider"}));let b=z("a",{class:"list-more",href:"#/experiments"},"\uC2E4\uD5D8 \uC804\uCCB4\uBCF4\uAE30");b.appendChild(rr("i-chev",20)),M.appendChild(b);let T=document.getElementById("home-conclusion");T.innerHTML=`<div class="grow"><div class="title">\uC21C\uC704\uB294 \uBC30\uC6E0\uC9C0\uB9CC \uD310\uC744 \uC624\uB798 \uB04C\uC9C0\uB294 \uBABB\uD574\uC694</div>
    <div class="sub num">\uAC19\uC740 \uD14C\uC2A4\uD2B8 \uBD84\uD560\uC5D0\uC11C \uD559\uC2B5 \uC804 \u2192 \uD6C4\uB85C \uAD50\uC0AC \uCD5C\uC120 \uC120\uD0DD\uC774 ${Be(n.untrained.top1,1)} \u2192 ${Be(n.trained.top1,1)},
    \uC0C1\uB300 regret ${ye(n.untrained.relRegret,3)} \u2192 ${ye(n.trained.relRegret,3)} \uB85C \uC6C0\uC9C1\uC600\uC5B4\uC694 (\uC6B0\uC5F0\uC740 ${Be(n.chance.top1,1)} \xB7 ${ye(n.chance.relRegret,3)}).
    \uADF8\uB7F0\uB370 \uC2E4\uC81C \uD50C\uB808\uC774\uB294 \uC870\uAC01 \uC911\uC559\uAC12 ${o.measured} \u2014 \uAD50\uC0AC ${o.teacher} \uC758 ${Be(o.ratio,0)}\uC5D0 \uADF8\uCCD0\uC694. \uACB0\uC815\uB2F9 regret \uC774 \uAC8C\uC784 \uAE38\uC774\uC640 \uC815\uB82C\uB418\uC9C0 \uC54A\uB294\uB2E4\uB294 \uB73B\uC774\uACE0,
    \uAC8C\uC774\uD2B8 ${t.passCount}/${t.total} \uB85C \uBA48\uCD98 \uC0C1\uD0DC\uB97C \uADF8\uB300\uB85C \uBCF4\uC5EC\uC918\uC694. \uCEE4\uB125\uD1B0\uC5D0\uC11C \uC624\uB294 \uAC83\uC740 \uBC30\uC120(\uB9C8\uC2A4\uD06C ${i.model.E.toLocaleString()} \uAC04\uC120)\uBFD0\uC774\uACE0 \uAC00\uC911\uCE58 ${i.model.P.toLocaleString()}\uAC1C\uB294 \uD559\uC2B5\uB41C \uAC12\uC774\uC5D0\uC694.</div></div>
    <a class="link" href="#/compare">\uC870\uAC74 \uBE44\uAD50 \uBCF4\uAE30 <svg><use href="#i-chev"/></svg></a>`;let w=document.getElementById("home-graph-note");return w&&(w.textContent=`\uCEE4\uB125\uD1B0 3D \uB294 \uC804\uCCB4 ${i.model.N.toLocaleString()} \uB274\uB7F0 \uC911 ${e.nodes.length.toLocaleString()}\uAC1C\uB97C \uCE35\uD654 \uD45C\uBCF8\uC73C\uB85C \uBF51\uC544 \uADF8\uB824\uC694.`),{refresh:u}}var Wl={done:["\uC644\uB8CC","tag-green"],interrupted:["\uD559\uC2B5 \uC911\uB2E8","tag-red"],"not-started":["\uBBF8\uD559\uC2B5","tag"]};function kp(i){let e=i.ranking,t=i.gate,n=[{key:"A4",kind:"stage7",condition:"C0",ko:"\uC2E4\uC81C \uBC30\uC120",en:"real connectome",name:`${i.phase} \uBCF8 \uD559\uC2B5`,state:"done",tau:e.trained.tau,top1:e.trained.top1,relRegret:e.trained.relRegret,pieces:i.play.gate20.piecesMedian,games:i.play.gate20.games,sub:`\uAD50\uC0AC ${i.teacher.variant} \xB7 DAgger ${i.data.hyper.daggerRounds} \uB77C\uC6B4\uB4DC \xB7 \uAC8C\uC774\uD2B8 ${t.passCount}/${t.total}`}];i.play.base50&&n.push({key:"B0",kind:"stage7",condition:"C0",ko:"\uC2E4\uC81C \uBC30\uC120",en:"real connectome",name:"Phase B \uD504\uB85C\uD1A0\uCF5C \uAE30\uC900\uC120",state:"done",tau:e.trained.tau,top1:e.trained.top1,relRegret:e.trained.relRegret,pieces:i.play.base50.piecesMedian,games:i.play.base50.games,sub:`\uB300\uC870\uAD70\uACFC \uC9DD\uC9C0\uC744 \uACF5\uC720 \uC2DC\uB4DC ${i.play.base50.games} \uAC8C\uC784 \xB7 \uC0AC\uB9DD \uC6D0\uC778 4\uC885`});for(let s of i.nulls)n.push({key:s.key,kind:"null",condition:s.key,ko:s.ko,en:s.name,name:"\uB300\uC870\uAD70",state:s.state,tau:s.test?.tau??null,top1:s.test?.top1??null,relRegret:s.test?.relRegret??null,pieces:s.play?.piecesMedian??null,games:s.play?.games??null,sub:s.maskBuilt?`\uB9C8\uC2A4\uD06C \uC900\uBE44\uB428 \xB7 P ${s.P?.toLocaleString()} (C0 \uC640 \uB3D9\uC77C)`:"\uB9C8\uC2A4\uD06C \uC5C6\uC74C",nullMeta:s});return n}function zp(i){let e=document.getElementById("exp-table"),t=document.getElementById("exp-chips"),n=document.getElementById("exp-search"),s={filter:"all",q:""},r=kp(i),o=m=>{if(s.filter==="done"&&m.state!=="done"||s.filter==="todo"&&m.state==="done")return!1;if(!s.q)return!0;let f=`${m.key} ${m.condition} ${m.ko} ${m.en} ${m.name} ${m.sub}`.toLowerCase();return s.q.split(/\s+/).every(M=>f.includes(M))};function a(){let m={all:r.length,done:r.filter(M=>M.state==="done").length,todo:r.filter(M=>M.state!=="done").length},f=r.filter(o).length;t.replaceChildren(...[["all","\uC804\uCCB4"],["done","\uC644\uB8CC"],["todo","\uBBF8\uD559\uC2B5"]].map(([M,A])=>{let b=z("button",{class:"chip","aria-pressed":String(s.filter===M)},`${A} ${m[M]}`);return b.addEventListener("click",()=>{s.filter=M,l()}),b}),z("span",{class:"count num"},`${r.length}\uAC1C \uC911 ${f}\uAC1C \uBCF4\uB294 \uC911`))}function c(){let m=r.filter(o),f=z("div",{class:"thead"});f.append(z("div",{},"\uC2E4\uD589"),z("div",{},"\uC870\uAC74"),z("div",{class:"r"},"\uACB0\uC815 \uB0B4 \u03C4"),z("div",{class:"r"},"top-1"),z("div",{class:"r"},"\uC870\uAC01 \uC911\uC559\uAC12"),z("div",{class:"r"},"\uC0C1\uD0DC"));let M=document.createDocumentFragment();M.append(f,z("div",{class:"divider"})),m.length||M.appendChild(z("div",{class:"empty"},"\uC870\uAC74\uC5D0 \uB9DE\uB294 \uC2E4\uD589\uC774 \uC5C6\uC5B4\uC694")),m.forEach((A,b)=>{b&&M.appendChild(z("div",{class:"divider"}));let T=z("a",{class:"tr",href:`#/experiments/${A.key}`}),w=z("div",{class:"td-name"});w.append(z("b",{},`${A.ko} \xB7 ${A.name}`),z("span",{},A.sub));let y=A.state==="done",[_,E]=Wl[A.state]??Wl["not-started"];T.append(w,z("div",{class:"td-cond"},`${A.condition} ${A.en}`),z("div",{class:`r${A.condition==="C0"?" brand":y?"":" dim"}`},y?ye(A.tau,3):"\u2014"),z("div",{class:`r${y?"":" dim"}`},y?Be(A.top1,1):"\u2014"),z("div",{class:`r${y?"":" dim"}`},A.pieces!==null&&A.pieces!==void 0?`${A.pieces}`:"\u2014"),(()=>{let R=z("div",{class:"td-status"});return R.appendChild(z("span",{class:`tag ${E}`},_)),R})()),M.appendChild(T)}),e.replaceChildren(M)}function l(){a(),c()}n.addEventListener("input",()=>{s.q=n.value.trim().toLowerCase(),l()}),l();let h=document.getElementById("exp-stage6");if(!i.stage6){h.hidden=!0;return}let u=i.stage6,d=z("details",{class:"card archive"});d.appendChild(z("summary",{},`\uC774\uC804 \uB2E8\uACC4 \u2014 6\uB2E8\uACC4 \uACE0\uC815 \uC2A4\uD30C\uC774\uD0B9 \uB9AC\uC800\uBC84 + \uD559\uC2B5 \uB9AC\uB4DC\uC544\uC6C3 (${u.conditions.length}\uAC1C \uC2E4\uD589, ${new Date(u.generatedAt).toLocaleDateString("ko-KR")})`)),d.appendChild(z("p",{class:"card-note"},`\uBC30\uC120\uACFC \uAC00\uC911\uCE58\uB97C \uBAA8\uB450 \uCEE4\uB125\uD1B0\uC5D0\uC11C \uAC00\uC838\uC640 \uACE0\uC815\uD558\uACE0 \uB9AC\uB4DC\uC544\uC6C3(${u.combo})\uB9CC \uD559\uC2B5\uD55C \uBCC4\uAC1C\uC758 \uC644\uACB0 \uC2E4\uD5D8\uC774\uC5D0\uC694. \uACB0\uC815 \uB0B4 \uC21C\uC704 \uC815\uBCF4\uAC00 \uC5C6\uB2E4\uB294 \uC74C\uC131 \uACB0\uACFC\uB85C \uB05D\uB0AC\uACE0, 7\uB2E8\uACC4\uB294 \uC5EC\uAE30\uC11C "\uAC00\uC911\uCE58\uB97C \uD559\uC2B5\uD55C\uB2E4"\uB85C \uBC14\uAFBC \uAC70\uC608\uC694. \uC0AD\uC81C\uD558\uC9C0 \uC54A\uACE0 \uADF8\uB300\uB85C \uB0A8\uACA8 \uB46C\uC694.`));let p=z("table",{class:"mini-table"});p.innerHTML='<thead><tr><th>\uC2E4\uD589</th><th>\uC870\uAC74</th><th class="r">\u03C4</th><th class="r">R\xB2</th><th class="r">\uC904 \uC911\uC559\uAC12</th><th class="r">\uC0C1\uD0DC</th></tr></thead>';let g=z("tbody");for(let m of u.conditions){let f=z("tr",{class:m.key==="C0"?"on":""});f.append(z("td",{},m.key),z("td",{},`${m.condition} ${m.name}`),z("td",{class:"r"},m.tau===null?"\u2014":ye(m.tau,3)),z("td",{class:"r"},m.r2===null?"\u2014":ye(m.r2,3)),z("td",{class:"r"},m.linesMedian===null?"\u2014":`${m.linesMedian}`),z("td",{class:"r"},m.region==="ok"?"\uC644\uB8CC":"\uB3D9\uC791 \uC601\uC5ED \uC5C6\uC74C")),g.appendChild(f)}p.appendChild(g);let x=z("div",{class:"table-wrap"});x.appendChild(p),d.appendChild(x),h.replaceChildren(d)}function Hp(i,e){let n=kp(i).find(f=>f.key===e);if(!n)return!1;document.getElementById("exp-title").textContent=`${n.ko} \xB7 ${n.name}`;let[s,r]=Wl[n.state]??Wl["not-started"];document.getElementById("exp-status").replaceChildren(z("span",{class:`tag ${r}`},s)),document.getElementById("exp-params").textContent=`${n.condition} ${n.en} \xB7 N ${i.model.N.toLocaleString()} \xB7 E ${i.model.E.toLocaleString()} \xB7 P ${i.model.P.toLocaleString()} \xB7 T ${i.model.T}`,document.getElementById("exp-actions").replaceChildren((()=>{let f=z("a",{class:"btn btn-secondary",href:"https://github.com/stx4R/Fly#readme",target:"_blank",rel:"noopener"},"\uBCF4\uACE0\uC11C ");return f.appendChild(rr("i-ext")),f})(),z("a",{class:"btn btn-primary",href:n.state==="done"?"#/versus":"#/compare"},n.state==="done"?"\uC774 \uBAA8\uB378\uACFC \uB300\uC804\uD558\uAE30":"\uC870\uAC74 \uBE44\uAD50\uC5D0\uC11C \uBCF4\uAE30"));let a=document.getElementById("exp-body"),c=(f,M)=>{let A=z("div",{class:"card"});A.appendChild(z("div",{class:"card-title"},f));let b=z("div",{class:"kv"});return M.forEach(([T,w,y],_)=>{_&&b.appendChild(z("div",{class:"divider"}));let E=z("div",{class:"row"}),R=z("div",{class:"grow"});R.appendChild(z("div",{class:"title"},T)),y&&R.appendChild(z("div",{class:"desc"},y)),E.append(R,z("div",{class:"val num"},w)),b.appendChild(E)}),A.appendChild(b),A},l=(f,M,A)=>{let b=z("div",{class:"card kpi"});return b.append(z("div",{class:"label"},f),z("div",{class:"value"},M),z("div",{class:"sub"},A)),b},h=[],u=z("div",{class:"card notice"});if(n.kind==="null"){let f=n.nullMeta;u.innerHTML=`<div class="grow"><div class="title">${f.key} ${f.name} \xB7 ${f.ko}</div><div class="sub">${f.desc} \uBD84\uB9AC\uD558\uB824\uB294 \uAC83: ${f.separatesWhat??"\u2014"}</div></div>`,h.push(u);let M=z("div",{class:"card tint"});return M.innerHTML=`<div class="card-title">\uC544\uC9C1 \uD559\uC2B5\uD558\uC9C0 \uC54A\uC558\uC5B4\uC694</div>
      <p>\uB9C8\uC2A4\uD06C\uB294 \uB9CC\uB4E4\uC5B4\uC838 \uC788\uACE0 sanity \uB3C4 \uD1B5\uACFC\uD588\uC9C0\uB9CC (${f.builtAt?new Date(f.builtAt).toLocaleString("ko-KR"):"\u2014"}), \uAC00\uC911\uCE58 \uD559\uC2B5\uC740 ${f.state==="interrupted"?`${f.startedAt?new Date(f.startedAt).toLocaleString("ko-KR"):""} \uC5D0 \uC2DC\uC791\uD588\uB2E4\uAC00 \uC911\uB2E8\uB410\uC5B4\uC694`:"\uC544\uC9C1 \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC5B4\uC694"}.
      \uADF8\uB798\uC11C \uC774 \uC870\uAC74\uC758 \u03C4 \xB7 top-1 \xB7 \uD50C\uB808\uC774 \uC218\uCE58\uB294 <b>\uC5C6\uC5B4\uC694</b>. \uC5C6\uB294 \uAC12\uC744 \uCD94\uC815\uD574\uC11C \uCC44\uC6B0\uC9C0 \uC54A\uC544\uC694.</p>`,h.push(M),h.push(c("\uB9C8\uC2A4\uD06C sanity (\uC2E4\uCE21)",[["\uD30C\uB77C\uBBF8\uD130 \uC218 P",`${f.P?.toLocaleString()??"\u2014"}`,`C0 \uC640 \uAC19\uC544\uC57C \uD574\uC694 (\uAE30\uB300 ${f.sanity?.expectedP?.toLocaleString()??"\u2014"})`],["\uB274\uB7F0 \xB7 \uAC04\uC120",`${f.N?.toLocaleString()??"\u2014"} \xB7 ${f.E?.toLocaleString()??"\u2014"}`,"C0 \uC640 \uB3D9\uC77C"],["\uCC28\uC218 \uBD84\uD3EC \uBCF4\uC874",f.sanity?.degreeIdentical===null?"\u2014":f.sanity?.degreeIdentical?"\uC608":"\uC544\uB2C8\uC624"],["\uC6D0\uBCF8 \uAC04\uC120 \uAD50\uC9D1\uD569",f.sanity?.edgeOverlapWithOriginal!=null?Be(f.sanity.edgeOverlapWithOriginal,2):"\u2014",f.sanity?.chanceOverlap!=null?`\uC6B0\uC5F0 \uC218\uC900 ${Be(f.sanity.chanceOverlap,2)}`:""]])),a.replaceChildren(...h),!0}let d=i.ranking,p=n.key==="B0"?i.play.base50:i.play.gate20;u.innerHTML=`<div class="grow"><div class="title">${n.condition} ${n.en} \xB7 ${n.name}</div>
    <div class="sub">\uCEE4\uB125\uD1B0\uC5D0\uC11C \uC624\uB294 \uAC83\uC740 \uBC30\uC120(\uD76C\uC18C\uC131 \uB9C8\uC2A4\uD06C ${i.model.E.toLocaleString()} \uAC04\uC120)\uBFD0\uC774\uACE0, \uB9C8\uC2A4\uD06C\uAC00 1\uC778 \uC790\uB9AC\uC758 \uAC00\uC911\uCE58 ${i.model.P.toLocaleString()}\uAC1C\uB294 \uD559\uC2B5\uB41C \uAC12\uC774\uC5D0\uC694.
    \uAD50\uC0AC\uB294 ${i.teacher.label}, \uD559\uC2B5 \uB370\uC774\uD130\uB294 \uACB0\uC815 ${i.data.trainDecisions.toLocaleString()}\uAC1C\uC608\uC694. ${n.sub}</div></div>`,h.push(u);let g=z("div",{class:"kpis"});if(g.append(l("\uACB0\uC815 \uB0B4 \uCF04\uB2EC \u03C4",ye(d.trained.tau,3),`CI ${d.trained.tauCI?`[${ye(d.trained.tauCI[0],3)}, ${ye(d.trained.tauCI[1],3)}]`:"\u2014"} \xB7 \uD14C\uC2A4\uD2B8 \uACB0\uC815 ${d.decisions.toLocaleString()}\uAC1C`),l("top-1",Be(d.trained.top1,1),`CI [${Be(d.trained.top1CI[0],1)}, ${Be(d.trained.top1CI[1],1)}] \xB7 \uC6B0\uC5F0 ${Be(d.chance.top1,1)}`),l("\uC0C1\uB300 regret",ye(d.trained.relRegret,3),`\uD559\uC2B5 \uC804 ${ye(d.untrained.relRegret,3)} \xB7 \uC6B0\uC5F0 ${ye(d.chance.relRegret,3)}`),l("\uC870\uAC01 \uC911\uC559\uAC12",`${p.piecesMedian}`,`${p.games} \uAC8C\uC784 \xB7 CI [${ye(p.piecesMedianCI?.[0],0)}, ${ye(p.piecesMedianCI?.[1],0)}] \xB7 \uAD50\uC0AC ${i.teacher.play.piecesMedian}`)),h.push(g),n.key==="A4"){let f=i.gate,M=z("div",{class:"card"});M.appendChild(z("div",{class:"card-title"},`\uAC8C\uC774\uD2B8 ${f.passCount} / ${f.total} \u2014 \uAD50\uC0AC \uB300\uBE44 \uAE30\uC900`));let A=z("div",{class:"kv"});if(f.criteria.forEach((b,T)=>{T&&A.appendChild(z("div",{class:"divider"}));let w=z("div",{class:"row"}),y=z("div",{class:"grow"});y.append(z("div",{class:"title"},b.label),z("div",{class:"desc"},`${b.desc}${b.teacher!=null?` \xB7 \uAD50\uC0AC ${ye(b.teacher,1)}`:""}`)),w.append(y,z("div",{class:"val num"},`${ye(b.measured,3)} ${b.lower?"\u2264":"\u2265"} ${ye(b.threshold,2)}`),z("span",{class:`tag ${b.passed?"tag-green":"tag-red"}`},b.passed?"\uD1B5\uACFC":"\uBBF8\uB2EC")),A.appendChild(w)}),M.append(A,z("p",{class:"card-note"},"\uC870\uAC01\uACFC \uACF5\uACA9\uC774 \uAD50\uC0AC \uB300\uBE44 \uAE30\uC900\uC5D0 \uBABB \uBBF8\uCCD0 \uC5EC\uAE30\uC11C \uBA48\uCDC4\uC5B4\uC694. \uC21C\uC704 \uC9C0\uD45C\uB294 \uC62C\uB790\uB294\uB370 \uD50C\uB808\uC774 \uAE38\uC774\uB294 \uB530\uB77C\uC624\uC9C0 \uC54A\uC558\uB2E4\uB294 \uB73B\uC774\uC5D0\uC694.")),h.push(M),i.rounds.length){let b=z("div",{class:"card"});b.appendChild(z("div",{class:"card-title"},`DAgger \uB77C\uC6B4\uB4DC ${i.rounds.length}\uAC1C`));let T=z("table",{class:"mini-table"});T.innerHTML='<thead><tr><th>\uB77C\uC6B4\uB4DC</th><th class="r">\uC0C1\uB300 regret</th><th class="r">top-1</th><th class="r">\u03C4</th><th class="r">\uBE60\uB978 \uD50C\uB808\uC774 \uC870\uAC01</th><th class="r">\uC815\uCC45 \uC77C\uCE58\uC728</th></tr></thead>';let w=z("tbody");for(let _ of i.rounds){let E=z("tr");E.append(z("td",{},`r${_.round}`),z("td",{class:"r"},ye(_.relRegret,4)),z("td",{class:"r"},Be(_.top1,1)),z("td",{class:"r"},ye(_.tau,3)),z("td",{class:"r"},`${_.quickPiecesMedian}`),z("td",{class:"r"},_.onPolicyAgreement==null?"\u2014":Be(_.onPolicyAgreement,1))),w.appendChild(E)}T.appendChild(w);let y=z("div",{class:"table-wrap"});y.appendChild(T),b.append(y,z("p",{class:"card-note"},"\uC21C\uC704 \uC9C0\uD45C(regret\xB7top-1)\uB294 \uB77C\uC6B4\uB4DC\uB97C \uAC70\uCE58\uBA70 \uC870\uAE08\uC529 \uC88B\uC544\uC9C0\uC9C0\uB9CC \uBE60\uB978 \uD50C\uB808\uC774\uC758 \uC870\uAC01 \uC218\uB294 \uB530\uB77C \uC624\uB974\uC9C0 \uC54A\uC544\uC694.")),h.push(b)}}if(n.key==="B0"&&i.play.deaths50){let f=i.play.deaths50,M=z("div",{class:"card"});M.appendChild(z("div",{class:"card-title"},`\uC0AC\uB9DD \uC6D0\uC778 ${f.total} \uAC8C\uC784`));let A=z("div",{class:"kv"}),b={garbage:"\uAC00\uBE44\uC9C0\uC5D0 \uB20C\uB9BC","well-fill":"\uC6B0\uBB3C\uC744 \uC2A4\uC2A4\uB85C \uBA54\uC6C0",holes:"\uAD6C\uBA4D \uB204\uC801",stack:"\uC2A4\uD0DD\uC774 \uCC9C\uC7A5\uAE4C\uC9C0"};Object.entries(f.counts).forEach(([T,w],y)=>{y&&A.appendChild(z("div",{class:"divider"}));let _=z("div",{class:"row"}),E=z("div",{class:"grow"});E.appendChild(z("div",{class:"title"},b[T]??T)),_.append(E,z("div",{class:"val num"},`${w} / ${f.total} (${Be(w/f.total,0)})`)),A.appendChild(_)}),M.append(A,z("p",{class:"card-note"},`\uC0DD\uC874 ${Be(p.survival,0)} \xB7 \uAC00\uBE44\uC9C0 \uC0AC\uB9DD \uBE44\uC728 ${Be(f.garbageDeathShare,0)} \xB7 hold \uC0AC\uC6A9 ${ye(i.play.holdsPerPiece.student50,3)}/\uC870\uAC01 (\uAD50\uC0AC ${ye(i.play.holdsPerPiece.teacher,3)}).`)),h.push(M)}let x=i.weights,m=z("div",{class:"detail-grid"});return m.append(c("\uD50C\uB808\uC774",[["\uAC8C\uC784 \uC218",`${p.games}`,`\uC0C1\uD55C ${i.play.gate20.games===p.games,"1000"} \uC870\uAC01`],["\uC870\uAC01 \uC911\uC559\uAC12",`${p.piecesMedian}`,`\uC0AC\uBD84\uC704 ${p.piecesQuartiles?.join(" \xB7 ")??"\u2014"}`],["\uACF5\uACA9 \uC911\uC559\uAC12",`${p.attackMedian}`,`1000 \uC870\uAC01\uB2F9 ${ye(p.attackPer1000,1)}`],["\uD14C\uD2B8\uB9AC\uC2A4",`${p.tetrises}\uD68C`,`\uC911\uC559\uAC12 ${p.tetrisMedian} \xB7 \uC904 \uC810\uC720 ${Be(p.tetrisLineShare,1)}`],["\uC0DD\uC874\uC728",Be(p.survival,0),`\uBB34\uC791\uC704 \uBC30\uCE58 \uAE30\uC900\uC120 \uC870\uAC01 ${i.play.random?.piecesMedian??"\u2014"}`]]),c("\uBC30\uC120\uC774 \uD559\uC2B5\uC73C\uB85C \uC6C0\uC9C1\uC778 \uC815\uB3C4",[["corr(\uCD08\uAE30, \uCD5C\uC885)",ye(x.corr,3),"\uCD08\uAE30\uAC12\uC740 \uCEE4\uB125\uD1B0 \uC2DC\uB0C5\uC2A4 \uC218\uB97C \uC815\uADDC\uD654\uD55C \uAC12\uC774\uC5D0\uC694"],["\uD3C9\uADE0 |\u0394w|",ye(x.meanAbsDelta,4),`\uCD08\uAE30 \uD3C9\uADE0 \uAC00\uC911\uCE58 ${ye(x.meanInit,5)}`],["\uC5B5\uC81C\uC131 \uBE44\uC728",Be(x.inhibitoryFrac,1),"\uCEE4\uB125\uD1B0 \uAC00\uC911\uCE58\uB294 \uC804\uBD80 \uC591\uC218\uB77C \uCD08\uAE30\uC5D0\uB294 0%\uC600\uC5B4\uC694"],["\u2016W\u2016",`${ye(x.normInit,2)} \u2192 ${ye(x.normFinal,2)}`],["W_in \uBCF4\uB4DC \uC5F4 corr",ye(x.input.board.corr,3),"3\uB2E8\uACC4 \uAC00\uC6B0\uC2DC\uC548 RF \uCD08\uAE30\uAC12 \uB300\uBE44"]]),c("\uB370\uC774\uD130 \xB7 \uD558\uC774\uD37C",[["\uD559\uC2B5 \uACB0\uC815",i.data.trainDecisions.toLocaleString(),`\uAC80\uC99D ${i.data.valDecisions.toLocaleString()} \xB7 \uD14C\uC2A4\uD2B8 ${i.data.testDecisions.toLocaleString()}`],["\uC190\uC2E4",`${i.data.hyper.loss} (\u03BB ${i.data.hyper.lambda}, \u03BC ${i.data.hyper.mu})`,`K ${i.data.hyper.K} \xB7 DAgger ${i.data.hyper.daggerRounds}`],["\uC815\uADDC\uD654",`dropout ${i.data.hyper.dropoutZ} / ${i.data.hyper.dropoutH}`,`weight decay ${i.data.hyper.weightDecay}`],["\uC218\uC9D1 \uD30C\uC77C",i.data.dataFile],["\uAC78\uB9B0 \uC2DC\uAC04",`${ye(i.elapsedHours,2)} h`,new Date(i.ranAt).toLocaleString("ko-KR")]]),c("\uBAA8\uB378",[["\uB274\uB7F0 \xB7 \uAC04\uC120",`${i.model.N.toLocaleString()} \xB7 ${i.model.E.toLocaleString()}`],["\uC785\uB825 \xB7 \uCD9C\uB825",`${i.model.nInput.toLocaleString()} \xB7 ${i.model.nOutput}`,"LC/LPLC \u2192 DN"],["\uD30C\uB77C\uBBF8\uD130 P",i.model.P.toLocaleString(),`W ${i.model.sizes.W.toLocaleString()} \xB7 W_in ${i.model.sizes.Win.toLocaleString()} \xB7 b ${i.model.sizes.b.toLocaleString()} \xB7 \uB9AC\uB4DC\uC544\uC6C3 ${i.model.sizes.readout.toLocaleString()}`],["\uCC3D T \xB7 \u03C1_unit",`${i.model.T} \xB7 ${ye(i.model.rhoUnit,4)}`]])),h.push(m),a.replaceChildren(...h),!0}function Eb(i=location.hash){let e=i.replace(/^#\/?/,""),[t,n=""]=e.split("?"),s=t.split("/").filter(Boolean),r=Object.fromEntries(new URLSearchParams(n));return{segs:s,params:r,page:s[0]||"home"}}function Vp(i,{onChange:e}={}){let t=[...document.querySelectorAll(".page")],n=[...document.querySelectorAll(".nav a[data-route]")],s=null;function r(a){for(let h of t)h.hidden=h.id!==a;let c=document.getElementById(a),l=c?.dataset.page;for(let h of n)h.dataset.route===l?h.setAttribute("aria-current","page"):h.removeAttribute("aria-current");return document.title="Fly",c}function o(){let a=Eb(),l=(i[a.page]??i.home)(a)??"page-home",h=s;s=l,r(l),scrollTo({top:0,behavior:"instant"}),e?.(l,h,a)}return addEventListener("hashchange",o),o(),{resolve:o,get current(){return s}}}var Gp=matchMedia("(max-width: 767px)").matches||(navigator.hardwareConcurrency??8)<=4;if(location.search.includes("debug")){let i=document.createElement("pre");i.id="debug-log",document.body.appendChild(i);let e=`
`,t=(n,s)=>{i.textContent+=`[${n}] ${s.map(r=>r instanceof Error?`${r.message} ${r.stack}`:typeof r=="string"?r:JSON.stringify(r)).join(" ")}`+e};for(let n of["error","warn"]){let s=console[n].bind(console);console[n]=(...r)=>{t(n,r),s(...r)}}addEventListener("error",n=>t("uncaught",[n.message,n.filename,n.lineno])),addEventListener("unhandledrejection",n=>t("rejection",[String(n.reason?.stack??n.reason)])),addEventListener("load",()=>setTimeout(()=>{i.textContent+=`[ready] viewport ${innerWidth} scrollWidth ${document.documentElement.scrollWidth}`+e},3e3))}var hr=globalThis.__BUILD__??"",wb=hr?`?v=${hr}`:"";function Tb(){let i="f56400a7";if(!i||i===hr)return!1;let e=`fly.reload.${i}`;try{if(sessionStorage.getItem(e))return console.warn(`\uBE4C\uB4DC\uAC00 \uC5B4\uAE0B\uB098\uC694 (HTML ${hr||"(\uC5C6\uC74C)"} \u2260 \uCF54\uB4DC ${i}) \u2014 \uC774\uBBF8 \uD55C \uBC88 \uC0C8\uB85C\uACE0\uCE68\uD574\uC11C \uADF8\uB300\uB85C \uAC11\uB2C8\uB2E4`),!1;sessionStorage.setItem(e,"1")}catch{return!1}return console.warn(`\uBE4C\uB4DC\uAC00 \uC5B4\uAE0B\uB098 \uC0C8\uB85C\uACE0\uCE68\uD574\uC694 (HTML ${hr||"(\uC5C6\uC74C)"} \u2260 \uCF54\uB4DC ${i})`),location.reload(),!0}async function Wp(i){let e=await fetch(`data/${i}.json${wb}`);if(!e.ok)throw new Error(`${i}.json ${e.status}`);return e.json()}function Ab(i,e){let t=e.nodes.filter(r=>r.layer==="hidden"&&r.isKC).length,n={"m.N":i.model.N.toLocaleString(),"m.E":i.model.E.toLocaleString(),"m.P":i.model.P.toLocaleString(),"m.T":`${i.model.T}`,"m.nOut":`${i.model.nOutput}`,"m.phase":i.phase,"gate.pass":`${i.gate.passCount}/${i.gate.total}`,"rank.tau":ye(i.ranking.trained.tau,3),"rank.top1":Be(i.ranking.trained.top1,1),"rank.regret":ye(i.ranking.trained.relRegret,3),"play.pieces":`${i.play.gate20.piecesMedian}`,"teacher.pieces":`${i.teacher.play.piecesMedian}`,"graph.nodes":e.nodes.length.toLocaleString(),"graph.edges":e.edges.length.toLocaleString(),"graph.input":`${e.meta.counts.input}`,"graph.hidden":`${e.meta.counts.hidden}`,"graph.output":`${e.meta.counts.output}`,"graph.kcPct":`${(100*t/e.meta.counts.hidden).toFixed(1)}%`};document.querySelectorAll("[data-num]").forEach(r=>{let o=r.dataset.num;o in n&&(r.textContent=n[o])});let s=document.getElementById("settings-generated");s&&(s.textContent=new Date(i.generatedAt).toLocaleString("ko-KR",{dateStyle:"medium",timeStyle:"short"}))}function Cb(){let i=document.getElementById("settings-tuning"),e=Object.entries(Ap).flatMap(([n,s],r)=>{let o=z("div",{class:"row lg"}),a=z("div",{class:"grow"});a.append(z("div",{class:"title"},s.label),z("div",{class:"desc"},s.desc));let c=z("div",{class:"slider"}),l=z("input",{type:"range",min:String(s.min),max:String(s.max),step:String(s.step),"data-tune":n,"aria-label":s.label});return c.append(z("output",{id:`${n}-out`,class:"num"}),l),o.append(a,c),r?[z("div",{class:"divider"}),o]:[o]});i.replaceChildren(...e),document.getElementById("settings-keys").replaceChildren(...Cp.map(([n,s])=>{let r=z("span");for(let o of n)r.appendChild(z("kbd",{},o));return r.appendChild(z("em",{},s)),r}))}async function Rb(){if(Tb())return;let[i,e]=await Promise.all([Wp("graph-viz"),Wp("stage7")]);Ab(e,i),Cb(),await $f();let t=null,n=null,s=null,r=Rp((f,M)=>{f==="autoRotate"&&t?.setAutoRotate(M),f==="darkViz"&&(t?.setTheme(M?"dark":"light"),document.getElementById("connectome-canvas")?.classList.toggle("dark",M))});s=Bp(e,i),zp(e),Op(e);let o=document.getElementById("connectome-canvas");o.classList.toggle("dark",!!r.darkViz);try{t=kf(o,i,{mobile:Gp,theme:r.darkViz?"dark":"light",autoRotate:r.autoRotate})}catch(f){console.warn("3D unavailable",f)}let a=document.getElementById("connectome-hint");if(!t)document.getElementById("connectome-fallback").hidden=!1,document.getElementById("connectome-controls").querySelectorAll("input, select").forEach(f=>{f.disabled=!0});else{let f=[...new Set(i.nodes.map(A=>A.roi).filter(Boolean))].sort(),M=document.getElementById("roi-filter");for(let A of f)M.appendChild(z("option",{value:A},A));M.addEventListener("change",()=>t.setRoi(M.value)),document.getElementById("kc-toggle").addEventListener("change",A=>t.setKC(A.target.checked)),document.getElementById("edge-toggle").addEventListener("change",A=>t.setEdges(A.target.checked)),document.getElementById("shell-toggle").addEventListener("change",A=>t.setShell(A.target.checked));for(let A of(Gp?["\uBAA8\uBC14\uC77C: \uC911\uAC04\uCE35 1/3 \xB7 \uC2DC\uB0C5\uC2A4 2,000"]:[]).concat(["\uB4DC\uB798\uADF8 \uD68C\uC804","\uD720 \uD655\uB300"]))a.appendChild(z("span",{class:"tag"},A))}try{n=zf(document.getElementById("hero-canvas"))}catch(f){console.warn("hero 3D unavailable",f)}let c=i.nodes.filter(f=>f.layer==="output").map(f=>f.type),l=Qf(i,t),h=jf(f=>{l.setDecision(f),p(f)});h.setDnTypes(c),l.bindControls(document.getElementById("act-play")),l.bindControls(document.getElementById("connectome-play"));let u=tp(),d=ep(e);function p(f){let M=document.getElementById("connectome-decision"),A=document.getElementById("connectome-empty"),b=document.getElementById("connectome-play");if(!M)return;if(A&&(A.hidden=!!f),b&&(b.hidden=!f),!f){M.hidden=!0,M.replaceChildren(),A&&A.replaceChildren(Vf({desc:"\uC544\uB798 3D \uB294 \uCEE4\uB125\uD1B0 \uC790\uCCB4(\uBC30\uC120)\uC608\uC694. \uC5EC\uAE30\uC5D0 \uC810\uB4F1\uD560 \uB274\uB7F0 \uD65C\uC131\uC740 \uB300\uC804\uC5D0\uC11C \uCD08\uD30C\uB9AC\uAC00 \uC218\uB97C \uB458 \uB54C \uC0DD\uACA8\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uD55C \uD310 \uB450\uBA74 \uACB0\uC815\uB9C8\uB2E4 25 \uC2A4\uD15D\uC758 \uD65C\uC131\uC744 \uC7AC\uC0DD\uD560 \uC218 \uC788\uC5B4\uC694"}));return}M.hidden=!1;let T=f.trace;M.innerHTML=`<div class="card-title">\uC9C0\uAE08 \uC7AC\uC0DD \uC911\uC778 \uACB0\uC815</div>
      <div class="card-sub num">\uC870\uAC01 ${f.pieces+1}\uBC88\uC9F8 \xB7 \uD6C4\uBCF4 ${f.candidates.length}\uAC1C \xB7 \uC0DD\uAC01 ${f.ms} ms</div>
      <p class="card-note num">\uD45C\uBCF8 ${T?T.n.toLocaleString():"\u2014"} \uB274\uB7F0 \xB7 \uCC3D ${T?T.T:e.model.T} \uC2A4\uD15D \xB7 \uD65C\uC131 \uBC94\uC704 ${T?`${ye(T.min,3)} ~ ${ye(T.max,3)}`:"\u2014"}.
      \uC810\uC758 \uD06C\uAE30\uC640 \uC0C9\uC774 \uADF8 \uC2A4\uD15D\uC758 |\uD65C\uC131| \uC138\uAE30\uC608\uC694.</p>`}let g=Fp({settings:r,sampled:i.nodes.map(f=>f.i),build:hr,onRecord:()=>{m()}}),x=0;function m(){x||(x=setTimeout(()=>{x=0,s.refresh(),h.refresh(),u.refresh(),d.refresh()},400))}Xf(()=>m()),h.render(),u.render(),d.render(),h.decision||(l.setDecision(null),p(null)),Vp({home:()=>"page-home",versus:()=>"page-versus",matches:()=>"page-matches",connectome:()=>"page-connectome",decision:()=>"page-decision",activity:()=>"page-activity",analysis:()=>"page-analysis",experiments:({segs:f})=>f[1]&&Hp(e,f[1])?"page-experiment":"page-experiments",compare:()=>"page-compare",settings:()=>"page-settings"},{onChange(f){f==="page-connectome"?t?.resume():t?.pause(),f==="page-home"?n?.resume():n?.pause(),f==="page-versus"?g.activate():g.deactivate(),f==="page-activity"&&l.redraw(),f==="page-decision"&&h.refresh(),f==="page-matches"&&u.refresh(),f==="page-analysis"&&d.refresh()}})}Rb().catch(i=>{console.error(i);let e=z("div",{class:"card",style:"margin:24px;color:var(--red-500);font-weight:600"},`\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694: ${i.message}`);document.querySelector(".content").prepend(e),document.querySelectorAll(".page").forEach(t=>{t.hidden=!0})});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
