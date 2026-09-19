(()=>{var Ii={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qu=0,mc=1,ed=2;var Fr=1,td=2,Vs=3,Wn=0,en=1,on=2,Xn=0,Gs=1,gc=2,_c=3,xc=4,nd=5;var Zi=100,id=101,sd=102,rd=103,od=104,ad=200,ld=201,cd=202,hd=203,yc=204,vc=205,ud=206,dd=207,fd=208,pd=209,md=210,gd=211,_d=212,xd=213,yd=214,Wo=0,Xo=1,$o=2,Ss=3,qo=4,Yo=5,Ko=6,Zo=7,ga=0,vd=1,Md=2,In=0,Mc=1,bc=2,Sc=3,wc=4,Ec=5,Tc=6,Ac=7,ic="attached",bd="detached",Cc=300,Li=301,Ji=302,_a=303,xa=304,Or=306,wi=1e3,yn=1001,ws=1002,Ct=1003,ya=1004;var ji=1005;var Rt=1006,Ws=1007;var Pn=1008;var an=1009,Rc=1010,Ic=1011,Xs=1012,va=1013,Ln=1014,mn=1015,Dn=1016,Ma=1017,ba=1018,$s=1020,Pc=35902,Lc=35899,Dc=1021,Nc=1022,gn=1023,zn=1026,Di=1027,Sa=1028,wa=1029,Ni=1030,Ea=1031;var Ta=1033,Br=33776,kr=33777,zr=33778,Hr=33779,Aa=35840,Ca=35841,Ra=35842,Ia=35843,Pa=36196,La=37492,Da=37496,Na=37488,Ua=37489,Vr=37490,Fa=37491,Oa=37808,Ba=37809,ka=37810,za=37811,Ha=37812,Va=37813,Ga=37814,Wa=37815,Xa=37816,$a=37817,qa=37818,Ya=37819,Ka=37820,Za=37821,Ja=36492,ja=36494,Qa=36495,el=36283,tl=36284,Gr=36285,nl=36286;var Gi=2300,Wi=2301,Ho=2302,sc=2303,rc=2400,oc=2401,ac=2402,Sd=2500;var Uc=0,Wr=1,qs=2,wd=3200;var Xr=0,Ed=1,ui="",Nt="srgb",jt="srgb-linear",fr="linear",rt="srgb";var Vo=7680;var Td=519,Ad=512,Cd=513,Rd=514,il=515,Id=516,Pd=517,sl=518,Ld=519,Fc=35044;var Oc="300 es",Tn=2e3,Es=2001;function Up(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Fp(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Ts(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Dd(){let i=Ts("canvas");return i.style.display="block",i}var gu={},As=null;function pr(...i){let e="THREE."+i.shift();As?As("log",e,...i):console.log(e,...i)}function Nd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ie(...i){i=Nd(i);let e="THREE."+i.shift();if(As)As("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ve(...i){i=Nd(i);let e="THREE."+i.shift();if(As)As("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Vi(...i){let e=i.join(" ");e in gu||(gu[e]=!0,Ie(...i))}function Ud(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Fd={[Wo]:Xo,[$o]:Ko,[qo]:Zo,[Ss]:Yo,[Xo]:Wo,[Ko]:$o,[Zo]:qo,[Yo]:Ss},Cn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_u=1234567,ur=Math.PI/180,Xi=180/Math.PI;function An(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]).toLowerCase()}function Je(i,e,t){return Math.max(e,Math.min(t,i))}function Bc(i,e){return(i%e+e)%e}function Op(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Bp(i,e,t){return i!==e?(t-i)/(e-i):0}function dr(i,e,t){return(1-t)*i+t*e}function kp(i,e,t,n){return dr(i,e,1-Math.exp(-t*n))}function zp(i,e=1){return e-Math.abs(Bc(i,e*2)-e)}function Hp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Vp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Gp(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Wp(i,e){return i+Math.random()*(e-i)}function Xp(i){return i*(.5-Math.random())}function $p(i){i!==void 0&&(_u=i);let e=_u+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function qp(i){return i*ur}function Yp(i){return i*Xi}function Kp(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Zp(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Jp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function jp(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*g,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*g,a*l);break;case"ZYZ":i.set(c*g,c*f,a*h,a*l);break;default:Ie("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function En(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function at(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var $r={DEG2RAD:ur,RAD2DEG:Xi,generateUUID:An,clamp:Je,euclideanModulo:Bc,mapLinear:Op,inverseLerp:Bp,lerp:dr,damp:kp,pingpong:zp,smoothstep:Hp,smootherstep:Vp,randInt:Gp,randFloat:Wp,randFloatSpread:Xp,seededRandom:$p,degToRad:qp,radToDeg:Yp,isPowerOfTwo:Kp,ceilPowerOfTwo:Zp,floorPowerOfTwo:Jp,setQuaternionFromProperEuler:jp,normalize:at,denormalize:En},Gc=class Gc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Gc.prototype.isVector2=!0;var Oe=Gc,qt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(u!==x||c!==d||l!==f||h!==g){let m=c*d+l*f+h*g+u*x;m<0&&(d=-d,f=-f,g=-g,x=-x,m=-m);let p=1-a;if(m<.9995){let b=Math.acos(m),A=Math.sin(b);p=Math.sin(p*b)/A,a=Math.sin(a*b)/A,c=c*p+d*a,l=l*p+f*a,h=h*p+g*a,u=u*p+x*a}else{c=c*p+d*a,l=l*p+f*a,h=h*p+g*a,u=u*p+x*a;let b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-a*f,e[t+2]=l*g+h*f+a*d-c*u,e[t+3]=h*g-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){let l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Wc=class Wc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(xu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(xu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Dl.copy(this).projectOnVector(e),this.sub(Dl)}reflect(e){return this.sub(Dl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Je(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Wc.prototype.isVector3=!0;var G=Wc,Dl=new G,xu=new qt,Xc=class Xc{constructor(e,t,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],p=s[6],b=s[1],A=s[4],M=s[7],T=s[2],w=s[5],y=s[8];return r[0]=o*x+a*b+c*T,r[3]=o*m+a*A+c*w,r[6]=o*p+a*M+c*y,r[1]=l*x+h*b+u*T,r[4]=l*m+h*A+u*w,r[7]=l*p+h*M+u*y,r[2]=d*x+f*b+g*T,r[5]=d*m+f*A+g*w,r[8]=d*p+f*M+g*y,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(s*l-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=d*x,e[4]=(h*t-s*c)*x,e[5]=(s*r-a*t)*x,e[6]=f*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return Vi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Nl.makeScale(e,t)),this}rotate(e){return Vi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Nl.makeRotation(-e)),this}translate(e,t){return Vi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Nl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Xc.prototype.isMatrix3=!0;var We=Xc,Nl=new We,yu=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),vu=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Qp(){let i={enabled:!0,workingColorSpace:jt,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===rt&&(s.r=ni(s.r),s.g=ni(s.g),s.b=ni(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(s.r=bs(s.r),s.g=bs(s.g),s.b=bs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ui?fr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Vi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Vi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[jt]:{primaries:e,whitePoint:n,transfer:fr,toXYZ:yu,fromXYZ:vu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Nt},outputColorSpaceConfig:{drawingBufferColorSpace:Nt}},[Nt]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:yu,fromXYZ:vu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Nt}}}),i}var Ze=Qp();function ni(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function bs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ls,Jo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ls===void 0&&(ls=Ts("canvas")),ls.width=e.width,ls.height=e.height;let s=ls.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=ls}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Ts("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ni(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ni(t[n]/255)*255):t[n]=ni(t[n]);return{data:t,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},em=0,Cs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=An(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ul(s[o].image)):r.push(Ul(s[o]))}else r=Ul(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ul(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}var tm=0,Fl=new G,Ht=class i extends Cn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=yn,s=yn,r=Rt,o=Pn,a=gn,c=an,l=i.DEFAULT_ANISOTROPY,h=ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=An(),this.name="",this.source=new Cs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Oe(0,0),this.repeat=new Oe(1,1),this.center=new Oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Fl).x}get height(){return this.source.getSize(Fl).y}get depth(){return this.source.getSize(Fl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ie(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ie(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Cc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case wi:e.x=e.x-Math.floor(e.x);break;case yn:e.x=e.x<0?0:1;break;case ws:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case wi:e.y=e.y-Math.floor(e.y);break;case yn:e.y=e.y<0?0:1;break;case ws:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=Cc;Ht.DEFAULT_ANISOTROPY=1;var $c=class $c{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(l+1)/2,M=(f+1)/2,T=(p+1)/2,w=(h+d)/4,y=(u+x)/4,_=(g+m)/4;return A>M&&A>T?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=w/n,r=y/n):M>T?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=w/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=y/r,s=_/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-x)/b,this.z=(d-h)/b,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Je(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};$c.prototype.isVector4=!0;var lt=$c,jo=class extends Cn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new Ht(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Cs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},nn=class extends jo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},mr=class extends Ht{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Qo=class extends Ht{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Ct,this.minFilter=Ct,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var ma=class ma{constructor(e,t,n,s,r,o,a,c,l,h,u,d,f,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,x,m)}set(e,t,n,s,r,o,a,c,l,h,u,d,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ma().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/cs.setFromMatrixColumn(e,0).length(),r=1/cs.setFromMatrixColumn(e,1).length(),o=1/cs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-x*l,t[9]=-a*c,t[2]=x-d*l,t[6]=g+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,x=l*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,x=l*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+x,t[1]=c*u,t[5]=x*l+d,t[9]=f*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*c,f=o*l,g=a*c,x=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nm,e,im)}lookAt(e,t,n){let s=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),_i.crossVectors(n,hn),_i.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),_i.crossVectors(n,hn)),_i.normalize(),go.crossVectors(hn,_i),s[0]=_i.x,s[4]=go.x,s[8]=hn.x,s[1]=_i.y,s[5]=go.y,s[9]=hn.y,s[2]=_i.z,s[6]=go.z,s[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],b=n[3],A=n[7],M=n[11],T=n[15],w=s[0],y=s[4],_=s[8],E=s[12],R=s[1],L=s[5],O=s[9],D=s[13],C=s[2],N=s[6],F=s[10],z=s[14],J=s[3],Y=s[7],Z=s[11],ee=s[15];return r[0]=o*w+a*R+c*C+l*J,r[4]=o*y+a*L+c*N+l*Y,r[8]=o*_+a*O+c*F+l*Z,r[12]=o*E+a*D+c*z+l*ee,r[1]=h*w+u*R+d*C+f*J,r[5]=h*y+u*L+d*N+f*Y,r[9]=h*_+u*O+d*F+f*Z,r[13]=h*E+u*D+d*z+f*ee,r[2]=g*w+x*R+m*C+p*J,r[6]=g*y+x*L+m*N+p*Y,r[10]=g*_+x*O+m*F+p*Z,r[14]=g*E+x*D+m*z+p*ee,r[3]=b*w+A*R+M*C+T*J,r[7]=b*y+A*L+M*N+T*Y,r[11]=b*_+A*O+M*F+T*Z,r[15]=b*E+A*D+M*z+T*ee,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15],b=c*f-l*d,A=a*f-l*u,M=a*d-c*u,T=o*f-l*h,w=o*d-c*h,y=o*u-a*h;return t*(x*b-m*A+p*M)-n*(g*b-m*T+p*w)+s*(g*A-x*T+p*y)-r*(g*M-x*w+m*y)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],b=t*a-n*o,A=t*c-s*o,M=t*l-r*o,T=n*c-s*a,w=n*l-r*a,y=s*l-r*c,_=h*x-u*g,E=h*m-d*g,R=h*p-f*g,L=u*m-d*x,O=u*p-f*x,D=d*p-f*m,C=b*D-A*O+M*L+T*R-w*E+y*_;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/C;return e[0]=(a*D-c*O+l*L)*N,e[1]=(s*O-n*D-r*L)*N,e[2]=(x*y-m*w+p*T)*N,e[3]=(d*w-u*y-f*T)*N,e[4]=(c*R-o*D-l*E)*N,e[5]=(t*D-s*R+r*E)*N,e[6]=(m*M-g*y-p*A)*N,e[7]=(h*y-d*M+f*A)*N,e[8]=(o*O-a*R+l*_)*N,e[9]=(n*R-t*O-r*_)*N,e[10]=(g*w-x*M+p*b)*N,e[11]=(u*M-h*w-f*b)*N,e[12]=(a*E-o*L-c*_)*N,e[13]=(t*L-n*E+s*_)*N,e[14]=(x*A-g*T-m*b)*N,e[15]=(h*T-u*A+d*b)*N,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,g=r*u,x=o*h,m=o*u,p=a*u,b=c*l,A=c*h,M=c*u,T=n.x,w=n.y,y=n.z;return s[0]=(1-(x+p))*T,s[1]=(f+M)*T,s[2]=(g-A)*T,s[3]=0,s[4]=(f-M)*w,s[5]=(1-(d+p))*w,s[6]=(m+b)*w,s[7]=0,s[8]=(g+A)*y,s[9]=(m-b)*y,s[10]=(1-(d+x))*y,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=cs.set(s[0],s[1],s[2]).length(),a=cs.set(s[4],s[5],s[6]).length(),c=cs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),bn.copy(this);let l=1/o,h=1/a,u=1/c;return bn.elements[0]*=l,bn.elements[1]*=l,bn.elements[2]*=l,bn.elements[4]*=h,bn.elements[5]*=h,bn.elements[6]*=h,bn.elements[8]*=u,bn.elements[9]*=u,bn.elements[10]*=u,t.setFromRotationMatrix(bn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=Tn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),g,x;if(c)g=r/(o-r),x=o*r/(o-r);else if(a===Tn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Es)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Tn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),g,x;if(c)g=1/(o-r),x=o/(o-r);else if(a===Tn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===Es)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ma.prototype.isMatrix4=!0;var $e=ma,cs=new G,bn=new $e,nm=new G(0,0,0),im=new G(1,1,1),_i=new G,go=new G,hn=new G,Mu=new $e,bu=new qt,Hn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return bu.setFromEuler(this),this.setFromQuaternion(bu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hn.DEFAULT_ORDER="XYZ";var gr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},sm=0,Su=new G,hs=new qt,Zn=new $e,_o=new G,ir=new G,rm=new G,om=new qt,wu=new G(1,0,0),Eu=new G(0,1,0),Tu=new G(0,0,1),Au={type:"added"},am={type:"removed"},us={type:"childadded",child:null},Ol={type:"childremoved",child:null},Mt=class i extends Cn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=An(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new G,t=new Hn,n=new qt,s=new G(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new $e},normalMatrix:{value:new We}}),this.matrix=new $e,this.matrixWorld=new $e,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.multiply(hs),this}rotateOnWorldAxis(e,t){return hs.setFromAxisAngle(e,t),this.quaternion.premultiply(hs),this}rotateX(e){return this.rotateOnAxis(wu,e)}rotateY(e){return this.rotateOnAxis(Eu,e)}rotateZ(e){return this.rotateOnAxis(Tu,e)}translateOnAxis(e,t){return Su.copy(e).applyQuaternion(this.quaternion),this.position.add(Su.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(wu,e)}translateY(e){return this.translateOnAxis(Eu,e)}translateZ(e){return this.translateOnAxis(Tu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_o.copy(e):_o.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ir.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(ir,_o,this.up):Zn.lookAt(_o,ir,this.up),this.quaternion.setFromRotationMatrix(Zn),s&&(Zn.extractRotation(s.matrixWorld),hs.setFromRotationMatrix(Zn),this.quaternion.premultiply(hs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Au),us.child=e,this.dispatchEvent(us),us.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(am),Ol.child=e,this.dispatchEvent(Ol),Ol.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Au),us.child=e,this.dispatchEvent(us),us.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,e,rm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ir,om,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Mt.DEFAULT_UP=new G(0,1,0);Mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var tn=class extends Mt{constructor(){super(),this.isGroup=!0,this.type="Group"}},lm={type:"move"},Rs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,n),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(lm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new tn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Od={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xi={h:0,s:0,l:0},xo={h:0,s:0,l:0};function Bl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ue=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=Bc(e,1),t=Je(t,0,1),n=Je(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Bl(o,r,e+1/3),this.g=Bl(o,r,e),this.b=Bl(o,r,e-1/3)}return Ze.colorSpaceToWorking(this,s),this}setStyle(e,t=Nt){function n(r){r!==void 0&&parseFloat(r)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ie("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Nt){let n=Od[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ni(e.r),this.g=ni(e.g),this.b=ni(e.b),this}copyLinearToSRGB(e){return this.r=bs(e.r),this.g=bs(e.g),this.b=bs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Nt){return Ze.workingToColorSpace($t.copy(this),e),Math.round(Je($t.r*255,0,255))*65536+Math.round(Je($t.g*255,0,255))*256+Math.round(Je($t.b*255,0,255))}getHexString(e=Nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.workingToColorSpace($t.copy(this),t);let n=$t.r,s=$t.g,r=$t.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Nt){Ze.workingToColorSpace($t.copy(this),e);let t=$t.r,n=$t.g,s=$t.b;return e!==Nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(xi),this.setHSL(xi.h+e,xi.s+t,xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xi),e.getHSL(xo);let n=dr(xi.h,xo.h,t),s=dr(xi.s,xo.s,t),r=dr(xi.l,xo.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$t=new Ue;Ue.NAMES=Od;var Is=class extends Mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Sn=new G,Jn=new G,kl=new G,jn=new G,ds=new G,fs=new G,Cu=new G,zl=new G,Hl=new G,Vl=new G,Gl=new lt,Wl=new lt,Xl=new lt,Si=class i{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Sn.subVectors(e,t),s.cross(Sn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Sn.subVectors(s,t),Jn.subVectors(n,t),kl.subVectors(e,t);let o=Sn.dot(Sn),a=Sn.dot(Jn),c=Sn.dot(kl),l=Jn.dot(Jn),h=Jn.dot(kl),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,g=(o*h-a*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,jn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,jn.x),c.addScaledVector(o,jn.y),c.addScaledVector(a,jn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Gl.setScalar(0),Wl.setScalar(0),Xl.setScalar(0),Gl.fromBufferAttribute(e,t),Wl.fromBufferAttribute(e,n),Xl.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Gl,r.x),o.addScaledVector(Wl,r.y),o.addScaledVector(Xl,r.z),o}static isFrontFacing(e,t,n,s){return Sn.subVectors(n,t),Jn.subVectors(e,t),Sn.cross(Jn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Sn.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;ds.subVectors(s,n),fs.subVectors(r,n),zl.subVectors(e,n);let c=ds.dot(zl),l=fs.dot(zl);if(c<=0&&l<=0)return t.copy(n);Hl.subVectors(e,s);let h=ds.dot(Hl),u=fs.dot(Hl);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(ds,o);Vl.subVectors(e,r);let f=ds.dot(Vl),g=fs.dot(Vl);if(g>=0&&f<=g)return t.copy(r);let x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(fs,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Cu.subVectors(r,s),a=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(Cu,a);let p=1/(m+x+d);return o=x*p,a=d*p,t.copy(n).addScaledVector(ds,o).addScaledVector(fs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},fn=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(wn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(wn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=wn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,wn):wn.fromBufferAttribute(r,o),wn.applyMatrix4(e.matrixWorld),this.expandByPoint(wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yo.copy(n.boundingBox)),yo.applyMatrix4(e.matrixWorld),this.union(yo)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,wn),wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sr),vo.subVectors(this.max,sr),ps.subVectors(e.a,sr),ms.subVectors(e.b,sr),gs.subVectors(e.c,sr),yi.subVectors(ms,ps),vi.subVectors(gs,ms),Bi.subVectors(ps,gs);let t=[0,-yi.z,yi.y,0,-vi.z,vi.y,0,-Bi.z,Bi.y,yi.z,0,-yi.x,vi.z,0,-vi.x,Bi.z,0,-Bi.x,-yi.y,yi.x,0,-vi.y,vi.x,0,-Bi.y,Bi.x,0];return!$l(t,ps,ms,gs,vo)||(t=[1,0,0,0,1,0,0,0,1],!$l(t,ps,ms,gs,vo))?!1:(Mo.crossVectors(yi,vi),t=[Mo.x,Mo.y,Mo.z],$l(t,ps,ms,gs,vo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new G,new G,new G,new G,new G,new G,new G,new G],wn=new G,yo=new fn,ps=new G,ms=new G,gs=new G,yi=new G,vi=new G,Bi=new G,sr=new G,vo=new G,Mo=new G,ki=new G;function $l(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ki.fromArray(i,r);let a=s.x*Math.abs(ki.x)+s.y*Math.abs(ki.y)+s.z*Math.abs(ki.z),c=e.dot(ki),l=t.dot(ki),h=n.dot(ki);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Dt=new G,bo=new Oe,cm=0,Et=class extends Cn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Fc,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.applyMatrix3(e),this.setXY(t,bo.x,bo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=En(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=En(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=En(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=En(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var _r=class extends Et{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var xr=class extends Et{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var zt=class extends Et{constructor(e,t,n){super(new Float32Array(e),t,n)}},hm=new fn,rr=new G,ql=new G,sn=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):hm.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);let t=rr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(rr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ql.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(ql)),this.expandByPoint(rr.copy(e.center).sub(ql))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},um=0,xn=new $e,Yl=new Mt,_s=new G,un=new fn,or=new fn,kt=new G,Ut=class i extends Cn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:um++}),this.uuid=An(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Up(e)?xr:_r)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,n){return xn.makeTranslation(e,t,n),this.applyMatrix4(xn),this}scale(e,t,n){return xn.makeScale(e,t,n),this.applyMatrix4(xn),this}lookAt(e){return Yl.lookAt(e),Yl.updateMatrix(),this.applyMatrix4(Yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_s).negate(),this.translate(_s.x,_s.y,_s.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new zt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){let n=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];or.setFromBufferAttribute(a),this.morphTargetsRelative?(kt.addVectors(un.min,or.min),un.expandByPoint(kt),kt.addVectors(un.max,or.max),un.expandByPoint(kt)):(un.expandByPoint(or.min),un.expandByPoint(or.max))}un.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)kt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(kt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)kt.fromBufferAttribute(a,l),c&&(_s.fromBufferAttribute(e,l),kt.add(_s)),s=Math.max(s,n.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Et(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],c=[];for(let _=0;_<n.count;_++)a[_]=new G,c[_]=new G;let l=new G,h=new G,u=new G,d=new Oe,f=new Oe,g=new Oe,x=new G,m=new G;function p(_,E,R){l.fromBufferAttribute(n,_),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,R),d.fromBufferAttribute(r,_),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,R),h.sub(l),u.sub(l),f.sub(d),g.sub(d);let L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),a[_].add(x),a[E].add(x),a[R].add(x),c[_].add(m),c[E].add(m),c[R].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let _=0,E=b.length;_<E;++_){let R=b[_],L=R.start,O=R.count;for(let D=L,C=L+O;D<C;D+=3)p(e.getX(D+0),e.getX(D+1),e.getX(D+2))}let A=new G,M=new G,T=new G,w=new G;function y(_){T.fromBufferAttribute(s,_),w.copy(T);let E=a[_];A.copy(E),A.sub(T.multiplyScalar(T.dot(E))).normalize(),M.crossVectors(w,E);let L=M.dot(c[_])<0?-1:1;o.setXYZW(_,A.x,A.y,A.z,L)}for(let _=0,E=b.length;_<E;++_){let R=b[_],L=R.start,O=R.count;for(let D=L,C=L+O;D<C;D+=3)y(e.getX(D+0)),y(e.getX(D+1)),y(e.getX(D+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Et(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new G,r=new G,o=new G,a=new G,c=new G,l=new G,h=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let x=0,m=c.length;x<m;x++){a.isInterleavedBufferAttribute?f=c[x]*a.data.stride+a.offset:f=c[x]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Et(d,h,u)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ps=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Fc,this.updateRanges=[],this.version=0,this.uuid=An()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=An()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Jt=new G,Ls=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=En(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=En(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=En(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=En(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=En(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),s=at(s,this.array),r=at(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){pr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Et(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){pr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Kl=new G,dm=new G,fm=new We,dn=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Kl.subVectors(n,t).cross(dm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Kl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||fm.getNormalMatrix(e),s=this.coplanarPoint(Kl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},pm=0,Qt=class extends Cn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pm++}),this.uuid=An(),this.name="",this.type="Material",this.blending=Gs,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yc,this.blendDst=vc,this.blendEquation=Zi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Td,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vo,this.stencilZFail=Vo,this.stencilZPass=Vo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ie(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ie(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ue().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new dn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Oe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var ei=new G,Zl=new G,So=new G,wo=new G,ii=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Zl.copy(e).add(t).multiplyScalar(.5),So.copy(t).sub(e).normalize(),wo.copy(this.origin).sub(Zl);let r=e.distanceTo(t)*.5,o=-this.direction.dot(So),a=wo.dot(this.direction),c=-wo.dot(So),l=wo.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*c-a,d=o*a-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Zl).addScaledVector(So,d),f}intersectSphere(e,t){if(e.radius<0)return null;ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),s=ei.dot(ei)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,f=e.z-o.z,g=t.x-o.x,x=t.y-o.y,m=t.z-o.z,p=n.x-o.x,b=n.y-o.y,A=n.z-o.z,M=Math.abs(c),T=Math.abs(l),w=Math.abs(h),y,_,E,R,L,O,D,C,N,F,z,J;if(M>=T&&M>=w?(E=c,O=u,N=g,J=p,c>=0?(y=l,_=h,R=d,L=f,D=x,C=m,F=b,z=A):(y=h,_=l,R=f,L=d,D=m,C=x,F=A,z=b)):T>=w?(E=l,O=d,N=x,J=b,l>=0?(y=h,_=c,R=f,L=u,D=m,C=g,F=A,z=p):(y=c,_=h,R=u,L=f,D=g,C=m,F=p,z=A)):(E=h,O=f,N=m,J=A,h>=0?(y=c,_=l,R=u,L=d,D=g,C=x,F=p,z=b):(y=l,_=c,R=d,L=u,D=x,C=g,F=b,z=p)),E===0)return null;let Y=y/E,Z=_/E,ee=1/E,oe=R-Y*O,ae=L-Z*O,Be=D-Y*N,ve=C-Z*N,De=F-Y*J,U=z-Z*J,V=De*ve-U*Be,ie=oe*U-ae*De,be=Be*ae-ve*oe;if(s){if(V<0||ie<0||be<0)return null}else if((V<0||ie<0||be<0)&&(V>0||ie>0||be>0))return null;let ce=V+ie+be;if(ce===0)return null;let ze=ee*(V*O+ie*N+be*J);return(ce>0?ze<0:ze>0)?null:this.at(ze/ce,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Rn=class extends Qt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ru=new $e,zi=new ii,Eo=new sn,Iu=new G,To=new G,Ao=new G,Co=new G,Jl=new G,Ro=new G,Pu=new G,Io=new G,Gt=class extends Mt{constructor(e=new Ut,t=new Rn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){Ro.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Jl.fromBufferAttribute(u,e),o?Ro.addScaledVector(Jl,h):Ro.addScaledVector(Jl.sub(t),h))}t.add(Ro)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(r),zi.copy(e.ray).recast(e.near),!(Eo.containsPoint(zi.origin)===!1&&(zi.intersectSphere(Eo,Iu)===null||zi.origin.distanceToSquared(Iu)>(e.far-e.near)**2))&&(Ru.copy(r).invert(),zi.copy(e.ray).applyMatrix4(Ru),!(n.boundingBox!==null&&zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,zi)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),A=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,T=A;M<T;M+=3){let w=a.getX(M),y=a.getX(M+1),_=a.getX(M+2);s=Po(this,p,e,n,l,h,u,w,y,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let b=a.getX(m),A=a.getX(m+1),M=a.getX(m+2);s=Po(this,o,e,n,l,h,u,b,A,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],b=Math.max(m.start,f.start),A=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let M=b,T=A;M<T;M+=3){let w=M,y=M+1,_=M+2;s=Po(this,p,e,n,l,h,u,w,y,_),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let b=m,A=m+1,M=m+2;s=Po(this,o,e,n,l,h,u,b,A,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function mm(i,e,t,n,s,r,o,a){let c;if(e.side===en?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Wn,a),c===null)return null;Io.copy(a),Io.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(Io);return l<t.near||l>t.far?null:{distance:l,point:Io.clone(),object:i}}function Po(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,To),i.getVertexPosition(c,Ao),i.getVertexPosition(l,Co);let h=mm(i,e,t,n,To,Ao,Co,Pu);if(h){let u=new G;Si.getBarycoord(Pu,To,Ao,Co,u),s&&(h.uv=Si.getInterpolatedAttribute(s,a,c,l,u,new Oe)),r&&(h.uv1=Si.getInterpolatedAttribute(r,a,c,l,u,new Oe)),o&&(h.normal=Si.getInterpolatedAttribute(o,a,c,l,u,new G),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new G,materialIndex:0};Si.getNormal(To,Ao,Co,d.normal),h.face=d,h.barycoord=u}return h}var ar=new lt,Lu=new lt,Du=new lt,gm=new lt,Nu=new $e,Lo=new G,jl=new sn,Uu=new $e,Ql=new ii,yr=class extends Gt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ic,this.bindMatrix=new $e,this.bindMatrixInverse=new $e,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new fn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lo),this.boundingBox.expandByPoint(Lo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new sn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Lo),this.boundingSphere.expandByPoint(Lo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jl.copy(this.boundingSphere),jl.applyMatrix4(s),e.ray.intersectsSphere(jl)!==!1&&(Uu.copy(s).invert(),Ql.copy(e.ray).applyMatrix4(Uu),!(this.boundingBox!==null&&Ql.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Ql)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new lt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ic?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===bd?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ie("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Lu.fromBufferAttribute(s.attributes.skinIndex,e),Du.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(ar.copy(t),t.set(0,0,0,0)):(ar.set(...t,1),t.set(0,0,0)),ar.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Du.getComponent(r);if(o!==0){let a=Lu.getComponent(r);Nu.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(gm.copy(ar).applyMatrix4(Nu),o)}}return t.isVector4&&(t.w=ar.w),t.applyMatrix4(this.bindMatrixInverse)}},Ds=class extends Mt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Ns=class extends Ht{constructor(e=null,t=1,n=1,s,r,o,a,c,l=Ct,h=Ct,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Fu=new $e,_m=new $e,vr=class i{constructor(e=[],t=[]){this.uuid=An(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ie("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new $e)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new $e;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:_m;Fu.multiplyMatrices(a,t[r]),Fu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Ns(t,e,e,gn,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(Ie("Skeleton: No bone found with UUID:",r),o=new Ds),this.bones.push(o),this.boneInverses.push(new $e().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},si=class extends Et{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},xs=new $e,Ou=new $e,Do=[],Bu=new fn,xm=new $e,lr=new Gt,cr=new sn,$i=class extends Gt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new si(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,xm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xs),Bu.copy(e.boundingBox).applyMatrix4(xs),this.boundingBox.union(Bu)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new sn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xs),cr.copy(e.boundingSphere).applyMatrix4(xs),this.boundingSphere.union(cr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(lr.geometry=this.geometry,lr.material=this.material,lr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cr.copy(this.boundingSphere),cr.applyMatrix4(n),e.ray.intersectsSphere(cr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,xs),Ou.multiplyMatrices(n,xs),lr.matrixWorld=Ou,lr.raycast(e,Do);for(let o=0,a=Do.length;o<a;o++){let c=Do[o];c.instanceId=r,c.object=this,t.push(c)}Do.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new si(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ns(new Float32Array(s*this.count),s,this.count,Sa,mn));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Hi=new sn,ym=new Oe(.5,.5),No=new G,Us=class{constructor(e=new dn,t=new dn,n=new dn,s=new dn,r=new dn,o=new dn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],b=r[12],A=r[13],M=r[14],T=r[15];if(s[0].setComponents(l-o,f-h,p-g,T-b).normalize(),s[1].setComponents(l+o,f+h,p+g,T+b).normalize(),s[2].setComponents(l+a,f+u,p+x,T+A).normalize(),s[3].setComponents(l-a,f-u,p-x,T-A).normalize(),n)s[4].setComponents(c,d,m,M).normalize(),s[5].setComponents(l-c,f-d,p-m,T-M).normalize();else if(s[4].setComponents(l-c,f-d,p-m,T-M).normalize(),t===Tn)s[5].setComponents(l+c,f+d,p+m,T+M).normalize();else if(t===Es)s[5].setComponents(c,d,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hi)}intersectsSprite(e){Hi.center.set(0,0,0);let t=ym.distanceTo(e.center);return Hi.radius=.7071067811865476+t,Hi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hi)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(No.x=s.normal.x>0?e.max.x:e.min.x,No.y=s.normal.y>0?e.max.y:e.min.y,No.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(No)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ei=class extends Qt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ea=new G,ta=new G,ku=new $e,hr=new ii,Uo=new sn,ec=new G,zu=new G,qi=class extends Mt{constructor(e=new Ut,t=new Ei){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ea.fromBufferAttribute(t,s-1),ta.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ea.distanceTo(ta);e.setAttribute("lineDistance",new zt(n,1))}else Ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(s),Uo.radius+=r,e.ray.intersectsSphere(Uo)===!1)return;ku.copy(s).invert(),hr.copy(e.ray).applyMatrix4(ku);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let p=h.getX(x),b=h.getX(x+1),A=Fo(this,e,hr,c,p,b,x);A&&t.push(A)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),p=Fo(this,e,hr,c,x,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=l){let p=Fo(this,e,hr,c,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=Fo(this,e,hr,c,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Fo(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(ea.fromBufferAttribute(a,s),ta.fromBufferAttribute(a,r),t.distanceSqToSegment(ea,ta,ec,zu)>n)return;ec.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ec);if(!(l<e.near||l>e.far))return{distance:l,point:zu.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var Hu=new G,Vu=new G,Yi=class extends qi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Hu.fromBufferAttribute(t,s),Vu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Hu.distanceTo(Vu);e.setAttribute("lineDistance",new zt(n,1))}else Ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Mr=class extends qi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Fs=class extends Qt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gu=new $e,lc=new ii,Oo=new sn,Bo=new G,br=class extends Mt{constructor(e=new Ut,t=new Fs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Oo.copy(n.boundingSphere),Oo.applyMatrix4(s),Oo.radius+=r,e.ray.intersectsSphere(Oo)===!1)return;Gu.copy(s).invert(),lc.copy(e.ray).applyMatrix4(Gu);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let g=d,x=f;g<x;g++){let m=l.getX(g);Bo.fromBufferAttribute(u,m),Wu(Bo,m,c,s,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)Bo.fromBufferAttribute(u,g),Wu(Bo,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Wu(i,e,t,n,s,r,o){let a=lc.distanceSqToPoint(i);if(a<t){let c=new G;lc.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Sr=class extends Ht{constructor(e=[],t=Li,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Ti=class extends Ht{constructor(e,t,n=Ln,s,r,o,a=Ct,c=Ct,l,h=zn,u=1){if(h!==zn&&h!==Di)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},na=class extends Ti{constructor(e,t=Ln,n=Li,s,r,o=Ct,a=Ct,c,l=zn){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},wr=class extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Os=class i extends Ut{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new zt(l,3)),this.setAttribute("normal",new zt(h,3)),this.setAttribute("uv",new zt(u,2));function g(x,m,p,b,A,M,T,w,y,_,E){let R=M/y,L=T/_,O=M/2,D=T/2,C=w/2,N=y+1,F=_+1,z=0,J=0,Y=new G;for(let Z=0;Z<F;Z++){let ee=Z*L-D;for(let oe=0;oe<N;oe++){let ae=oe*R-O;Y[x]=ae*b,Y[m]=ee*A,Y[p]=C,l.push(Y.x,Y.y,Y.z),Y[x]=0,Y[m]=0,Y[p]=w>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(oe/y),u.push(1-Z/_),z+=1}}for(let Z=0;Z<_;Z++)for(let ee=0;ee<y;ee++){let oe=d+ee+N*Z,ae=d+ee+N*(Z+1),Be=d+(ee+1)+N*(Z+1),ve=d+(ee+1)+N*Z;c.push(oe,ae,ve),c.push(ae,Be,ve),J+=6}a.addGroup(f,J,E),f+=J,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Er=class i extends Ut{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,d=t/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let b=p*d-o;for(let A=0;A<l;A++){let M=A*u-r;g.push(M,-b,0),x.push(0,0,1),m.push(A/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let b=0;b<a;b++){let A=b+l*p,M=b+l*(p+1),T=b+1+l*(p+1),w=b+1+l*p;f.push(A,M,w),f.push(M,T,w)}this.setIndex(f),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(x,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var Tr=class i extends Ut{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new G,d=new G,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){let b=[],A=p/n,M=o+A*a,T=e*Math.cos(M),w=Math.sqrt(e*e-T*T),y=0;p===0&&o===0?y=.5/t:p===n&&c===Math.PI&&(y=-.5/t);for(let _=0;_<=t;_++){let E=_/t,R=s+E*r;u.x=-w*Math.cos(R),u.y=T,u.z=w*Math.sin(R),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(E+y,1-A),b.push(l++)}h.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){let A=h[p][b+1],M=h[p][b],T=h[p+1][b],w=h[p+1][b+1];(p!==0||o>0)&&f.push(A,M,w),(p!==n-1||c<Math.PI)&&f.push(M,T,w)}this.setIndex(f),this.setAttribute("position",new zt(g,3)),this.setAttribute("normal",new zt(x,3)),this.setAttribute("uv",new zt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Qi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Xu(s))s.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Xu(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Kt(i){let e={};for(let t=0;t<i.length;t++){let n=Qi(i[t]);for(let s in n)e[s]=n[s]}return e}function Xu(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function vm(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function kc(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}var Bd={clone:Qi,merge:Kt},Mm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pn=class extends Qt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mm,this.fragmentShader=bm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=vm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ue().setHex(s.value);break;case"v2":this.uniforms[n].value=new Oe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new G().fromArray(s.value);break;case"v4":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new We().fromArray(s.value);break;case"m4":this.uniforms[n].value=new $e().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ia=class extends pn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ri=class extends Qt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xr,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Yt=class extends ri{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var Ar=class extends Qt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xr,this.normalScale=new Oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=ga,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},sa=class extends Qt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ra=class extends Qt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function bi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Go(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function Sm(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function $u(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function wm(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}var Vn=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},oa=class extends Vn{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:rc,endingEnd:rc}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case oc:r=e,a=2*t-n;break;case ac:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case oc:o=e,c=2*n-t;break;case ac:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,b=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,A=(-1-f)*m+(1.5+f)*x+.5*g,M=f*m-f*x;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+b*o[l+T]+A*o[c+T]+M*o[u+T];return r}},aa=class extends Vn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},la=class extends Vn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ca=class extends Vn{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(n-t)/(s-t),x=1-g;for(let m=0;m!==a;++m)r[m]=o[l+m]*x+o[c+m]*g;return r}let d=a*2,f=e-1;for(let g=0;g!==a;++g){let x=o[l+g],m=o[c+g],p=f*d+g*2,b=u[p],A=u[p+1],M=e*d+g*2,T=h[M],w=h[M+1],y=Tm(n,t,b,T,s);r[g]=kd(y,x,A,w,m)}return r}};function kd(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Em(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Tm(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=kd(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let c=Em(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}var rn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=bi(t,this.TimeBufferType),this.values=bi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:bi(e.times,Array),values:bi(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Go(e.settings)&&(n.settings={inTangents:bi(e.settings.inTangents,Array),outTangents:bi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new la(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new aa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new oa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ca(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Gi:t=this.InterpolantFactoryMethodDiscrete;break;case Wi:t=this.InterpolantFactoryMethodLinear;break;case Ho:t=this.InterpolantFactoryMethodSmooth;break;case sc:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ie("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gi;case this.InterpolantFactoryMethodLinear:return Wi;case this.InterpolantFactoryMethodSmooth:return Ho;case this.InterpolantFactoryMethodBezier:return sc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Go(this.settings)&&(qu(this.settings.inTangents,e),qu(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ve("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ve("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){Ve("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){Ve("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Fp(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){Ve("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ho,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Go(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function qu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}rn.prototype.ValueTypeName="";rn.prototype.TimeBufferType=Float32Array;rn.prototype.ValueBufferType=Float32Array;rn.prototype.DefaultInterpolation=Wi;var oi=class extends rn{constructor(e,t,n){super(e,t,n)}};oi.prototype.ValueTypeName="bool";oi.prototype.ValueBufferType=Array;oi.prototype.DefaultInterpolation=Gi;oi.prototype.InterpolantFactoryMethodLinear=void 0;oi.prototype.InterpolantFactoryMethodSmooth=void 0;var Cr=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};Cr.prototype.ValueTypeName="color";var ai=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};ai.prototype.ValueTypeName="number";var ha=class extends Vn{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t),l=e*a;for(let h=l+a;l!==h;l+=4)qt.slerpFlat(r,0,o,l-a,o,l,c);return r}},li=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new ha(this.times,this.values,this.getValueSize(),e)}};li.prototype.ValueTypeName="quaternion";li.prototype.InterpolantFactoryMethodSmooth=void 0;var ci=class extends rn{constructor(e,t,n){super(e,t,n)}};ci.prototype.ValueTypeName="string";ci.prototype.ValueBufferType=Array;ci.prototype.DefaultInterpolation=Gi;ci.prototype.InterpolantFactoryMethodLinear=void 0;ci.prototype.InterpolantFactoryMethodSmooth=void 0;var Ai=class extends rn{constructor(e,t,n,s){super(e,t,n,s)}};Ai.prototype.ValueTypeName="vector";var Rr=class{constructor(e="",t=-1,n=[],s=Sd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=An(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Cm(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(rn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=Sm(c);c=$u(c,1,h),l=$u(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new ai(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(l)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Am(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ai;case"vector":case"vector2":case"vector3":case"vector4":return Ai;case"color":return Cr;case"quaternion":return li;case"bool":case"boolean":return oi;case"string":return ci}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Cm(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Am(i.type);if(i.times===void 0){let n=[],s=[];wm(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Go(i.settings)&&(t.settings={inTangents:bi(i.settings.inTangents,Float32Array),outTangents:bi(i.settings.outTangents,Float32Array)}),t}var kn={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Yu(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Yu(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Yu(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ua=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},zd=new ua,Gn=class{constructor(e){this.manager=e!==void 0?e:zd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Gn.DEFAULT_MATERIAL_NAME="__DEFAULT";var ti={},cc=class extends Error{constructor(e,t){super(e),this.response=t}},Bs=class extends Gn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=kn.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ti[e]!==void 0){ti[e].push({onLoad:t,onProgress:n,onError:s});return}ti[e]=[],ti[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ie("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=ti[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,x=0,m=new ReadableStream({start(p){b();function b(){u.read().then(({done:A,value:M})=>{if(A)p.close();else{x+=M.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let w=0,y=h.length;w<y;w++){let _=h[w];_.onProgress&&_.onProgress(T)}p.enqueue(M),b()}},A=>{p.error(A)})}}});return new Response(m)}else throw new cc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{kn.add(`file:${e}`,l);let h=ti[e];delete ti[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=ti[e];if(h===void 0)throw this.manager.itemError(e),l;delete ti[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var ys=new WeakMap,da=class extends Gn{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=kn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=ys.get(o);u===void 0&&(u=[],ys.set(o,u)),u.push({onLoad:t,onError:s})}return o}let a=Ts("img");function c(){h(),t&&t(this);let u=ys.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}ys.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),kn.remove(`image:${e}`);let d=ys.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}ys.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),kn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}};var Ir=class extends Gn{constructor(e){super(e)}load(e,t,n,s){let r=new Ht,o=new da(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ki=class extends Mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var tc=new $e,Ku=new G,Zu=new G,ks=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Oe(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new $e,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Us,this._frameExtents=new Oe(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Ku.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ku),Zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Zu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){tc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(tc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Es||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(tc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ko=new G,zo=new qt,Bn=new G,Pr=class extends Mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $e,this.projectionMatrix=new $e,this.projectionMatrixInverse=new $e,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ko,zo,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ko,zo,Bn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ko,zo,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ko,zo,Bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Mi=new G,Ju=new Oe,ju=new Oe,At=class extends Pr{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Xi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ur*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xi*2*Math.atan(Math.tan(ur*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z),Mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Mi.x,Mi.y).multiplyScalar(-e/Mi.z)}getViewSize(e,t){return this.getViewBounds(e,Ju,ju),t.subVectors(ju,Ju)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ur*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},hc=class extends ks{constructor(){super(new At(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Xi*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Lr=class extends Ki{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new hc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},uc=class extends ks{constructor(){super(new At(90,1,.5,500)),this.isPointLightShadow=!0}},Dr=class extends Ki{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new uc}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ci=class extends Pr{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},dc=class extends ks{constructor(){super(new Ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ri=class extends Ki{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Mt.DEFAULT_UP),this.updateMatrix(),this.target=new Mt,this.shadow=new dc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},zs=class extends Ki{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var hi=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var nc=new WeakMap,Nr=class extends Gn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ie("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ie("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=kn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{nc.has(o)===!0?(s&&s(nc.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return kn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),nc.set(c,l),kn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});kn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var vs=-90,Ms=1,fa=class extends Mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new At(vs,Ms,e,t);s.layers=this.layers,this.add(s);let r=new At(vs,Ms,e,t);r.layers=this.layers,this.add(r);let o=new At(vs,Ms,e,t);o.layers=this.layers,this.add(o);let a=new At(vs,Ms,e,t);a.layers=this.layers,this.add(a);let c=new At(vs,Ms,e,t);c.layers=this.layers,this.add(c);let l=new At(vs,Ms,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Es)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},pa=class extends At{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var zc="\\[\\]\\.:\\/",Rm=new RegExp("["+zc+"]","g"),Hc="[^"+zc+"]",Im="[^"+zc.replace("\\.","")+"]",Pm=/((?:WC+[\/:])*)/.source.replace("WC",Hc),Lm=/(WCOD+)?/.source.replace("WCOD",Im),Dm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hc),Nm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hc),Um=new RegExp("^"+Pm+Lm+Dm+Nm+"$"),Fm=["material","materials","bones","map"],fc=class{constructor(e,t,n){let s=n||ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ft=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rm,"")}static parseTrackName(e){let t=Um.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Fm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ie("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ve("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ve("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ve("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ve("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Ve("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[s];if(o===void 0){let l=t.nodeName;Ve("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ft.Composite=fc;ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ft.prototype.GetterByBindingType=[ft.prototype._getValue_direct,ft.prototype._getValue_array,ft.prototype._getValue_arrayElement,ft.prototype._getValue_toArray];ft.prototype.SetterByBindingTypeAndVersioning=[[ft.prototype._setValue_direct,ft.prototype._setValue_direct_setNeedsUpdate,ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_array,ft.prototype._setValue_array_setNeedsUpdate,ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_arrayElement,ft.prototype._setValue_arrayElement_setNeedsUpdate,ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ft.prototype._setValue_fromArray,ft.prototype._setValue_fromArray_setNeedsUpdate,ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var nM=new Float32Array(1);var Hs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Je(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Je(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var qc=class qc{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};qc.prototype.isMatrix2=!0;var pc=qc;var Ur=class extends Cn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Vc(i,e,t,n){let s=Om(n);switch(t){case Dc:return i*e;case Sa:return i*e/s.components*s.byteLength;case wa:return i*e/s.components*s.byteLength;case Ni:return i*e*2/s.components*s.byteLength;case Ea:return i*e*2/s.components*s.byteLength;case Nc:return i*e*3/s.components*s.byteLength;case gn:return i*e*4/s.components*s.byteLength;case Ta:return i*e*4/s.components*s.byteLength;case Br:case kr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case zr:case Hr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ca:case Ia:return Math.max(i,16)*Math.max(e,8)/4;case Aa:case Ra:return Math.max(i,8)*Math.max(e,8)/2;case Pa:case La:case Na:case Ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Da:case Vr:case Fa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Va:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ka:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ja:case ja:case Qa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case el:case tl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Gr:case nl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Om(i){switch(i){case an:case Rc:return{byteLength:1,components:1};case Xs:case Ic:case Dn:return{byteLength:2,components:1};case Ma:case ba:return{byteLength:2,components:4};case Ln:case va:case mn:return{byteLength:4,components:1};case Pc:case Lc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function cf(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function km(i){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];i.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var zm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Hm=`#ifdef USE_ALPHAHASH
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
#endif`,Vm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,$m=`#ifdef USE_AOMAP
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
#endif`,qm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ym=`#ifdef USE_BATCHING
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
#endif`,Km=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Zm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Qm=`#ifdef USE_IRIDESCENCE
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
#endif`,eg=`#ifdef USE_BUMPMAP
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
#endif`,tg=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ig=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,rg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,og=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ag=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,lg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,cg=`#define PI 3.141592653589793
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
} // validated`,hg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ug=`vec3 transformedNormal = objectNormal;
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
#endif`,dg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,fg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,pg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,mg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gg="gl_FragColor = linearToOutputTexel( gl_FragColor );",_g=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,xg=`#ifdef USE_ENVMAP
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
#endif`,yg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,vg=`#ifdef USE_ENVMAP
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
#endif`,Mg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bg=`#ifdef USE_ENVMAP
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
#endif`,Sg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,wg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Eg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ag=`#ifdef USE_GRADIENTMAP
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
}`,Cg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Pg=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Lg=`#ifdef USE_ENVMAP
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
#endif`,Dg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ng=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ug=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Og=`PhysicalMaterial material;
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
#endif`,Bg=`uniform sampler2D dfgLUT;
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
}`,kg=`
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
#endif`,zg=`#if defined( RE_IndirectDiffuse )
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
#endif`,Hg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Vg=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Gg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Wg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$g=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,qg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Yg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Kg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Zg=`#if defined( USE_POINTS_UV )
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
#endif`,Jg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Qg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,e0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,t0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,n0=`#ifdef USE_MORPHTARGETS
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
#endif`,i0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,s0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,r0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,o0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,a0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,l0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,c0=`#ifdef USE_NORMALMAP
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
#endif`,h0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,u0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,d0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,f0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,p0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,m0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,g0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,_0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,x0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,y0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,v0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,M0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,b0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,S0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,w0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,E0=`float getShadowMask() {
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
}`,T0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,A0=`#ifdef USE_SKINNING
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
#endif`,C0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,R0=`#ifdef USE_SKINNING
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
#endif`,I0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,P0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,L0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,D0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,N0=`#ifdef USE_TRANSMISSION
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
#endif`,U0=`#ifdef USE_TRANSMISSION
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
#endif`,F0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,O0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,B0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,z0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,H0=`uniform sampler2D t2D;
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
}`,V0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,G0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,W0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$0=`#include <common>
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
}`,q0=`#if DEPTH_PACKING == 3200
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
}`,Y0=`#define DISTANCE
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
}`,K0=`#define DISTANCE
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
}`,Z0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,J0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j0=`uniform float scale;
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
}`,Q0=`uniform vec3 diffuse;
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
}`,e_=`#include <common>
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
}`,t_=`uniform vec3 diffuse;
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
}`,n_=`#define LAMBERT
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
}`,i_=`#define LAMBERT
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
}`,s_=`#define MATCAP
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
}`,r_=`#define MATCAP
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
}`,o_=`#define NORMAL
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
}`,a_=`#define NORMAL
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
}`,l_=`#define PHONG
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
}`,c_=`#define PHONG
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
}`,h_=`#define STANDARD
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
}`,u_=`#define STANDARD
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
}`,d_=`#define TOON
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
}`,f_=`#define TOON
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
}`,p_=`uniform float size;
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
}`,m_=`uniform vec3 diffuse;
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
}`,g_=`#include <common>
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
}`,__=`uniform vec3 color;
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
}`,x_=`uniform float rotation;
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
}`,y_=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:zm,alphahash_pars_fragment:Hm,alphamap_fragment:Vm,alphamap_pars_fragment:Gm,alphatest_fragment:Wm,alphatest_pars_fragment:Xm,aomap_fragment:$m,aomap_pars_fragment:qm,batching_pars_vertex:Ym,batching_vertex:Km,begin_vertex:Zm,beginnormal_vertex:Jm,bsdfs:jm,iridescence_fragment:Qm,bumpmap_pars_fragment:eg,clipping_planes_fragment:tg,clipping_planes_pars_fragment:ng,clipping_planes_pars_vertex:ig,clipping_planes_vertex:sg,color_fragment:rg,color_pars_fragment:og,color_pars_vertex:ag,color_vertex:lg,common:cg,cube_uv_reflection_fragment:hg,defaultnormal_vertex:ug,displacementmap_pars_vertex:dg,displacementmap_vertex:fg,emissivemap_fragment:pg,emissivemap_pars_fragment:mg,colorspace_fragment:gg,colorspace_pars_fragment:_g,envmap_fragment:xg,envmap_common_pars_fragment:yg,envmap_pars_fragment:vg,envmap_pars_vertex:Mg,envmap_physical_pars_fragment:Lg,envmap_vertex:bg,fog_vertex:Sg,fog_pars_vertex:wg,fog_fragment:Eg,fog_pars_fragment:Tg,gradientmap_pars_fragment:Ag,lightmap_pars_fragment:Cg,lights_lambert_fragment:Rg,lights_lambert_pars_fragment:Ig,lights_pars_begin:Pg,lights_toon_fragment:Dg,lights_toon_pars_fragment:Ng,lights_phong_fragment:Ug,lights_phong_pars_fragment:Fg,lights_physical_fragment:Og,lights_physical_pars_fragment:Bg,lights_fragment_begin:kg,lights_fragment_maps:zg,lights_fragment_end:Hg,lightprobes_pars_fragment:Vg,logdepthbuf_fragment:Gg,logdepthbuf_pars_fragment:Wg,logdepthbuf_pars_vertex:Xg,logdepthbuf_vertex:$g,map_fragment:qg,map_pars_fragment:Yg,map_particle_fragment:Kg,map_particle_pars_fragment:Zg,metalnessmap_fragment:Jg,metalnessmap_pars_fragment:jg,morphinstance_vertex:Qg,morphcolor_vertex:e0,morphnormal_vertex:t0,morphtarget_pars_vertex:n0,morphtarget_vertex:i0,normal_fragment_begin:s0,normal_fragment_maps:r0,normal_pars_fragment:o0,normal_pars_vertex:a0,normal_vertex:l0,normalmap_pars_fragment:c0,clearcoat_normal_fragment_begin:h0,clearcoat_normal_fragment_maps:u0,clearcoat_pars_fragment:d0,iridescence_pars_fragment:f0,opaque_fragment:p0,packing:m0,premultiplied_alpha_fragment:g0,project_vertex:_0,dithering_fragment:x0,dithering_pars_fragment:y0,roughnessmap_fragment:v0,roughnessmap_pars_fragment:M0,shadowmap_pars_fragment:b0,shadowmap_pars_vertex:S0,shadowmap_vertex:w0,shadowmask_pars_fragment:E0,skinbase_vertex:T0,skinning_pars_vertex:A0,skinning_vertex:C0,skinnormal_vertex:R0,specularmap_fragment:I0,specularmap_pars_fragment:P0,tonemapping_fragment:L0,tonemapping_pars_fragment:D0,transmission_fragment:N0,transmission_pars_fragment:U0,uv_pars_fragment:F0,uv_pars_vertex:O0,uv_vertex:B0,worldpos_vertex:k0,background_vert:z0,background_frag:H0,backgroundCube_vert:V0,backgroundCube_frag:G0,cube_vert:W0,cube_frag:X0,depth_vert:$0,depth_frag:q0,distance_vert:Y0,distance_frag:K0,equirect_vert:Z0,equirect_frag:J0,linedashed_vert:j0,linedashed_frag:Q0,meshbasic_vert:e_,meshbasic_frag:t_,meshlambert_vert:n_,meshlambert_frag:i_,meshmatcap_vert:s_,meshmatcap_frag:r_,meshnormal_vert:o_,meshnormal_frag:a_,meshphong_vert:l_,meshphong_frag:c_,meshphysical_vert:h_,meshphysical_frag:u_,meshtoon_vert:d_,meshtoon_frag:f_,points_vert:p_,points_frag:m_,shadow_vert:g_,shadow_frag:__,sprite_vert:x_,sprite_frag:y_},me={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},qn={basic:{uniforms:Kt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:Kt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:Kt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:Kt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:Kt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ue(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:Kt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:Kt([me.points,me.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:Kt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:Kt([me.common,me.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:Kt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:Kt([me.sprite,me.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:Kt([me.common,me.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:Kt([me.lights,me.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};qn.physical={uniforms:Kt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};var rl={r:0,b:0,g:0},v_=new $e,hf=new We;hf.set(-1,0,0,0,1,0,0,0,1);function M_(i,e,t,n,s,r){let o=new Ue(0),a=s===!0?0:1,c,l,h=null,u=0,d=null;function f(b){let A=b.isScene===!0?b.background:null;if(A&&A.isTexture){let M=b.backgroundBlurriness>0;A=e.get(A,M)}return A}function g(b){let A=!1,M=f(b);M===null?m(o,a):M&&M.isColor&&(m(M,1),A=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(b,A){let M=f(A);M&&(M.isCubeTexture||M.mapping===Or)?(l===void 0&&(l=new Gt(new Os(1,1,1),new pn({name:"BackgroundCubeMaterial",uniforms:Qi(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,w,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(v_.makeRotationFromEuler(A.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(hf),l.material.toneMapped=Ze.getTransfer(M.colorSpace)!==rt,(h!==M||u!==M.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=M,u=M.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new Gt(new Er(2,2),new pn({name:"BackgroundMaterial",uniforms:Qi(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(M.colorSpace)!==rt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||u!==M.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=M,u=M.version,d=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function m(b,A){b.getRGB(rl,kc(i)),t.buffers.color.setClear(rl.r,rl.g,rl.b,A,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,A=1){o.set(b),a=A,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,m(o,a)},render:g,addToRenderList:x,dispose:p}}function b_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,o=!1;function a(L,O,D,C,N){let F=!1,z=u(L,C,D,O);r!==z&&(r=z,l(r.object)),F=f(L,C,D,N),F&&g(L,C,D,N),N!==null&&e.update(N,i.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,M(L,O,D,C),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(N).buffer))}function c(){return i.createVertexArray()}function l(L){return i.bindVertexArray(L)}function h(L){return i.deleteVertexArray(L)}function u(L,O,D,C){let N=C.wireframe===!0,F=n[O.id];F===void 0&&(F={},n[O.id]=F);let z=L.isInstancedMesh===!0?L.id:0,J=F[z];J===void 0&&(J={},F[z]=J);let Y=J[D.id];Y===void 0&&(Y={},J[D.id]=Y);let Z=Y[N];return Z===void 0&&(Z=d(c()),Y[N]=Z),Z}function d(L){let O=[],D=[],C=[];for(let N=0;N<t;N++)O[N]=0,D[N]=0,C[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:D,attributeDivisors:C,object:L,attributes:{},index:null}}function f(L,O,D,C){let N=r.attributes,F=O.attributes,z=0,J=D.getAttributes();for(let Y in J)if(J[Y].location>=0){let ee=N[Y],oe=F[Y];if(oe===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(oe=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(oe=L.instanceColor)),ee===void 0||ee.attribute!==oe||oe&&ee.data!==oe.data)return!0;z++}return r.attributesNum!==z||r.index!==C}function g(L,O,D,C){let N={},F=O.attributes,z=0,J=D.getAttributes();for(let Y in J)if(J[Y].location>=0){let ee=F[Y];ee===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(ee=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(ee=L.instanceColor));let oe={};oe.attribute=ee,ee&&ee.data&&(oe.data=ee.data),N[Y]=oe,z++}r.attributes=N,r.attributesNum=z,r.index=C}function x(){let L=r.newAttributes;for(let O=0,D=L.length;O<D;O++)L[O]=0}function m(L){p(L,0)}function p(L,O){let D=r.newAttributes,C=r.enabledAttributes,N=r.attributeDivisors;D[L]=1,C[L]===0&&(i.enableVertexAttribArray(L),C[L]=1),N[L]!==O&&(i.vertexAttribDivisor(L,O),N[L]=O)}function b(){let L=r.newAttributes,O=r.enabledAttributes;for(let D=0,C=O.length;D<C;D++)O[D]!==L[D]&&(i.disableVertexAttribArray(D),O[D]=0)}function A(L,O,D,C,N,F,z){z===!0?i.vertexAttribIPointer(L,O,D,N,F):i.vertexAttribPointer(L,O,D,C,N,F)}function M(L,O,D,C){x();let N=C.attributes,F=D.getAttributes(),z=O.defaultAttributeValues;for(let J in F){let Y=F[J];if(Y.location>=0){let Z=N[J];if(Z===void 0&&(J==="instanceMatrix"&&L.instanceMatrix&&(Z=L.instanceMatrix),J==="instanceColor"&&L.instanceColor&&(Z=L.instanceColor)),Z!==void 0){let ee=Z.normalized,oe=Z.itemSize,ae=e.get(Z);if(ae===void 0)continue;let Be=ae.buffer,ve=ae.type,De=ae.bytesPerElement,U=ve===i.INT||ve===i.UNSIGNED_INT||Z.gpuType===va;if(Z.isInterleavedBufferAttribute){let V=Z.data,ie=V.stride,be=Z.offset;if(V.isInstancedInterleavedBuffer){for(let ce=0;ce<Y.locationSize;ce++)p(Y.location+ce,V.meshPerAttribute);L.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let ce=0;ce<Y.locationSize;ce++)m(Y.location+ce);i.bindBuffer(i.ARRAY_BUFFER,Be);for(let ce=0;ce<Y.locationSize;ce++)A(Y.location+ce,oe/Y.locationSize,ve,ee,ie*De,(be+oe/Y.locationSize*ce)*De,U)}else{if(Z.isInstancedBufferAttribute){for(let V=0;V<Y.locationSize;V++)p(Y.location+V,Z.meshPerAttribute);L.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let V=0;V<Y.locationSize;V++)m(Y.location+V);i.bindBuffer(i.ARRAY_BUFFER,Be);for(let V=0;V<Y.locationSize;V++)A(Y.location+V,oe/Y.locationSize,ve,ee,oe*De,oe/Y.locationSize*V*De,U)}}else if(z!==void 0){let ee=z[J];if(ee!==void 0)switch(ee.length){case 2:i.vertexAttrib2fv(Y.location,ee);break;case 3:i.vertexAttrib3fv(Y.location,ee);break;case 4:i.vertexAttrib4fv(Y.location,ee);break;default:i.vertexAttrib1fv(Y.location,ee)}}}}b()}function T(){E();for(let L in n){let O=n[L];for(let D in O){let C=O[D];for(let N in C){let F=C[N];for(let z in F)h(F[z].object),delete F[z];delete C[N]}}delete n[L]}}function w(L){if(n[L.id]===void 0)return;let O=n[L.id];for(let D in O){let C=O[D];for(let N in C){let F=C[N];for(let z in F)h(F[z].object),delete F[z];delete C[N]}}delete n[L.id]}function y(L){for(let O in n){let D=n[O];for(let C in D){let N=D[C];if(N[L.id]===void 0)continue;let F=N[L.id];for(let z in F)h(F[z].object),delete F[z];delete N[L.id]}}}function _(L){for(let O in n){let D=n[O],C=L.isInstancedMesh===!0?L.id:0,N=D[C];if(N!==void 0){for(let F in N){let z=N[F];for(let J in z)h(z[J].object),delete z[J];delete N[F]}delete D[C],Object.keys(D).length===0&&delete n[O]}}}function E(){R(),o=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:y,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function S_(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function w_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let y=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(y){return!(y!==gn&&n.convert(y)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(y){let _=y===Dn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==an&&y!==mn&&!_&&n.convert(y)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(y){if(y==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ie("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:A,maxFragmentUniforms:M,maxSamples:T,samples:w}}function E_(i){let e=this,t=null,n=0,s=!1,r=!1,o=new dn,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{let b=r?0:n,A=b*4,M=p.clippingState||null;c.value=M,M=h(g,d,A,f);for(let T=0;T!==A;++T)M[T]=t[T];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=c.value,g!==!0||m===null){let p=f+x*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,M=f;A!==x;++A,M+=4)o.copy(u[A]).applyMatrix4(b,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}var Ks=4,T_=6,A_=20,C_=256,qr=new Ci,Hd=new Ue,Yc=null,Kc=0,Zc=0,Jc=!1,R_=new G,es=new G,al=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=R_}=r;Yc=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Yc,Kc,Zc),this._renderer.xr.enabled=Jc,e.scissorTest=!1,Ys(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===Ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Yc=this._renderer.getRenderTarget(),Kc=this._renderer.getActiveCubeFace(),Zc=this._renderer.getActiveMipmapLevel(),Jc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:Dn,format:gn,colorSpace:jt,depthBuffer:!1},s=Vd(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vd(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=I_(r)),this._blurMaterial=L_(r,e,t),this._ggxMaterial=P_(r,e,t)}return s}_compileMaterial(e){let t=new Gt(new Ut,e);this._renderer.compile(t,qr)}_sceneToCubeUV(e,t,n,s,r){let c=new At(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Hd),u.toneMapping=In,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Gt(new Os,new Rn({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,m=x.material,p=!1,b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,p=!0):(m.color.copy(Hd),p=!0);for(let A=0;A<6;A++){let M=A%3;M===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[A],r.y,r.z)):M===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[A]));let T=this._cubeSize;Ys(s,M*T,A>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(x,c),u.render(e,c)}u.toneMapping=f,u.autoClear=d,e.background=b}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Li||e.mapping===Ji;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gd());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Ys(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,qr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),d=l*1.25,f=u*d,{_lodMax:g}=this,x=this._sizeLods[n],m=3*x*(n>g-Ks?n-g+Ks:0),p=4*(this._cubeSize-x);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,Ys(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(a,qr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,Ys(e,m,p,3*x,2*x),s.setRenderTarget(e),s.render(a,qr)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){let o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;let l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],u=3*h*(s>this._lodMax-Ks?s-this._lodMax+Ks:0),d=4*(this._cubeSize-h);Ys(t,u,d,3*h,2*h),o.setRenderTarget(t),o.render(c,qr)}};function I_(i){let e=[],t=[],n=i,s=i-Ks+1+T_;for(let r=0;r<s;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,d=6,f=3,g=new Float32Array(f*d*u),x=new Float32Array(f*d*u);for(let p=0;p<u;p++){let b=p%3*2/3-1,A=p>2?0:-1,M=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];g.set(M,f*d*p);for(let T=0;T<d;T++){let w=h[T*2]*2-1,y=h[T*2+1]*2-1;p===0?es.set(1,y,w):p===1?es.set(-w,1,-y):p===2?es.set(-w,y,1):p===3?es.set(-1,y,-w):p===4?es.set(-w,-1,y):es.set(w,y,-1),es.toArray(x,(p*d+T)*f)}}let m=new Ut;m.setAttribute("position",new Et(g,f)),m.setAttribute("outputDirection",new Et(x,f)),t.push(new Gt(m,null)),n>Ks&&n--}return{lodMeshes:t,sizeLods:e}}function Vd(i,e,t){let n=new nn(i,e,t);return n.texture.mapping=Or,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ys(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function P_(i,e,t){return new pn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:C_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:cl(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function L_(i,e,t){return new pn({name:"SphericalGaussianBlur",defines:{SAMPLES:A_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:cl(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Gd(){return new pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cl(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Wd(){return new pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function cl(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ll=class extends nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Sr(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Os(5,5,5),r=new pn({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:Xn});r.uniforms.tEquirect.value=t;let o=new Gt(s,r),a=t.minFilter;return t.minFilter===Pn&&(t.minFilter=Rt),new fa(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function D_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===_a||f===xa)if(e.has(d)){let g=e.get(d).texture;return a(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let x=new ll(g.height);return x.fromEquirectangularTexture(i,d),e.set(d,x),d.addEventListener("dispose",l),a(x.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,g=f===_a||f===xa,x=f===Li||f===Ji;if(g||x){let m=t.get(d),p=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new al(i)),m=g?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),m.texture;if(m!==void 0)return m.texture;{let b=d.image;return g&&b&&b.height>0||x&&b&&c(b)?(n===null&&(n=new al(i)),m=g?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,t.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function a(d,f){return f===_a?d.mapping=Li:f===xa&&(d.mapping=Ji),d}function c(d){let f=0,g=6;for(let x=0;x<g;x++)d[x]!==void 0&&f++;return f===g}function l(d){let f=d.target;f.removeEventListener("dispose",l);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function N_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Vi("WebGLRenderer: "+n+" extension not supported."),s}}}function U_(i,e,t,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],i.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(g===void 0)return;if(f!==null){let b=f.array;x=f.version;for(let A=0,M=b.length;A<M;A+=3){let T=b[A+0],w=b[A+1],y=b[A+2];d.push(T,w,w,y,y,T)}}else{let b=g.array;x=g.version;for(let A=0,M=b.length/3-1;A<M;A+=3){let T=A+0,w=A+1,y=A+2;d.push(T,w,w,y,y,T)}}let m=new(g.count>=65535?xr:_r)(d,1);m.version=x;let p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function F_(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*o),t.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let x=0;for(let m=0;m<f;m++)x+=d[m];t.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function O_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Ve("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function B_(i,e,t){let n=new WeakMap,s=new lt;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let E=function(){y.dispose(),n.delete(a),a.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[],A=0;f===!0&&(A=1),g===!0&&(A=2),x===!0&&(A=3);let M=a.attributes.position.count*A,T=1;M>e.maxTextureSize&&(T=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);let w=new Float32Array(M*T*4*u),y=new mr(w,M,T,u);y.type=mn,y.needsUpdate=!0;let _=A*4;for(let R=0;R<u;R++){let L=m[R],O=p[R],D=b[R],C=M*T*4*R;for(let N=0;N<L.count;N++){let F=N*_;f===!0&&(s.fromBufferAttribute(L,N),w[C+F+0]=s.x,w[C+F+1]=s.y,w[C+F+2]=s.z,w[C+F+3]=0),g===!0&&(s.fromBufferAttribute(O,N),w[C+F+4]=s.x,w[C+F+5]=s.y,w[C+F+6]=s.z,w[C+F+7]=0),x===!0&&(s.fromBufferAttribute(D,N),w[C+F+8]=s.x,w[C+F+9]=s.y,w[C+F+10]=s.z,w[C+F+11]=D.itemSize===4?s.w:1)}}d={count:u,texture:y,size:new Oe(M,T)},n.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<l.length;x++)f+=l[x];let g=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function k_(i,e,t,n,s){let r=new WeakMap;function o(l){let h=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var z_={[Mc]:"LINEAR_TONE_MAPPING",[bc]:"REINHARD_TONE_MAPPING",[Sc]:"CINEON_TONE_MAPPING",[wc]:"ACES_FILMIC_TONE_MAPPING",[Tc]:"AGX_TONE_MAPPING",[Ac]:"NEUTRAL_TONE_MAPPING",[Ec]:"CUSTOM_TONE_MAPPING"};function H_(i,e,t,n,s,r){let o=new nn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,c=null,l=new Ut;l.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new zt([0,2,0,0,2,0],2));let h=new ia({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Gt(l,h),d=new Ci(-1,1,1,-1,0,1),f=null,g=null,x=!1,m,p=null,b=[],A=!1;this.setSize=function(M,T){o.setSize(M,T),a!==null&&a.setSize(M,T),c!==null&&c.setSize(M,T);for(let w=0;w<b.length;w++){let y=b[w];y.setSize&&y.setSize(M,T)}},this.setEffects=function(M){b=M,A=b.length>0&&b[0].isRenderPass===!0;let T=o.width,w=o.height;b.length>0&&a===null&&(a=new nn(T,w,{type:Dn,depthBuffer:!1,stencilBuffer:!1}),c=new nn(T,w,{type:Dn,depthBuffer:!1,stencilBuffer:!1}));for(let y=0;y<b.length;y++){let _=b[y];_.setSize&&_.setSize(T,w)}},this.begin=function(M,T){if(x||M.toneMapping===In&&b.length===0)return!1;if(p=T,T!==null){let w=T.width,y=T.height;(o.width!==w||o.height!==y)&&this.setSize(w,y)}return A===!1&&M.setRenderTarget(o),m=M.toneMapping,M.toneMapping=In,!0},this.hasRenderPass=function(){return A},this.end=function(M,T){M.toneMapping=m,x=!0;let w=o,y=a;for(let _=0;_<b.length;_++){let E=b[_];E.enabled!==!1&&(E.render(M,y,w,T),E.needsSwap!==!1&&(w=y,y=y===a?c:a))}if(f!==M.outputColorSpace||g!==M.toneMapping){f=M.outputColorSpace,g=M.toneMapping,h.defines={},Ze.getTransfer(f)===rt&&(h.defines.SRGB_TRANSFER="");let _=z_[g];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=w.texture,M.setRenderTarget(p),M.render(u,d),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}var uf=new Ht,eh=new Ti(1,1),df=new mr,ff=new Qo,pf=new Sr,Xd=[],$d=[],qd=new Float32Array(16),Yd=new Float32Array(9),Kd=new Float32Array(4);function Js(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Xd[s];if(r===void 0&&(r=new Float32Array(s),Xd[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Ft(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Ot(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function hl(i,e){let t=$d[e];t===void 0&&(t=new Int32Array(e),$d[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function V_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function G_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2fv(this.addr,e),Ot(t,e)}}function W_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ft(t,e))return;i.uniform3fv(this.addr,e),Ot(t,e)}}function X_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4fv(this.addr,e),Ot(t,e)}}function $_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;Kd.set(n),i.uniformMatrix2fv(this.addr,!1,Kd),Ot(t,n)}}function q_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;Yd.set(n),i.uniformMatrix3fv(this.addr,!1,Yd),Ot(t,n)}}function Y_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Ft(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Ft(t,n))return;qd.set(n),i.uniformMatrix4fv(this.addr,!1,qd),Ot(t,n)}}function K_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Z_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2iv(this.addr,e),Ot(t,e)}}function J_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3iv(this.addr,e),Ot(t,e)}}function j_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4iv(this.addr,e),Ot(t,e)}}function Q_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ex(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ft(t,e))return;i.uniform2uiv(this.addr,e),Ot(t,e)}}function tx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ft(t,e))return;i.uniform3uiv(this.addr,e),Ot(t,e)}}function nx(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ft(t,e))return;i.uniform4uiv(this.addr,e),Ot(t,e)}}function ix(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(eh.compareFunction=t.isReversedDepthBuffer()?sl:il,r=eh):r=uf,t.setTexture2D(e||r,s)}function sx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ff,s)}function rx(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||pf,s)}function ox(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||df,s)}function ax(i){switch(i){case 5126:return V_;case 35664:return G_;case 35665:return W_;case 35666:return X_;case 35674:return $_;case 35675:return q_;case 35676:return Y_;case 5124:case 35670:return K_;case 35667:case 35671:return Z_;case 35668:case 35672:return J_;case 35669:case 35673:return j_;case 5125:return Q_;case 36294:return ex;case 36295:return tx;case 36296:return nx;case 35678:case 36198:case 36298:case 36306:case 35682:return ix;case 35679:case 36299:case 36307:return sx;case 35680:case 36300:case 36308:case 36293:return rx;case 36289:case 36303:case 36311:case 36292:return ox}}function lx(i,e){i.uniform1fv(this.addr,e)}function cx(i,e){let t=Js(e,this.size,2);i.uniform2fv(this.addr,t)}function hx(i,e){let t=Js(e,this.size,3);i.uniform3fv(this.addr,t)}function ux(i,e){let t=Js(e,this.size,4);i.uniform4fv(this.addr,t)}function dx(i,e){let t=Js(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function fx(i,e){let t=Js(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function px(i,e){let t=Js(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function mx(i,e){i.uniform1iv(this.addr,e)}function gx(i,e){i.uniform2iv(this.addr,e)}function _x(i,e){i.uniform3iv(this.addr,e)}function xx(i,e){i.uniform4iv(this.addr,e)}function yx(i,e){i.uniform1uiv(this.addr,e)}function vx(i,e){i.uniform2uiv(this.addr,e)}function Mx(i,e){i.uniform3uiv(this.addr,e)}function bx(i,e){i.uniform4uiv(this.addr,e)}function Sx(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=eh:o=uf;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function wx(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||ff,r[o])}function Ex(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||pf,r[o])}function Tx(i,e,t){let n=this.cache,s=e.length,r=hl(t,s);Ft(n,r)||(i.uniform1iv(this.addr,r),Ot(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||df,r[o])}function Ax(i){switch(i){case 5126:return lx;case 35664:return cx;case 35665:return hx;case 35666:return ux;case 35674:return dx;case 35675:return fx;case 35676:return px;case 5124:case 35670:return mx;case 35667:case 35671:return gx;case 35668:case 35672:return _x;case 35669:case 35673:return xx;case 5125:return yx;case 36294:return vx;case 36295:return Mx;case 36296:return bx;case 35678:case 36198:case 36298:case 36306:case 35682:return Sx;case 35679:case 36299:case 36307:return wx;case 35680:case 36300:case 36308:case 36293:return Ex;case 36289:case 36303:case 36311:case 36292:return Tx}}var th=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ax(t.type)}},nh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ax(t.type)}},ih=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},jc=/(\w+)(\])?(\[|\.)?/g;function Zd(i,e){i.seq.push(e),i.map[e.id]=e}function Cx(i,e,t){let n=i.name,s=n.length;for(jc.lastIndex=0;;){let r=jc.exec(n),o=jc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Zd(t,l===void 0?new th(a,i,e):new nh(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new ih(a),Zd(t,u)),t=u}}}var Zs=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);Cx(a,c,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function Jd(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Rx=37297,Ix=0;function Px(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var jd=new We;function Lx(i){Ze._getMatrix(jd,Ze.workingColorSpace,i);let e=`mat3( ${jd.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case fr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Qd(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Px(i.getShaderSource(e),a)}else return r}function Dx(i,e){let t=Lx(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Nx={[Mc]:"Linear",[bc]:"Reinhard",[Sc]:"Cineon",[wc]:"ACESFilmic",[Tc]:"AgX",[Ac]:"Neutral",[Ec]:"Custom"};function Ux(i,e){let t=Nx[e];return t===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ol=new G;function Fx(){Ze.getLuminanceCoefficients(ol);let i=ol.x.toFixed(4),e=ol.y.toFixed(4),t=ol.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ox(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Kr).join(`
`)}function Bx(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function kx(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Kr(i){return i!==""}function ef(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var zx=/^[ \t]*#include +<([\w\d./]+)>/gm;function sh(i){return i.replace(zx,Vx)}var Hx=new Map;function Vx(i,e){let t=Ke[e];if(t===void 0){let n=Hx.get(e);if(n!==void 0)t=Ke[n],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return sh(t)}var Gx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nf(i){return i.replace(Gx,Wx)}function Wx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sf(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}var Xx={[Fr]:"SHADOWMAP_TYPE_PCF",[Vs]:"SHADOWMAP_TYPE_VSM"};function $x(i){return Xx[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var qx={[Li]:"ENVMAP_TYPE_CUBE",[Ji]:"ENVMAP_TYPE_CUBE",[Or]:"ENVMAP_TYPE_CUBE_UV"};function Yx(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":qx[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Kx={[Ji]:"ENVMAP_MODE_REFRACTION"};function Zx(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Kx[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Jx={[ga]:"ENVMAP_BLENDING_MULTIPLY",[vd]:"ENVMAP_BLENDING_MIX",[Md]:"ENVMAP_BLENDING_ADD"};function jx(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Jx[i.combine]||"ENVMAP_BLENDING_NONE"}function Qx(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ey(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=$x(t),l=Yx(t),h=Zx(t),u=jx(t),d=Qx(t),f=Ox(t),g=Bx(r),x=s.createProgram(),m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Kr).join(`
`),p.length>0&&(p+=`
`)):(m=[sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Kr).join(`
`),p=[sf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==In?"#define TONE_MAPPING":"",t.toneMapping!==In?Ke.tonemapping_pars_fragment:"",t.toneMapping!==In?Ux("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,Dx("linearToOutputTexel",t.outputColorSpace),Fx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Kr).join(`
`)),o=sh(o),o=ef(o,t),o=tf(o,t),a=sh(a),a=ef(a,t),a=tf(a,t),o=nf(o),a=nf(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let A=b+m+o,M=b+p+a,T=Jd(s,s.VERTEX_SHADER,A),w=Jd(s,s.FRAGMENT_SHADER,M);s.attachShader(x,T),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function y(L){if(i.debug.checkShaderErrors){let O=s.getProgramInfoLog(x)||"",D=s.getShaderInfoLog(T)||"",C=s.getShaderInfoLog(w)||"",N=O.trim(),F=D.trim(),z=C.trim(),J=!0,Y=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,w);else{let Z=Qd(s,T,"vertex"),ee=Qd(s,w,"fragment");Ve("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+N+`
`+Z+`
`+ee)}else N!==""?Ie("WebGLProgram: Program Info Log:",N):(F===""||z==="")&&(Y=!1);Y&&(L.diagnostics={runnable:J,programLog:N,vertexShader:{log:F,prefix:m},fragmentShader:{log:z,prefix:p}})}s.deleteShader(T),s.deleteShader(w),_=new Zs(s,x),E=kx(s,x)}let _;this.getUniforms=function(){return _===void 0&&y(this),_};let E;this.getAttributes=function(){return E===void 0&&y(this),E};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(x,Rx)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ix++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=w,this}var ty=0,rh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new oh(e),t.set(e,n)),n}},oh=class{constructor(e){this.id=ty++,this.code=e,this.usedTimes=0}};function ny(i){return i===Ni||i===Vr||i===Gr}function iy(i,e,t,n,s,r){let o=new gr,a=new rh,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return c.add(_),_===0?"uv":`uv${_}`}function x(_,E,R,L,O,D){let C=L.fog,N=O.geometry,F=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?L.environment:null,z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,J=e.get(_.envMap||F,z),Y=J&&J.mapping===Or?J.image.height:null,Z=f[_.type];_.precision!==null&&(d=n.getMaxPrecision(_.precision),d!==_.precision&&Ie("WebGLProgram.getParameters:",_.precision,"not supported, using",d,"instead."));let ee=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,oe=ee!==void 0?ee.length:0,ae=0;N.morphAttributes.position!==void 0&&(ae=1),N.morphAttributes.normal!==void 0&&(ae=2),N.morphAttributes.color!==void 0&&(ae=3);let Be,ve,De,U;if(Z){let mt=qn[Z];Be=mt.vertexShader,ve=mt.fragmentShader}else{Be=_.vertexShader,ve=_.fragmentShader;let mt=a.getVertexShaderStage(_),it=a.getFragmentShaderStage(_);a.update(_,mt,it),De=mt.id,U=it.id}let V=i.getRenderTarget(),ie=i.state.buffers.depth.getReversed(),be=O.isInstancedMesh===!0,ce=O.isBatchedMesh===!0,ze=!!_.map,xt=!!_.matcap,qe=!!J,tt=!!_.aoMap,ht=!!_.lightMap,je=!!_.bumpMap&&_.wireframe===!1,ot=!!_.normalMap,Pt=!!_.displacementMap,Vt=!!_.emissiveMap,yt=!!_.metalnessMap,wt=!!_.roughnessMap,P=_.anisotropy>0,_e=_.clearcoat>0,Fe=_.dispersion>0,I=_.retroreflectivity>0,v=_.iridescence>0,W=_.sheen>0,q=_.transmission>0,j=P&&!!_.anisotropyMap,re=_e&&!!_.clearcoatMap,le=_e&&!!_.clearcoatNormalMap,Q=_e&&!!_.clearcoatRoughnessMap,ne=v&&!!_.iridescenceMap,he=v&&!!_.iridescenceThicknessMap,Pe=W&&!!_.sheenColorMap,pe=W&&!!_.sheenRoughnessMap,ue=!!_.specularMap,Le=!!_.specularColorMap,ke=!!_.specularIntensityMap,Xe=q&&!!_.transmissionMap,H=q&&!!_.thicknessMap,de=!!_.gradientMap,te=!!_.alphaMap,fe=_.alphaTest>0,Me=!!_.alphaHash,se=!!_.extensions,Ne=In;_.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Ne=i.toneMapping);let Ce={shaderID:Z,shaderType:_.type,shaderName:_.name,vertexShader:Be,fragmentShader:ve,defines:_.defines,customVertexShaderID:De,customFragmentShaderID:U,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:d,batching:ce,batchingColor:ce&&O._colorsTexture!==null,instancing:be,instancingColor:be&&O.instanceColor!==null,instancingMorph:be&&O.morphTexture!==null,outputColorSpace:V===null?i.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Ze.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:ze,matcap:xt,envMap:qe,envMapMode:qe&&J.mapping,envMapCubeUVHeight:Y,aoMap:tt,lightMap:ht,bumpMap:je,normalMap:ot,displacementMap:Pt,emissiveMap:Vt,normalMapObjectSpace:ot&&_.normalMapType===Ed,normalMapTangentSpace:ot&&_.normalMapType===Xr,packedNormalMap:ot&&_.normalMapType===Xr&&ny(_.normalMap.format),metalnessMap:yt,roughnessMap:wt,anisotropy:P,anisotropyMap:j,clearcoat:_e,clearcoatMap:re,clearcoatNormalMap:le,clearcoatRoughnessMap:Q,dispersion:Fe,retroreflection:I,iridescence:v,iridescenceMap:ne,iridescenceThicknessMap:he,sheen:W,sheenColorMap:Pe,sheenRoughnessMap:pe,specularMap:ue,specularColorMap:Le,specularIntensityMap:ke,transmission:q,transmissionMap:Xe,thicknessMap:H,gradientMap:de,opaque:_.transparent===!1&&_.blending===Gs&&_.alphaToCoverage===!1,alphaMap:te,alphaTest:fe,alphaHash:Me,combine:_.combine,mapUv:ze&&g(_.map.channel),aoMapUv:tt&&g(_.aoMap.channel),lightMapUv:ht&&g(_.lightMap.channel),bumpMapUv:je&&g(_.bumpMap.channel),normalMapUv:ot&&g(_.normalMap.channel),displacementMapUv:Pt&&g(_.displacementMap.channel),emissiveMapUv:Vt&&g(_.emissiveMap.channel),metalnessMapUv:yt&&g(_.metalnessMap.channel),roughnessMapUv:wt&&g(_.roughnessMap.channel),anisotropyMapUv:j&&g(_.anisotropyMap.channel),clearcoatMapUv:re&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:le&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:he&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:pe&&g(_.sheenRoughnessMap.channel),specularMapUv:ue&&g(_.specularMap.channel),specularColorMapUv:Le&&g(_.specularColorMap.channel),specularIntensityMapUv:ke&&g(_.specularIntensityMap.channel),transmissionMapUv:Xe&&g(_.transmissionMap.channel),thicknessMapUv:H&&g(_.thicknessMap.channel),alphaMapUv:te&&g(_.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ot||P),vertexNormals:!!N.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!N.attributes.uv&&(ze||te),fog:!!C,useFog:_.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||N.attributes.normal===void 0&&ot===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ie,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:ae,numSunLights:E.sun.length,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numSunLightShadows:E.sunShadowMap.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:D.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ne,decodeVideoTexture:ze&&_.map.isVideoTexture===!0&&Ze.getTransfer(_.map.colorSpace)===rt,decodeVideoTextureEmissive:Vt&&_.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(_.emissiveMap.colorSpace)===rt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===on,flipSided:_.side===en,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:se&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(se&&_.extensions.multiDraw===!0||ce)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ce.vertexUv1s=c.has(1),Ce.vertexUv2s=c.has(2),Ce.vertexUv3s=c.has(3),c.clear(),Ce}function m(_){let E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(let R in _.defines)E.push(R),E.push(_.defines[R]);return _.isRawShaderMaterial===!1&&(p(E,_),b(E,_),E.push(i.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function p(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numSunLights),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numSunLightShadows),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function b(_,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.retroreflection&&o.enable(24),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function A(_){let E=f[_.type],R;if(E){let L=qn[E];R=Bd.clone(L.uniforms)}else R=_.uniforms;return R}function M(_,E){let R=h.get(E);return R!==void 0?++R.usedTimes:(R=new ey(i,E,_,s),l.push(R),h.set(E,R)),R}function T(_){if(--_.usedTimes===0){let E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),h.delete(_.cacheKey),_.destroy()}}function w(_){a.remove(_)}function y(){a.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:A,acquireProgram:M,releaseProgram:T,releaseShaderCache:w,programs:l,dispose:y}}function sy(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ry(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function rf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function of(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,g,x,m,p){let b=i[e];return b===void 0?(b={id:d.id,object:d,geometry:f,material:g,materialVariant:o(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:p},i[e]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=g,b.materialVariant=o(d),b.groupOrder=x,b.renderOrder=d.renderOrder,b.z=m,b.group=p),e++,b}function c(d,f,g,x,m,p,b){b.reversedDepth===!0&&(m=-m);let A=a(d,f,g,x,m,p);g.transmission>0?n.push(A):g.transparent===!0?s.push(A):t.push(A)}function l(d,f,g,x,m,p){let b=a(d,f,g,x,m,p);g.transmission>0?n.unshift(b):g.transparent===!0?s.unshift(b):t.unshift(b)}function h(d,f){t.length>1&&t.sort(d||ry),n.length>1&&n.sort(f||rf),s.length>1&&s.sort(f||rf)}function u(){for(let d=e,f=i.length;d<f;d++){let g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function oy(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new of,i.set(n,[o])):s>=r.length?(o=new of,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function ay(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new G,color:new Ue};break;case"SpotLight":t={position:new G,direction:new G,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new G,halfWidth:new G,halfHeight:new G};break}return i[e.id]=t,t}}}function ly(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var cy=0;function hy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function uy(i){let e=new ay,t=ly(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new G);let s=new G,r=new $e,o=new $e;function a(l){let h=0,u=0,d=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,b=0,A=0,M=0,T=0,w=0,y=0,_=0,E=0,R=0;l.sort(hy);for(let O=0,D=l.length;O<D;O++){let C=l[O],N=C.color,F=C.intensity,z=C.distance,J=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Ni?J=C.shadow.map.texture:J=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=N.r*F,u+=N.g*F,d+=N.b*F;else if(C.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(C.sh.coefficients[Y],F);R++}else if(C.isSunLight){let Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Z=C.shadow,ee=t.get(C);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize.copy(Z.mapSize).multiply(Z.getFrameExtents()),n.sunShadow[g]=ee,n.sunShadowMap[g]=J;let oe=Z.getViewportCount();for(let ae=0;ae<oe;ae++)n.sunShadowMatrix[x+ae]=Z.getMatrix(ae),n.sunShadowCascade[x+ae]=Z._cascadeData[ae];x+=oe,g++}n.sun[f]=Y,f++}else if(C.isDirectionalLight){let Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let Z=C.shadow,ee=t.get(C);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,n.directionalShadow[m]=ee,n.directionalShadowMap[m]=J,n.directionalShadowMatrix[m]=C.shadow.matrix,T++}n.directional[m]=Y,m++}else if(C.isSpotLight){let Y=e.get(C);Y.position.setFromMatrixPosition(C.matrixWorld),Y.color.copy(N).multiplyScalar(F),Y.distance=z,Y.coneCos=Math.cos(C.angle),Y.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Y.decay=C.decay,n.spot[b]=Y;let Z=C.shadow;if(C.map&&(n.spotLightMap[_]=C.map,_++,Z.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[b]=Z.matrix,C.castShadow){let ee=t.get(C);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,n.spotShadow[b]=ee,n.spotShadowMap[b]=J,y++}b++}else if(C.isRectAreaLight){let Y=e.get(C);Y.color.copy(N).multiplyScalar(F),Y.halfWidth.set(C.width*.5,0,0),Y.halfHeight.set(0,C.height*.5,0),n.rectArea[A]=Y,A++}else if(C.isPointLight){let Y=e.get(C);if(Y.color.copy(C.color).multiplyScalar(C.intensity),Y.distance=C.distance,Y.decay=C.decay,C.castShadow){let Z=C.shadow,ee=t.get(C);ee.shadowIntensity=Z.intensity,ee.shadowBias=Z.bias,ee.shadowNormalBias=Z.normalBias,ee.shadowRadius=Z.radius,ee.shadowMapSize=Z.mapSize,ee.shadowCameraNear=Z.camera.near,ee.shadowCameraFar=Z.camera.far,n.pointShadow[p]=ee,n.pointShadowMap[p]=J,n.pointShadowMatrix[p]=C.shadow.matrix,w++}n.point[p]=Y,p++}else if(C.isHemisphereLight){let Y=e.get(C);Y.skyColor.copy(C.color).multiplyScalar(F),Y.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[M]=Y,M++}}A>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let L=n.hash;(L.sunLength!==f||L.directionalLength!==m||L.pointLength!==p||L.spotLength!==b||L.rectAreaLength!==A||L.hemiLength!==M||L.numSunShadows!==g||L.numDirectionalShadows!==T||L.numPointShadows!==w||L.numSpotShadows!==y||L.numSpotMaps!==_||L.numLightProbes!==R)&&(n.sun.length=f,n.directional.length=m,n.spot.length=b,n.rectArea.length=A,n.point.length=p,n.hemi.length=M,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=y,n.spotShadowMap.length=y,n.spotLightMatrix.length=y+_-E,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=R,L.sunLength=f,L.directionalLength=m,L.pointLength=p,L.spotLength=b,L.rectAreaLength=A,L.hemiLength=M,L.numSunShadows=g,L.numDirectionalShadows=T,L.numPointShadows=w,L.numSpotShadows=y,L.numSpotMaps=_,L.numLightProbes=R,n.version=cy++)}function c(l,h){let u=0,d=0,f=0,g=0,x=0,m=0,p=h.matrixWorldInverse;for(let b=0,A=l.length;b<A;b++){let M=l[b];if(M.isSunLight){let T=n.sun[u];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(p),u++}else if(M.isDirectionalLight){let T=n.directional[d];T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),d++}else if(M.isSpotLight){let T=n.spot[g];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),g++}else if(M.isRectAreaLight){let T=n.rectArea[x];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(M.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(M.width*.5,0,0),T.halfHeight.set(0,M.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),x++}else if(M.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(M.matrixWorld),T.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){let T=n.hemi[m];T.direction.setFromMatrixPosition(M.matrixWorld),T.direction.transformDirection(p),m++}}}return{setup:a,setupView:c,state:n}}function af(i){let e=new uy(i),t=[],n=[],s=[];function r(d){u.camera=d,t.length=0,n.length=0,s.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function c(d){s.push(d)}function l(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function dy(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new af(i),e.set(s,[a])):r>=o.length?(a=new af(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var fy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,py=`uniform sampler2D shadow_pass;
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
}`,my=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],gy=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],lf=new $e,Yr=new G,Qc=new G;function _y(i,e,t){let n=new Us,s=new Oe,r=new Oe,o=new lt,a=new sa,c=new ra,l={},h=t.maxTextureSize,u={[Wn]:en,[en]:Wn,[on]:on},d=new pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Oe},radius:{value:4}},vertexShader:fy,fragmentShader:py}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ut;g.setAttribute("position",new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Gt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fr;let p=this.type;this.render=function(w,y,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===td&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Fr);let E=i.getRenderTarget(),R=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Xn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let D=p!==this.type;D&&y.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(N=>N.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,N=w.length;C<N;C++){let F=w[C],z=F.shadow;if(z===void 0){Ie("WebGLShadowMap:",F,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let J=z.getFrameExtents();s.multiply(J),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/J.x),s.x=r.x*J.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/J.y),s.y=r.y*J.y,z.mapSize.y=r.y));let Y=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=Y,z.map===null||D===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Vs){if(F.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new nn(s.x,s.y,{format:Ni,type:Dn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),z.map.texture.name=F.name+".shadowMap",z.map.depthTexture=new Ti(s.x,s.y,mn),z.map.depthTexture.name=F.name+".shadowMapDepth",z.map.depthTexture.format=zn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ct,z.map.depthTexture.magFilter=Ct}else F.isPointLight?(z.map=new ll(s.x),z.map.depthTexture=new na(s.x,Ln)):(z.map=new nn(s.x,s.y),z.map.depthTexture=new Ti(s.x,s.y,Ln)),z.map.depthTexture.name=F.name+".shadowMap",z.map.depthTexture.format=zn,this.type===Fr?(z.map.depthTexture.compareFunction=Y?sl:il,z.map.depthTexture.minFilter=Rt,z.map.depthTexture.magFilter=Rt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ct,z.map.depthTexture.magFilter=Ct);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==s.x||z.map.height!==s.y)&&z.map.setSize(s.x,s.y);let Z=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();F.isPointLight!==!0&&z.updateMatrices(F,_);for(let ee=0;ee<Z;ee++){let oe=z.getCamera(ee);if(F.isPointLight){let ae=z.camera,Be=z.matrix,ve=F.distance||ae.far;ve!==ae.far&&(ae.far=ve,ae.updateProjectionMatrix()),Yr.setFromMatrixPosition(F.matrixWorld),ae.position.copy(Yr),Qc.copy(ae.position),Qc.add(my[ee]),ae.up.copy(gy[ee]),ae.lookAt(Qc),ae.updateMatrixWorld(),Be.makeTranslation(-Yr.x,-Yr.y,-Yr.z),lf.multiplyMatrices(ae.projectionMatrix,ae.matrixWorldInverse),z._frustum.setFromProjectionMatrix(lf,ae.coordinateSystem,ae.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,ee),i.clear();else{ee===0&&(i.setRenderTarget(z.map),i.clear());let ae=z.getViewport(ee);o.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),O.viewport(o)}n=z.getFrustum(ee),M(y,_,oe,F,this.type)}z.isPointLightShadow!==!0&&this.type===Vs&&b(z,_),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,R,L)};function b(w,y){let _=e.update(x);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new nn(s.x,s.y,{format:Ni,type:Dn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(y,null,_,d,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(y,null,_,f,x,null)}function A(w,y,_,E){let R=null,L=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)R=L;else if(R=_.isPointLight===!0?c:a,i.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){let O=R.uuid,D=y.uuid,C=l[O];C===void 0&&(C={},l[O]=C);let N=C[D];N===void 0&&(N=R.clone(),C[D]=N,y.addEventListener("dispose",T)),R=N}if(R.visible=y.visible,R.wireframe=y.wireframe,E===Vs?R.side=y.shadowSide!==null?y.shadowSide:y.side:R.side=y.shadowSide!==null?y.shadowSide:u[y.side],R.alphaMap=y.alphaMap,R.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,R.map=y.map,R.clipShadows=y.clipShadows,R.clippingPlanes=y.clippingPlanes,R.clipIntersection=y.clipIntersection,R.displacementMap=y.displacementMap,R.displacementScale=y.displacementScale,R.displacementBias=y.displacementBias,R.wireframeLinewidth=y.wireframeLinewidth,R.linewidth=y.linewidth,_.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let O=i.properties.get(R);O.light=_}return R}function M(w,y,_,E,R){if(w.visible===!1)return;if(w.layers.test(y.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&R===Vs)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);let D=e.update(w),C=w.material;if(Array.isArray(C)){let N=D.groups;for(let F=0,z=N.length;F<z;F++){let J=N[F],Y=C[J.materialIndex];if(Y&&Y.visible){let Z=A(w,Y,E,R);w.onBeforeShadow(i,w,y,_,D,Z,J),i.renderBufferDirect(_,null,D,Z,w,J),w.onAfterShadow(i,w,y,_,D,Z,J)}}}else if(C.visible){let N=A(w,C,E,R);w.onBeforeShadow(i,w,y,_,D,N,null),i.renderBufferDirect(_,null,D,N,w,null),w.onAfterShadow(i,w,y,_,D,N,null)}}let O=w.children;for(let D=0,C=O.length;D<C;D++)M(O[D],y,_,E,R)}function T(w){w.target.removeEventListener("dispose",T);for(let _ in l){let E=l[_],R=w.target.uuid;R in E&&(E[R].dispose(),delete E[R])}}}function xy(i,e){function t(){let H=!1,de=new lt,te=null,fe=new lt(0,0,0,0);return{setMask:function(Me){te!==Me&&!H&&(i.colorMask(Me,Me,Me,Me),te=Me)},setLocked:function(Me){H=Me},setClear:function(Me,se,Ne,Ce,mt){mt===!0&&(Me*=Ce,se*=Ce,Ne*=Ce),de.set(Me,se,Ne,Ce),fe.equals(de)===!1&&(i.clearColor(Me,se,Ne,Ce),fe.copy(de))},reset:function(){H=!1,te=null,fe.set(-1,0,0,0)}}}function n(){let H=!1,de=!1,te=null,fe=null,Me=null;return{setReversed:function(se){if(de!==se){let Ne=e.get("EXT_clip_control");se?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),de=se;let Ce=Me;Me=null,this.setClear(Ce)}},getReversed:function(){return de},setTest:function(se){se?V(i.DEPTH_TEST):ie(i.DEPTH_TEST)},setMask:function(se){te!==se&&!H&&(i.depthMask(se),te=se)},setFunc:function(se){if(de&&(se=Fd[se]),fe!==se){switch(se){case Wo:i.depthFunc(i.NEVER);break;case Xo:i.depthFunc(i.ALWAYS);break;case $o:i.depthFunc(i.LESS);break;case Ss:i.depthFunc(i.LEQUAL);break;case qo:i.depthFunc(i.EQUAL);break;case Yo:i.depthFunc(i.GEQUAL);break;case Ko:i.depthFunc(i.GREATER);break;case Zo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=se}},setLocked:function(se){H=se},setClear:function(se){Me!==se&&(Me=se,de&&(se=1-se),i.clearDepth(se))},reset:function(){H=!1,te=null,fe=null,Me=null,de=!1}}}function s(){let H=!1,de=null,te=null,fe=null,Me=null,se=null,Ne=null,Ce=null,mt=null;return{setTest:function(it){H||(it?V(i.STENCIL_TEST):ie(i.STENCIL_TEST))},setMask:function(it){de!==it&&!H&&(i.stencilMask(it),de=it)},setFunc:function(it,Mn,Fn){(te!==it||fe!==Mn||Me!==Fn)&&(i.stencilFunc(it,Mn,Fn),te=it,fe=Mn,Me=Fn)},setOp:function(it,Mn,Fn){(se!==it||Ne!==Mn||Ce!==Fn)&&(i.stencilOp(it,Mn,Fn),se=it,Ne=Mn,Ce=Fn)},setLocked:function(it){H=it},setClear:function(it){mt!==it&&(i.clearStencil(it),mt=it)},reset:function(){H=!1,de=null,te=null,fe=null,Me=null,se=null,Ne=null,Ce=null,mt=null}}}let r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap,h={},u={},d={},f=new WeakMap,g=[],x=null,m=!1,p=null,b=null,A=null,M=null,T=null,w=null,y=null,_=new Ue(0,0,0),E=0,R=!1,L=null,O=null,D=null,C=null,N=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,J=0,Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(Y)[1]),z=J>=1):Y.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),z=J>=2);let Z=null,ee={},oe=i.getParameter(i.SCISSOR_BOX),ae=i.getParameter(i.VIEWPORT),Be=new lt().fromArray(oe),ve=new lt().fromArray(ae);function De(H,de,te,fe){let Me=new Uint8Array(4),se=i.createTexture();i.bindTexture(H,se),i.texParameteri(H,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(H,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ne=0;Ne<te;Ne++)H===i.TEXTURE_3D||H===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,fe,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(de+Ne,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return se}let U={};U[i.TEXTURE_2D]=De(i.TEXTURE_2D,i.TEXTURE_2D,1),U[i.TEXTURE_CUBE_MAP]=De(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),U[i.TEXTURE_2D_ARRAY]=De(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),U[i.TEXTURE_3D]=De(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),V(i.DEPTH_TEST),o.setFunc(Ss),je(!1),ot(mc),V(i.CULL_FACE),tt(Xn);function V(H){h[H]!==!0&&(i.enable(H),h[H]=!0)}function ie(H){h[H]!==!1&&(i.disable(H),h[H]=!1)}function be(H,de){return d[H]!==de?(i.bindFramebuffer(H,de),d[H]=de,H===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=de),H===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=de),!0):!1}function ce(H,de){let te=g,fe=!1;if(H){te=f.get(de),te===void 0&&(te=[],f.set(de,te));let Me=H.textures;if(te.length!==Me.length||te[0]!==i.COLOR_ATTACHMENT0){for(let se=0,Ne=Me.length;se<Ne;se++)te[se]=i.COLOR_ATTACHMENT0+se;te.length=Me.length,fe=!0}}else te[0]!==i.BACK&&(te[0]=i.BACK,fe=!0);fe&&i.drawBuffers(te)}function ze(H){return x!==H?(i.useProgram(H),x=H,!0):!1}let xt={[Zi]:i.FUNC_ADD,[id]:i.FUNC_SUBTRACT,[sd]:i.FUNC_REVERSE_SUBTRACT};xt[rd]=i.MIN,xt[od]=i.MAX;let qe={[ad]:i.ZERO,[ld]:i.ONE,[cd]:i.SRC_COLOR,[yc]:i.SRC_ALPHA,[md]:i.SRC_ALPHA_SATURATE,[fd]:i.DST_COLOR,[ud]:i.DST_ALPHA,[hd]:i.ONE_MINUS_SRC_COLOR,[vc]:i.ONE_MINUS_SRC_ALPHA,[pd]:i.ONE_MINUS_DST_COLOR,[dd]:i.ONE_MINUS_DST_ALPHA,[gd]:i.CONSTANT_COLOR,[_d]:i.ONE_MINUS_CONSTANT_COLOR,[xd]:i.CONSTANT_ALPHA,[yd]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(H,de,te,fe,Me,se,Ne,Ce,mt,it){if(H===Xn){m===!0&&(ie(i.BLEND),m=!1);return}if(m===!1&&(V(i.BLEND),m=!0),H!==nd){if(H!==p||it!==R){if((b!==Zi||T!==Zi)&&(i.blendEquation(i.FUNC_ADD),b=Zi,T=Zi),it)switch(H){case Gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFunc(i.ONE,i.ONE);break;case _c:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case xc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ve("WebGLState: Invalid blending: ",H);break}else switch(H){case Gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case gc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case _c:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case xc:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",H);break}A=null,M=null,w=null,y=null,_.set(0,0,0),E=0,p=H,R=it}return}Me=Me||de,se=se||te,Ne=Ne||fe,(de!==b||Me!==T)&&(i.blendEquationSeparate(xt[de],xt[Me]),b=de,T=Me),(te!==A||fe!==M||se!==w||Ne!==y)&&(i.blendFuncSeparate(qe[te],qe[fe],qe[se],qe[Ne]),A=te,M=fe,w=se,y=Ne),(Ce.equals(_)===!1||mt!==E)&&(i.blendColor(Ce.r,Ce.g,Ce.b,mt),_.copy(Ce),E=mt),p=H,R=!1}function ht(H,de){H.side===on?ie(i.CULL_FACE):V(i.CULL_FACE);let te=H.side===en;de&&(te=!te),je(te),H.blending===Gs&&H.transparent===!1?tt(Xn):tt(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);let fe=H.stencilWrite;a.setTest(fe),fe&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Vt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?V(i.SAMPLE_ALPHA_TO_COVERAGE):ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function je(H){L!==H&&(H?i.frontFace(i.CW):i.frontFace(i.CCW),L=H)}function ot(H){H!==Qu?(V(i.CULL_FACE),H!==O&&(H===mc?i.cullFace(i.BACK):H===ed?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ie(i.CULL_FACE),O=H}function Pt(H){H!==D&&(z&&i.lineWidth(H),D=H)}function Vt(H,de,te){H?(V(i.POLYGON_OFFSET_FILL),(C!==de||N!==te)&&(C=de,N=te,o.getReversed()&&(de=-de),i.polygonOffset(de,te))):ie(i.POLYGON_OFFSET_FILL)}function yt(H){H?V(i.SCISSOR_TEST):ie(i.SCISSOR_TEST)}function wt(H){H===void 0&&(H=i.TEXTURE0+F-1),Z!==H&&(i.activeTexture(H),Z=H)}function P(H,de,te){te===void 0&&(Z===null?te=i.TEXTURE0+F-1:te=Z);let fe=ee[te];fe===void 0&&(fe={type:void 0,texture:void 0},ee[te]=fe),(fe.type!==H||fe.texture!==de)&&(Z!==te&&(i.activeTexture(te),Z=te),i.bindTexture(H,de||U[H]),fe.type=H,fe.texture=de)}function _e(){let H=ee[Z];H!==void 0&&H.type!==void 0&&(i.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function Fe(){try{i.compressedTexImage2D(...arguments)}catch(H){Ve("WebGLState:",H)}}function I(){try{i.compressedTexImage3D(...arguments)}catch(H){Ve("WebGLState:",H)}}function v(){try{i.texSubImage2D(...arguments)}catch(H){Ve("WebGLState:",H)}}function W(){try{i.texSubImage3D(...arguments)}catch(H){Ve("WebGLState:",H)}}function q(){try{i.compressedTexSubImage2D(...arguments)}catch(H){Ve("WebGLState:",H)}}function j(){try{i.compressedTexSubImage3D(...arguments)}catch(H){Ve("WebGLState:",H)}}function re(){try{i.texStorage2D(...arguments)}catch(H){Ve("WebGLState:",H)}}function le(){try{i.texStorage3D(...arguments)}catch(H){Ve("WebGLState:",H)}}function Q(){try{i.texImage2D(...arguments)}catch(H){Ve("WebGLState:",H)}}function ne(){try{i.texImage3D(...arguments)}catch(H){Ve("WebGLState:",H)}}function he(H){return u[H]!==void 0?u[H]:i.getParameter(H)}function Pe(H,de){u[H]!==de&&(i.pixelStorei(H,de),u[H]=de)}function pe(H){Be.equals(H)===!1&&(i.scissor(H.x,H.y,H.z,H.w),Be.copy(H))}function ue(H){ve.equals(H)===!1&&(i.viewport(H.x,H.y,H.z,H.w),ve.copy(H))}function Le(H,de){let te=l.get(de);te===void 0&&(te=new WeakMap,l.set(de,te));let fe=te.get(H);fe===void 0&&(fe=i.getUniformBlockIndex(de,H.name),te.set(H,fe))}function ke(H,de){let fe=l.get(de).get(H);c.get(de)!==fe&&(i.uniformBlockBinding(de,fe,H.__bindingPointIndex),c.set(de,fe))}function Xe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},Z=null,ee={},d={},f=new WeakMap,g=[],x=null,m=!1,p=null,b=null,A=null,M=null,T=null,w=null,y=null,_=new Ue(0,0,0),E=0,R=!1,L=null,O=null,D=null,C=null,N=null,Be.set(0,0,i.canvas.width,i.canvas.height),ve.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:V,disable:ie,bindFramebuffer:be,drawBuffers:ce,useProgram:ze,setBlending:tt,setMaterial:ht,setFlipSided:je,setCullFace:ot,setLineWidth:Pt,setPolygonOffset:Vt,setScissorTest:yt,activeTexture:wt,bindTexture:P,unbindTexture:_e,compressedTexImage2D:Fe,compressedTexImage3D:I,texImage2D:Q,texImage3D:ne,pixelStorei:Pe,getParameter:he,updateUBOMapping:Le,uniformBlockBinding:ke,texStorage2D:re,texStorage3D:le,texSubImage2D:v,texSubImage3D:W,compressedTexSubImage2D:q,compressedTexSubImage3D:j,scissor:pe,viewport:ue,reset:Xe}}function yy(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Oe,h=new WeakMap,u=new Set,d,f=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(I,v){return g?new OffscreenCanvas(I,v):Ts("canvas")}function m(I,v,W){let q=1,j=Fe(I);if((j.width>W||j.height>W)&&(q=W/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let re=Math.floor(q*j.width),le=Math.floor(q*j.height);d===void 0&&(d=x(re,le));let Q=v?x(re,le):d;return Q.width=re,Q.height=le,Q.getContext("2d").drawImage(I,0,0,re,le),Ie("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+re+"x"+le+")."),Q}else return"data"in I&&Ie("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),I;return I}function p(I){return I.generateMipmaps}function b(I){i.generateMipmap(I)}function A(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(I,v,W,q,j,re=!1){if(I!==null){if(i[I]!==void 0)return i[I];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let le;q&&(le=e.get("EXT_texture_norm16"),le||Ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===i.RED&&(W===i.FLOAT&&(Q=i.R32F),W===i.HALF_FLOAT&&(Q=i.R16F),W===i.UNSIGNED_BYTE&&(Q=i.R8),W===i.UNSIGNED_SHORT&&le&&(Q=le.R16_EXT),W===i.SHORT&&le&&(Q=le.R16_SNORM_EXT)),v===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(Q=i.R8UI),W===i.UNSIGNED_SHORT&&(Q=i.R16UI),W===i.UNSIGNED_INT&&(Q=i.R32UI),W===i.BYTE&&(Q=i.R8I),W===i.SHORT&&(Q=i.R16I),W===i.INT&&(Q=i.R32I)),v===i.RG&&(W===i.FLOAT&&(Q=i.RG32F),W===i.HALF_FLOAT&&(Q=i.RG16F),W===i.UNSIGNED_BYTE&&(Q=i.RG8),W===i.UNSIGNED_SHORT&&le&&(Q=le.RG16_EXT),W===i.SHORT&&le&&(Q=le.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(Q=i.RG8UI),W===i.UNSIGNED_SHORT&&(Q=i.RG16UI),W===i.UNSIGNED_INT&&(Q=i.RG32UI),W===i.BYTE&&(Q=i.RG8I),W===i.SHORT&&(Q=i.RG16I),W===i.INT&&(Q=i.RG32I)),v===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),W===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),W===i.UNSIGNED_INT&&(Q=i.RGB32UI),W===i.BYTE&&(Q=i.RGB8I),W===i.SHORT&&(Q=i.RGB16I),W===i.INT&&(Q=i.RGB32I)),v===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),W===i.UNSIGNED_INT&&(Q=i.RGBA32UI),W===i.BYTE&&(Q=i.RGBA8I),W===i.SHORT&&(Q=i.RGBA16I),W===i.INT&&(Q=i.RGBA32I)),v===i.RGB&&(W===i.UNSIGNED_SHORT&&le&&(Q=le.RGB16_EXT),W===i.SHORT&&le&&(Q=le.RGB16_SNORM_EXT),W===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),v===i.RGBA){let ne=re?fr:Ze.getTransfer(j);W===i.FLOAT&&(Q=i.RGBA32F),W===i.HALF_FLOAT&&(Q=i.RGBA16F),W===i.UNSIGNED_BYTE&&(Q=ne===rt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT&&le&&(Q=le.RGBA16_EXT),W===i.SHORT&&le&&(Q=le.RGBA16_SNORM_EXT),W===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function T(I,v){let W;return I?v===null||v===Ln||v===$s?W=i.DEPTH24_STENCIL8:v===mn?W=i.DEPTH32F_STENCIL8:v===Xs&&(W=i.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Ln||v===$s?W=i.DEPTH_COMPONENT24:v===mn?W=i.DEPTH_COMPONENT32F:v===Xs&&(W=i.DEPTH_COMPONENT16),W}function w(I,v){return p(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ct&&I.minFilter!==Rt?Math.log2(Math.max(v.width,v.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?v.mipmaps.length:1}function y(I){let v=I.target;v.removeEventListener("dispose",y),E(v),v.isVideoTexture&&h.delete(v),v.isHTMLTexture&&u.delete(v)}function _(I){let v=I.target;v.removeEventListener("dispose",_),L(v)}function E(I){let v=n.get(I);if(v.__webglInit===void 0)return;let W=I.source,q=f.get(W);if(q){let j=q[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&R(I),Object.keys(q).length===0&&f.delete(W)}n.remove(I)}function R(I){let v=n.get(I);i.deleteTexture(v.__webglTexture);let W=I.source,q=f.get(W);delete q[v.__cacheKey],o.memory.textures--}function L(I){let v=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(v.__webglFramebuffer[q]))for(let j=0;j<v.__webglFramebuffer[q].length;j++)i.deleteFramebuffer(v.__webglFramebuffer[q][j]);else i.deleteFramebuffer(v.__webglFramebuffer[q]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[q])}else{if(Array.isArray(v.__webglFramebuffer))for(let q=0;q<v.__webglFramebuffer.length;q++)i.deleteFramebuffer(v.__webglFramebuffer[q]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let q=0;q<v.__webglColorRenderbuffer.length;q++)v.__webglColorRenderbuffer[q]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[q]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let W=I.textures;for(let q=0,j=W.length;q<j;q++){let re=n.get(W[q]);re.__webglTexture&&(i.deleteTexture(re.__webglTexture),o.memory.textures--),n.remove(W[q])}n.remove(I)}let O=0;function D(){O=0}function C(){return O}function N(I){O=I}function F(){let I=O;return I>=s.maxTextures&&Ie("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+s.maxTextures),O+=1,I}function z(I){let v=[];return v.push(I.wrapS),v.push(I.wrapT),v.push(I.wrapR||0),v.push(I.magFilter),v.push(I.minFilter),v.push(I.anisotropy),v.push(I.internalFormat),v.push(I.format),v.push(I.type),v.push(I.generateMipmaps),v.push(I.premultiplyAlpha),v.push(I.flipY),v.push(I.unpackAlignment),v.push(I.colorSpace),v.join()}function J(I,v){let W=n.get(I);if(I.isVideoTexture&&P(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&W.__version!==I.version){let q=I.image;if(q===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{ie(W,I,v);return}}else I.isExternalTexture&&(W.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+v)}function Y(I,v){let W=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&W.__version!==I.version){ie(W,I,v);return}else I.isExternalTexture&&(W.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+v)}function Z(I,v){let W=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&W.__version!==I.version){ie(W,I,v);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+v)}function ee(I,v){let W=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&W.__version!==I.version){be(W,I,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+v)}let oe={[wi]:i.REPEAT,[yn]:i.CLAMP_TO_EDGE,[ws]:i.MIRRORED_REPEAT},ae={[Ct]:i.NEAREST,[ya]:i.NEAREST_MIPMAP_NEAREST,[ji]:i.NEAREST_MIPMAP_LINEAR,[Rt]:i.LINEAR,[Ws]:i.LINEAR_MIPMAP_NEAREST,[Pn]:i.LINEAR_MIPMAP_LINEAR},Be={[Ad]:i.NEVER,[Ld]:i.ALWAYS,[Cd]:i.LESS,[il]:i.LEQUAL,[Rd]:i.EQUAL,[sl]:i.GEQUAL,[Id]:i.GREATER,[Pd]:i.NOTEQUAL};function ve(I,v){if(v.type===mn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Rt||v.magFilter===Ws||v.magFilter===ji||v.magFilter===Pn||v.minFilter===Rt||v.minFilter===Ws||v.minFilter===ji||v.minFilter===Pn)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,oe[v.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,oe[v.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,oe[v.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ae[v.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ae[v.minFilter]),v.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Be[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ct||v.minFilter!==ji&&v.minFilter!==Pn||v.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(I,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function De(I,v){let W=!1;I.__webglInit===void 0&&(I.__webglInit=!0,v.addEventListener("dispose",y));let q=v.source,j=f.get(q);j===void 0&&(j={},f.set(q,j));let re=z(v);if(re!==I.__cacheKey){j[re]===void 0&&(j[re]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,W=!0),j[re].usedTimes++;let le=j[I.__cacheKey];le!==void 0&&(j[I.__cacheKey].usedTimes--,le.usedTimes===0&&R(v)),I.__cacheKey=re,I.__webglTexture=j[re].texture}return W}function U(I,v,W){return Math.floor(Math.floor(I/W)/v)}function V(I,v,W,q){let re=I.updateRanges;if(re.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,W,q,v.data);else{re.sort((Pe,pe)=>Pe.start-pe.start);let le=0;for(let Pe=1;Pe<re.length;Pe++){let pe=re[le],ue=re[Pe],Le=pe.start+pe.count,ke=U(ue.start,v.width,4),Xe=U(pe.start,v.width,4);ue.start<=Le+1&&ke===Xe&&U(ue.start+ue.count-1,v.width,4)===ke?pe.count=Math.max(pe.count,ue.start+ue.count-pe.start):(++le,re[le]=ue)}re.length=le+1;let Q=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),he=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let Pe=0,pe=re.length;Pe<pe;Pe++){let ue=re[Pe],Le=Math.floor(ue.start/4),ke=Math.ceil(ue.count/4),Xe=Le%v.width,H=Math.floor(Le/v.width),de=ke,te=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,H),t.texSubImage2D(i.TEXTURE_2D,0,Xe,H,de,te,W,q,v.data)}I.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,he)}}function ie(I,v,W){let q=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(q=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(q=i.TEXTURE_3D);let j=De(I,v),re=v.source;t.bindTexture(q,I.__webglTexture,i.TEXTURE0+W);let le=n.get(re);if(re.version!==le.__version||j===!0){if(t.activeTexture(i.TEXTURE0+W),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let te=Ze.getPrimaries(Ze.workingColorSpace),fe=v.colorSpace===ui?null:Ze.getPrimaries(v.colorSpace),Me=v.colorSpace===ui||te===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let ne=m(v.image,!1,s.maxTextureSize);ne=_e(v,ne);let he=r.convert(v.format,v.colorSpace),Pe=r.convert(v.type),pe=M(v.internalFormat,he,Pe,v.normalized,v.colorSpace,v.isVideoTexture);ve(q,v);let ue,Le=v.mipmaps,ke=v.isVideoTexture!==!0,Xe=le.__version===void 0||j===!0,H=re.dataReady,de=w(v,ne);if(v.isDepthTexture)pe=T(v.format===Di,v.type),Xe&&(ke?t.texStorage2D(i.TEXTURE_2D,1,pe,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,pe,ne.width,ne.height,0,he,Pe,null));else if(v.isDataTexture)if(Le.length>0){ke&&Xe&&t.texStorage2D(i.TEXTURE_2D,de,pe,Le[0].width,Le[0].height);for(let te=0,fe=Le.length;te<fe;te++)ue=Le[te],ke?H&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,he,Pe,ue.data):t.texImage2D(i.TEXTURE_2D,te,pe,ue.width,ue.height,0,he,Pe,ue.data);v.generateMipmaps=!1}else ke?(Xe&&t.texStorage2D(i.TEXTURE_2D,de,pe,ne.width,ne.height),H&&V(v,ne,he,Pe)):t.texImage2D(i.TEXTURE_2D,0,pe,ne.width,ne.height,0,he,Pe,ne.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ke&&Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,pe,Le[0].width,Le[0].height,ne.depth);for(let te=0,fe=Le.length;te<fe;te++)if(ue=Le[te],v.format!==gn)if(he!==null)if(ke){if(H)if(v.layerUpdates.size>0){let Me=Vc(ue.width,ue.height,v.format,v.type);for(let se of v.layerUpdates){let Ne=ue.data.subarray(se*Me/ue.data.BYTES_PER_ELEMENT,(se+1)*Me/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,se,ue.width,ue.height,1,he,Ne)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,ne.depth,he,ue.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,te,pe,ue.width,ue.height,ne.depth,0,ue.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?H&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,te,0,0,0,ue.width,ue.height,ne.depth,he,Pe,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,te,pe,ue.width,ue.height,ne.depth,0,he,Pe,ue.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{ke&&Xe&&t.texStorage2D(i.TEXTURE_2D,de,pe,Le[0].width,Le[0].height);for(let te=0,fe=Le.length;te<fe;te++)ue=Le[te],v.format!==gn?he!==null?ke?H&&t.compressedTexSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,he,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,te,pe,ue.width,ue.height,0,ue.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?H&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,ue.width,ue.height,he,Pe,ue.data):t.texImage2D(i.TEXTURE_2D,te,pe,ue.width,ue.height,0,he,Pe,ue.data)}else if(v.isDataArrayTexture)if(ke){if(Xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,de,pe,ne.width,ne.height,ne.depth),H)if(v.layerUpdates.size>0){let te=Vc(ne.width,ne.height,v.format,v.type);for(let fe of v.layerUpdates){let Me=ne.data.subarray(fe*te/ne.data.BYTES_PER_ELEMENT,(fe+1)*te/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,fe,ne.width,ne.height,1,he,Pe,Me)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,he,Pe,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,pe,ne.width,ne.height,ne.depth,0,he,Pe,ne.data);else if(v.isData3DTexture)ke?(Xe&&t.texStorage3D(i.TEXTURE_3D,de,pe,ne.width,ne.height,ne.depth),H&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,he,Pe,ne.data)):t.texImage3D(i.TEXTURE_3D,0,pe,ne.width,ne.height,ne.depth,0,he,Pe,ne.data);else if(v.isFramebufferTexture){if(Xe)if(ke)t.texStorage2D(i.TEXTURE_2D,de,pe,ne.width,ne.height);else{let te=ne.width,fe=ne.height;for(let Me=0;Me<de;Me++)t.texImage2D(i.TEXTURE_2D,Me,pe,te,fe,0,he,Pe,null),te>>=1,fe>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let te=i.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ne.parentNode!==te){te.appendChild(ne),u.add(v),te.onpaint=fe=>{let Me=fe.changedElements;for(let se of u)Me.includes(se.image)&&(se.needsUpdate=!0)},te.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{let Me=i.RGBA,se=i.RGBA,Ne=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Me,se,Ne,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Le.length>0){if(ke&&Xe){let te=Fe(Le[0]);t.texStorage2D(i.TEXTURE_2D,de,pe,te.width,te.height)}for(let te=0,fe=Le.length;te<fe;te++)ue=Le[te],ke?H&&t.texSubImage2D(i.TEXTURE_2D,te,0,0,he,Pe,ue):t.texImage2D(i.TEXTURE_2D,te,pe,he,Pe,ue);v.generateMipmaps=!1}else if(ke){if(Xe){let te=Fe(ne);t.texStorage2D(i.TEXTURE_2D,de,pe,te.width,te.height)}H&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,he,Pe,ne)}else t.texImage2D(i.TEXTURE_2D,0,pe,he,Pe,ne);p(v)&&b(q),le.__version=re.version,v.onUpdate&&v.onUpdate(v)}I.__version=v.version}function be(I,v,W){if(v.image.length!==6)return;let q=De(I,v),j=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+W);let re=n.get(j);if(j.version!==re.__version||q===!0){t.activeTexture(i.TEXTURE0+W);let le=Ze.getPrimaries(Ze.workingColorSpace),Q=v.colorSpace===ui?null:Ze.getPrimaries(v.colorSpace),ne=v.colorSpace===ui||le===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let he=v.isCompressedTexture||v.image[0].isCompressedTexture,Pe=v.image[0]&&v.image[0].isDataTexture,pe=[];for(let se=0;se<6;se++)!he&&!Pe?pe[se]=m(v.image[se],!0,s.maxCubemapSize):pe[se]=Pe?v.image[se].image:v.image[se],pe[se]=_e(v,pe[se]);let ue=pe[0],Le=r.convert(v.format,v.colorSpace),ke=r.convert(v.type),Xe=M(v.internalFormat,Le,ke,v.normalized,v.colorSpace),H=v.isVideoTexture!==!0,de=re.__version===void 0||q===!0,te=j.dataReady,fe=w(v,ue);ve(i.TEXTURE_CUBE_MAP,v);let Me;if(he){H&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Xe,ue.width,ue.height);for(let se=0;se<6;se++){Me=pe[se].mipmaps;for(let Ne=0;Ne<Me.length;Ne++){let Ce=Me[Ne];v.format!==gn?Le!==null?H?te&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ne,0,0,Ce.width,Ce.height,Le,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ne,Xe,Ce.width,Ce.height,0,Ce.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ne,0,0,Ce.width,Ce.height,Le,ke,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ne,Xe,Ce.width,Ce.height,0,Le,ke,Ce.data)}}}else{if(Me=v.mipmaps,H&&de){Me.length>0&&fe++;let se=Fe(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,fe,Xe,se.width,se.height)}for(let se=0;se<6;se++)if(Pe){H?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,pe[se].width,pe[se].height,Le,ke,pe[se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Xe,pe[se].width,pe[se].height,0,Le,ke,pe[se].data);for(let Ne=0;Ne<Me.length;Ne++){let mt=Me[Ne].image[se].image;H?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ne+1,0,0,mt.width,mt.height,Le,ke,mt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ne+1,Xe,mt.width,mt.height,0,Le,ke,mt.data)}}else{H?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Le,ke,pe[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,Xe,Le,ke,pe[se]);for(let Ne=0;Ne<Me.length;Ne++){let Ce=Me[Ne];H?te&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ne+1,0,0,Le,ke,Ce.image[se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+se,Ne+1,Xe,Le,ke,Ce.image[se])}}}p(v)&&b(i.TEXTURE_CUBE_MAP),re.__version=j.version,v.onUpdate&&v.onUpdate(v)}I.__version=v.version}function ce(I,v,W,q,j,re){let le=r.convert(W.format,W.colorSpace),Q=r.convert(W.type),ne=M(W.internalFormat,le,Q,W.normalized,W.colorSpace),he=n.get(v),Pe=n.get(W);if(Pe.__renderTarget=v,!he.__hasExternalTextures){let pe=Math.max(1,v.width>>re),ue=Math.max(1,v.height>>re);j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?t.texImage3D(j,re,ne,pe,ue,v.depth,0,le,Q,null):t.texImage2D(j,re,ne,pe,ue,0,le,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,I),wt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,q,j,Pe.__webglTexture,0,yt(v)):(j===i.TEXTURE_2D||j>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,q,j,Pe.__webglTexture,re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ze(I,v,W){if(i.bindRenderbuffer(i.RENDERBUFFER,I),v.depthBuffer){let q=v.depthTexture,j=q&&q.isDepthTexture?q.type:null,re=T(v.stencilBuffer,j),le=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;wt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(v),re,v.width,v.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(v),re,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,re,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,le,i.RENDERBUFFER,I)}else{let q=v.textures;for(let j=0;j<q.length;j++){let re=q[j],le=r.convert(re.format,re.colorSpace),Q=r.convert(re.type),ne=M(re.internalFormat,le,Q,re.normalized,re.colorSpace);wt(v)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,yt(v),ne,v.width,v.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,yt(v),ne,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ne,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function xt(I,v,W){let q=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,I),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let j=n.get(v.depthTexture);if(j.__renderTarget=v,(!j.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),q){if(j.__webglInit===void 0&&(j.__webglInit=!0,v.depthTexture.addEventListener("dispose",y)),j.__webglTexture===void 0){j.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),ve(i.TEXTURE_CUBE_MAP,v.depthTexture);let he=r.convert(v.depthTexture.format),Pe=r.convert(v.depthTexture.type),pe;v.depthTexture.format===zn?pe=i.DEPTH_COMPONENT24:v.depthTexture.format===Di&&(pe=i.DEPTH24_STENCIL8);for(let ue=0;ue<6;ue++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,pe,v.width,v.height,0,he,Pe,null)}}else J(v.depthTexture,0);let re=j.__webglTexture,le=yt(v),Q=q?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,ne=v.depthTexture.format===Di?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===zn)wt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,Q,re,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,ne,Q,re,0);else if(v.depthTexture.format===Di)wt(v)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,Q,re,0,le):i.framebufferTexture2D(i.FRAMEBUFFER,ne,Q,re,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function qe(I){let v=n.get(I),W=I.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==I.depthTexture){let q=I.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),q){let j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=q}if(I.depthTexture&&!v.__autoAllocateDepthBuffer)if(W)for(let q=0;q<6;q++)xt(v.__webglFramebuffer[q],I,q);else{let q=I.texture.mipmaps;q&&q.length>0?xt(v.__webglFramebuffer[0],I,0):xt(v.__webglFramebuffer,I,0)}else if(W){v.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[q]),v.__webglDepthbuffer[q]===void 0)v.__webglDepthbuffer[q]=i.createRenderbuffer(),ze(v.__webglDepthbuffer[q],I,!1);else{let j=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=v.__webglDepthbuffer[q];i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,re)}}else{let q=I.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),ze(v.__webglDepthbuffer,I,!1);else{let j=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,re)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function tt(I,v,W){let q=n.get(I);v!==void 0&&ce(q.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&qe(I)}function ht(I){let v=I.texture,W=n.get(I),q=n.get(v);I.addEventListener("dispose",_);let j=I.textures,re=I.isWebGLCubeRenderTarget===!0,le=j.length>1;if(le||(q.__webglTexture===void 0&&(q.__webglTexture=i.createTexture()),q.__version=v.version,o.memory.textures++),re){W.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer[Q]=[];for(let ne=0;ne<v.mipmaps.length;ne++)W.__webglFramebuffer[Q][ne]=i.createFramebuffer()}else W.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){W.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)W.__webglFramebuffer[Q]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(le)for(let Q=0,ne=j.length;Q<ne;Q++){let he=n.get(j[Q]);he.__webglTexture===void 0&&(he.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&wt(I)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let Q=0;Q<j.length;Q++){let ne=j[Q];W.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[Q]);let he=r.convert(ne.format,ne.colorSpace),Pe=r.convert(ne.type),pe=M(ne.internalFormat,he,Pe,ne.normalized,ne.colorSpace,I.isXRRenderTarget===!0),ue=yt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,pe,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,W.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),ze(W.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),ve(i.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let ne=0;ne<v.mipmaps.length;ne++)ce(W.__webglFramebuffer[Q][ne],I,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ne);else ce(W.__webglFramebuffer[Q],I,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);p(v)&&b(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(le){for(let Q=0,ne=j.length;Q<ne;Q++){let he=j[Q],Pe=n.get(he),pe=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(pe=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(pe,Pe.__webglTexture),ve(pe,he),ce(W.__webglFramebuffer,I,he,i.COLOR_ATTACHMENT0+Q,pe,0),p(he)&&b(pe)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Q=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,q.__webglTexture),ve(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let ne=0;ne<v.mipmaps.length;ne++)ce(W.__webglFramebuffer[ne],I,v,i.COLOR_ATTACHMENT0,Q,ne);else ce(W.__webglFramebuffer,I,v,i.COLOR_ATTACHMENT0,Q,0);p(v)&&b(Q),t.unbindTexture()}I.depthBuffer&&qe(I)}function je(I){let v=I.textures;for(let W=0,q=v.length;W<q;W++){let j=v[W];if(p(j)){let re=A(I),le=n.get(j).__webglTexture;t.bindTexture(re,le),b(re),t.unbindTexture()}}}let ot=[],Pt=[];function Vt(I){if(I.samples>0){if(wt(I)===!1){let v=I.textures,W=I.width,q=I.height,j=i.COLOR_BUFFER_BIT,re=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(I),Q=v.length>1;if(Q)for(let he=0;he<v.length;he++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer);let ne=I.texture.mipmaps;ne&&ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let he=0;he<v.length;he++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(j|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(j|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[he]);let Pe=n.get(v[he]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Pe,0)}i.blitFramebuffer(0,0,W,q,0,0,W,q,j,i.NEAREST),c===!0&&(ot.length=0,Pt.length=0,ot.push(i.COLOR_ATTACHMENT0+he),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(ot.push(re),Pt.push(re),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Pt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let he=0;he<v.length;he++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,le.__webglColorRenderbuffer[he]);let Pe=n.get(v[he]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,Pe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&c){let v=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function yt(I){return Math.min(s.maxSamples,I.samples)}function wt(I){let v=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function P(I){let v=o.render.frame;h.get(I)!==v&&(h.set(I,v),I.update())}function _e(I,v){let W=I.colorSpace,q=I.format,j=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||W!==jt&&W!==ui&&(Ze.getTransfer(W)===rt?(q!==gn||j!==an)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",W)),v}function Fe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=D,this.getTextureUnits=C,this.setTextureUnits=N,this.setTexture2D=J,this.setTexture2DArray=Y,this.setTexture3D=Z,this.setTextureCube=ee,this.rebindTextures=tt,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=je,this.updateMultisampleRenderTarget=Vt,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function vy(i,e){function t(n,s=ui){let r,o=Ze.getTransfer(s);if(n===an)return i.UNSIGNED_BYTE;if(n===Ma)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ba)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Pc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Lc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Rc)return i.BYTE;if(n===Ic)return i.SHORT;if(n===Xs)return i.UNSIGNED_SHORT;if(n===va)return i.INT;if(n===Ln)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===Dn)return i.HALF_FLOAT;if(n===Dc)return i.ALPHA;if(n===Nc)return i.RGB;if(n===gn)return i.RGBA;if(n===zn)return i.DEPTH_COMPONENT;if(n===Di)return i.DEPTH_STENCIL;if(n===Sa)return i.RED;if(n===wa)return i.RED_INTEGER;if(n===Ni)return i.RG;if(n===Ea)return i.RG_INTEGER;if(n===Ta)return i.RGBA_INTEGER;if(n===Br||n===kr||n===zr||n===Hr)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Br)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Br)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Aa||n===Ca||n===Ra||n===Ia)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Aa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ca)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ra)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Pa||n===La||n===Da||n===Na||n===Ua||n===Vr||n===Fa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Pa||n===La)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Da)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Na)return r.COMPRESSED_R11_EAC;if(n===Ua)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Vr)return r.COMPRESSED_RG11_EAC;if(n===Fa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oa||n===Ba||n===ka||n===za||n===Ha||n===Va||n===Ga||n===Wa||n===Xa||n===$a||n===qa||n===Ya||n===Ka||n===Za)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ba)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ka)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===za)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ha)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Va)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ga)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===$a)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ya)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ka)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Za)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ja||n===ja||n===Qa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ja)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ja)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===el||n===tl||n===Gr||n===nl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===el)return r.COMPRESSED_RED_RGTC1_EXT;if(n===tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$s?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var My=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,by=`
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

}`,ah=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new wr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new pn({vertexShader:My,fragmentShader:by,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new Er(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},lh=class extends Cn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new ah,p={},b=t.getContextAttributes(),A=null,M=null,T=[],w=[],y=new Oe,_=null,E=null,R=new At;R.viewport=new lt;let L=new At;L.viewport=new lt;let O=[R,L],D=new pa,C=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let V=T[U];return V===void 0&&(V=new Rs,T[U]=V),V.getTargetRaySpace()},this.getControllerGrip=function(U){let V=T[U];return V===void 0&&(V=new Rs,T[U]=V),V.getGripSpace()},this.getHand=function(U){let V=T[U];return V===void 0&&(V=new Rs,T[U]=V),V.getHandSpace()};function F(U){let V=w.indexOf(U.inputSource);if(V===-1)return;let ie=T[V];ie!==void 0&&(ie.update(U.inputSource,U.frame,l||o),ie.dispatchEvent({type:U.type,data:U.inputSource}))}function z(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",J);for(let U=0;U<T.length;U++){let V=w[U];V!==null&&(w[U]=null,T[U].disconnect(V))}C=null,N=null,m.reset();for(let U in p)delete p[U];if(e.setRenderTarget(A),f=null,d=null,u=null,s=null,M=null,De.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(y.width,y.height,!1),E!==null){let U=E.camera;U.fov=E.fov,U.zoom=E.zoom,U.updateProjectionMatrix(),E=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){r=U,n.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(U){l=U},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(U){if(s=U,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",z),s.addEventListener("inputsourceschange",J),b.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(y),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,be=null,ce=null;b.depth&&(ce=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=b.stencil?Di:zn,be=b.stencil?$s:Ln);let ze={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(ze),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),M=new nn(d.textureWidth,d.textureHeight,{format:gn,type:an,depthTexture:new Ti(d.textureWidth,d.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ie),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new nn(f.framebufferWidth,f.framebufferHeight,{format:gn,type:an,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),De.setContext(s),De.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(U){for(let V=0;V<U.removed.length;V++){let ie=U.removed[V],be=w.indexOf(ie);be>=0&&(w[be]=null,T[be].disconnect(ie))}for(let V=0;V<U.added.length;V++){let ie=U.added[V],be=w.indexOf(ie);if(be===-1){for(let ze=0;ze<T.length;ze++)if(ze>=w.length){w.push(ie),be=ze;break}else if(w[ze]===null){w[ze]=ie,be=ze;break}if(be===-1)break}let ce=T[be];ce&&ce.connect(ie)}}let Y=new G,Z=new G;function ee(U,V,ie){Y.setFromMatrixPosition(V.matrixWorld),Z.setFromMatrixPosition(ie.matrixWorld);let be=Y.distanceTo(Z),ce=V.projectionMatrix.elements,ze=ie.projectionMatrix.elements,xt=ce[14]/(ce[10]-1),qe=ce[14]/(ce[10]+1),tt=(ce[9]+1)/ce[5],ht=(ce[9]-1)/ce[5],je=(ce[8]-1)/ce[0],ot=(ze[8]+1)/ze[0],Pt=xt*je,Vt=xt*ot,yt=be/(-je+ot),wt=yt*-je;if(V.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(wt),U.translateZ(yt),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert(),ce[10]===-1)U.projectionMatrix.copy(V.projectionMatrix),U.projectionMatrixInverse.copy(V.projectionMatrixInverse);else{let P=xt+yt,_e=qe+yt,Fe=Pt-wt,I=Vt+(be-wt),v=tt*qe/_e*P,W=ht*qe/_e*P;U.projectionMatrix.makePerspective(Fe,I,v,W,P,_e),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}}function oe(U,V){V===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(V.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(s===null)return;let V=U.near,ie=U.far;m.texture!==null&&(m.depthNear>0&&(V=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),D.near=L.near=R.near=V,D.far=L.far=R.far=ie,(C!==D.near||N!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),C=D.near,N=D.far),D.layers.mask=U.layers.mask|6,R.layers.mask=D.layers.mask&-5,L.layers.mask=D.layers.mask&-3;let be=U.parent,ce=D.cameras;oe(D,be);for(let ze=0;ze<ce.length;ze++)oe(ce[ze],be);ce.length===2?ee(D,R,L):D.projectionMatrix.copy(R.projectionMatrix),E===null&&U.isPerspectiveCamera&&(E={camera:U,fov:U.fov,zoom:U.zoom}),ae(U,D,be)};function ae(U,V,ie){ie===null?U.matrix.copy(V.matrixWorld):(U.matrix.copy(ie.matrixWorld),U.matrix.invert(),U.matrix.multiply(V.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(V.projectionMatrix),U.projectionMatrixInverse.copy(V.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=Xi*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(U){c=U,d!==null&&(d.fixedFoveation=U),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=U)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(D)},this.getCameraTexture=function(U){return p[U]};let Be=null;function ve(U,V){if(h=V.getViewerPose(l||o),g=V,h!==null){let ie=h.views;f!==null&&(e.setRenderTargetFramebuffer(M,f.framebuffer),e.setRenderTarget(M));let be=!1;ie.length!==D.cameras.length&&(D.cameras.length=0,be=!0);for(let qe=0;qe<ie.length;qe++){let tt=ie[qe],ht=null;if(f!==null)ht=f.getViewport(tt);else{let ot=u.getViewSubImage(d,tt);ht=ot.viewport,qe===0&&(e.setRenderTargetTextures(M,ot.colorTexture,ot.depthStencilTexture),e.setRenderTarget(M))}let je=O[qe];je===void 0&&(je=new At,je.layers.enable(qe),je.viewport=new lt,O[qe]=je),je.matrix.fromArray(tt.transform.matrix),je.matrix.decompose(je.position,je.quaternion,je.scale),je.projectionMatrix.fromArray(tt.projectionMatrix),je.projectionMatrixInverse.copy(je.projectionMatrix).invert(),je.viewport.set(ht.x,ht.y,ht.width,ht.height),qe===0&&(D.matrix.copy(je.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),be===!0&&D.cameras.push(je)}let ce=s.enabledFeatures;if(ce&&ce.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let qe=u.getDepthInformation(ie[0]);qe&&qe.isValid&&qe.texture&&m.init(qe,s.renderState)}if(ce&&ce.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let qe=0;qe<ie.length;qe++){let tt=ie[qe].camera;if(tt){let ht=p[tt];ht||(ht=new wr,p[tt]=ht);let je=u.getCameraImage(tt);ht.sourceTexture=je}}}}for(let ie=0;ie<T.length;ie++){let be=w[ie],ce=T[ie];be!==null&&ce!==void 0&&ce.update(be,V,l||o)}Be&&Be(U,V),V.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:V}),g=null}let De=new cf;De.setAnimationLoop(ve),this.setAnimationLoop=function(U){Be=U},this.dispose=function(){}}},Sy=new $e,mf=new We;mf.set(-1,0,0,0,1,0,0,0,1);function wy(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,kc(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,A,M){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,b,A):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===en&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===en&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let b=e.get(p),A=b.envMap,M=b.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(Sy.makeRotationFromEuler(M)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(mf),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,b,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=A*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ey(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,T){let w=T.program;n.uniformBlockBinding(M,w)}function l(M,T){let w=s[M.id];w===void 0&&(m(M),w=h(M),s[M.id]=w,M.addEventListener("dispose",b));let y=T.program;n.updateUBOMapping(M,y);let _=e.render.frame;r[M.id]!==_&&(d(M),r[M.id]=_)}function h(M){let T=u();M.__bindingPointIndex=T;let w=i.createBuffer(),y=M.__size,_=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,y,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,w),w}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Ve("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){let T=s[M.id],w=M.uniforms,y=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,E=w.length;_<E;_++){let R=w[_];if(Array.isArray(R))for(let L=0,O=R.length;L<O;L++)f(R[L],_,L,y);else f(R,_,0,y)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,T,w,y){if(x(M,T,w,y)===!0){let _=M.__offset,E=M.value;if(Array.isArray(E)){let R=0;for(let L=0;L<E.length;L++){let O=E[L],D=p(O);g(O,M.__data,R),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(R+=D.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(E,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,M.__data)}}function g(M,T,w){typeof M=="number"||typeof M=="boolean"?T[0]=M:M.isMatrix3?(T[0]=M.elements[0],T[1]=M.elements[1],T[2]=M.elements[2],T[3]=0,T[4]=M.elements[3],T[5]=M.elements[4],T[6]=M.elements[5],T[7]=0,T[8]=M.elements[6],T[9]=M.elements[7],T[10]=M.elements[8],T[11]=0):ArrayBuffer.isView(M)?T.set(new M.constructor(M.buffer,M.byteOffset,T.length)):M.toArray(T,w)}function x(M,T,w,y){let _=M.value,E=T+"_"+w;if(y[E]===void 0)return typeof _=="number"||typeof _=="boolean"?y[E]=_:ArrayBuffer.isView(_)?y[E]=_.slice():y[E]=_.clone(),!0;{let R=y[E];if(typeof _=="number"||typeof _=="boolean"){if(R!==_)return y[E]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(R.equals(_)===!1)return R.copy(_),!0}}return!1}function m(M){let T=M.uniforms,w=0,y=16;for(let E=0,R=T.length;E<R;E++){let L=Array.isArray(T[E])?T[E]:[T[E]];for(let O=0,D=L.length;O<D;O++){let C=L[O],N=Array.isArray(C.value)?C.value:[C.value];for(let F=0,z=N.length;F<z;F++){let J=N[F],Y=p(J),Z=w%y,ee=Z%Y.boundary,oe=Z+ee;w+=ee,oe!==0&&y-oe<Y.storage&&(w+=y-oe),C.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=w,w+=Y.storage}}}let _=w%y;return _>0&&(w+=y-_),M.__size=w,M.__cache={},this}function p(M){let T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(T.boundary=16,T.storage=M.byteLength):Ie("WebGLRenderer: Unsupported uniform value type.",M),T}function b(M){let T=M.target;T.removeEventListener("dispose",b);let w=o.indexOf(T.__bindingPointIndex);o.splice(w,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function A(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:A}}var Ty=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$n=null;function Ay(){return $n===null&&($n=new Ns(Ty,16,16,Ni,Dn),$n.name="DFG_LUT",$n.minFilter=Rt,$n.magFilter=Rt,$n.wrapS=yn,$n.wrapT=yn,$n.generateMipmaps=!1,$n.needsUpdate=!0),$n}var Zr=class{constructor(e={}){let{canvas:t=Dd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=an}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let x=f,m=new Set([Ta,Ea,wa]),p=new Set([an,Ln,Xs,$s,Ma,ba]),b=new Uint32Array(4),A=new Int32Array(4),M=new G,T=null,w=null,y=[],_=[],E=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,L=!1,O=null,D=null,C=null,N=null;this._outputColorSpace=Nt;let F=0,z=0,J=null,Y=-1,Z=null,ee=new lt,oe=new lt,ae=null,Be=new Ue(0),ve=0,De=t.width,U=t.height,V=1,ie=null,be=null,ce=new lt(0,0,De,U),ze=new lt(0,0,De,U),xt=!1,qe=new Us,tt=!1,ht=!1,je=new $e,ot=new G,Pt=new lt,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},yt=!1;function wt(){return J===null?V:1}let P=n;function _e(S,B){return t.getContext(S,B)}let Fe,I,v,W,q,j,re,le,Q,ne,he,Pe,pe,ue,Le,ke,Xe,H,de,te,fe,Me,se;try{let S={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",mt,!1),t.addEventListener("webglcontextrestored",it,!1),t.addEventListener("webglcontextcreationerror",Mn,!1),P===null){let B="webgl2";if(P=_e(B,S),P===null)throw _e(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ne()}catch(S){throw t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),Ve("WebGLRenderer: "+S.message),S}function Ne(){Fe=new N_(P),Fe.init(),fe=new vy(P,Fe),I=new w_(P,Fe,e,fe),v=new xy(P,Fe),I.reversedDepthBuffer&&d&&v.buffers.depth.setReversed(!0),D=P.createFramebuffer(),C=P.createFramebuffer(),N=P.createFramebuffer(),W=new O_(P),q=new sy,j=new yy(P,Fe,v,q,I,fe,W),re=new D_(R),le=new km(P),Me=new b_(P,le),Q=new U_(P,le,W,Me),ne=new k_(P,Q,le,Me,W),H=new B_(P,I,j),Le=new E_(q),he=new iy(R,re,Fe,I,Me,Le),Pe=new wy(R,q),pe=new oy,ue=new dy(Fe),Xe=new M_(R,re,v,ne,g,c),ke=new _y(R,ne,I),se=new Ey(P,W,I,v),de=new S_(P,Fe,W),te=new F_(P,Fe,W),W.programs=he.programs,R.capabilities=I,R.extensions=Fe,R.properties=q,R.renderLists=pe,R.shadowMap=ke,R.state=v,R.info=W}x!==an&&(E=new H_(x,t.width,t.height,a,s,r));let Ce=new lh(R,P);this.xr=Ce,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let S=Fe.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Fe.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(S){S!==void 0&&(V=S,this.setSize(De,U,!1))},this.getSize=function(S){return S.set(De,U)},this.setSize=function(S,B,K=!0){if(Ce.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}De=S,U=B,t.width=Math.floor(S*V),t.height=Math.floor(B*V),K===!0&&(t.style.width=S+"px",t.style.height=B+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(De*V,U*V).floor()},this.setDrawingBufferSize=function(S,B,K){De=S,U=B,V=K,t.width=Math.floor(S*K),t.height=Math.floor(B*K),this.setViewport(0,0,S,B)},this.setEffects=function(S){if(x===an){Ve("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let B=0;B<S.length;B++)if(S[B].isOutputPass===!0){Ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ee)},this.getViewport=function(S){return S.copy(ce)},this.setViewport=function(S,B,K,X){S.isVector4?ce.set(S.x,S.y,S.z,S.w):ce.set(S,B,K,X),v.viewport(ee.copy(ce).multiplyScalar(V).round())},this.getScissor=function(S){return S.copy(ze)},this.setScissor=function(S,B,K,X){S.isVector4?ze.set(S.x,S.y,S.z,S.w):ze.set(S,B,K,X),v.scissor(oe.copy(ze).multiplyScalar(V).round())},this.getScissorTest=function(){return xt},this.setScissorTest=function(S){v.setScissorTest(xt=S)},this.setOpaqueSort=function(S){ie=S},this.setTransparentSort=function(S){be=S},this.getClearColor=function(S){return S.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,K=!0){let X=0;if(S){let $=!1;if(J!==null){let xe=J.texture.format;$=m.has(xe)}if($){let xe=J.texture.type,we=p.has(xe),ge=Xe.getClearColor(),Te=Xe.getClearAlpha(),Re=ge.r,Ye=ge.g,et=ge.b;we?(b[0]=Re,b[1]=Ye,b[2]=et,b[3]=Te,P.clearBufferuiv(P.COLOR,0,b)):(A[0]=Re,A[1]=Ye,A[2]=et,A[3]=Te,P.clearBufferiv(P.COLOR,0,A))}else X|=P.COLOR_BUFFER_BIT}B&&(X|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(X|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&P.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),O=S},this.dispose=function(){t.removeEventListener("webglcontextlost",mt,!1),t.removeEventListener("webglcontextrestored",it,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),Xe.dispose(),pe.dispose(),ue.dispose(),q.dispose(),re.dispose(),ne.dispose(),Me.dispose(),se.dispose(),he.dispose(),Ce.dispose(),Ce.removeEventListener("sessionstart",au),Ce.removeEventListener("sessionend",lu),Oi.stop()};function mt(S){S.preventDefault(),pr("WebGLRenderer: Context Lost."),L=!0}function it(){pr("WebGLRenderer: Context Restored."),L=!1;let S=W.autoReset,B=ke.enabled,K=ke.autoUpdate,X=ke.needsUpdate,$=ke.type;Ne(),W.autoReset=S,ke.enabled=B,ke.autoUpdate=K,ke.needsUpdate=X,ke.type=$}function Mn(S){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Fn(S){let B=S.target;B.removeEventListener("dispose",Fn),Cp(B)}function Cp(S){Rp(S),q.remove(S)}function Rp(S){let B=q.get(S).programs;B!==void 0&&(B.forEach(function(K){he.releaseProgram(K)}),S.isShaderMaterial&&he.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,K,X,$,xe){B===null&&(B=Vt);let we=$.isMesh&&$.matrixWorld.determinantAffine()<0,ge=Lp(S,B,K,X,$);v.setMaterial(X,we);let Te=K.index,Re=1;if(X.wireframe===!0){if(Te=Q.getWireframeAttribute(K),Te===void 0)return;Re=2}let Ye=K.drawRange,et=K.attributes.position,Ae=Ye.start*Re,st=(Ye.start+Ye.count)*Re;xe!==null&&(Ae=Math.max(Ae,xe.start*Re),st=Math.min(st,(xe.start+xe.count)*Re)),Te!==null?(Ae=Math.max(Ae,0),st=Math.min(st,Te.count)):et!=null&&(Ae=Math.max(Ae,0),st=Math.min(st,et.count));let Lt=st-Ae;if(Lt<0||Lt===1/0)return;Me.setup($,X,ge,K,Te);let vt,dt=de;if(Te!==null&&(vt=le.get(Te),dt=te,dt.setIndex(vt)),$.isMesh)X.wireframe===!0?(v.setLineWidth(X.wireframeLinewidth*wt()),dt.setMode(P.LINES)):dt.setMode(P.TRIANGLES);else if($.isLine){let Wt=X.linewidth;Wt===void 0&&(Wt=1),v.setLineWidth(Wt*wt()),$.isLineSegments?dt.setMode(P.LINES):$.isLineLoop?dt.setMode(P.LINE_LOOP):dt.setMode(P.LINE_STRIP)}else $.isPoints?dt.setMode(P.POINTS):$.isSprite&&dt.setMode(P.TRIANGLES);if($.isBatchedMesh)if(Fe.get("WEBGL_multi_draw"))dt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let Wt=$._multiDrawStarts,Se=$._multiDrawCounts,Zt=$._multiDrawCount,nt=Te?le.get(Te).bytesPerElement:1,_n=q.get(X).currentProgram.getUniforms();for(let On=0;On<Zt;On++)_n.setValue(P,"_gl_DrawID",On),dt.render(Wt[On]/nt,Se[On])}else if($.isInstancedMesh)dt.renderInstances(Ae,Lt,$.count);else if(K.isInstancedBufferGeometry){let Wt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Se=Math.min(K.instanceCount,Wt);dt.renderInstances(Ae,Lt,Se)}else dt.render(Ae,Lt)};function ou(S,B,K,X){O!==null&&S.isNodeMaterial&&O.setObject(X,S),tt===!0&&Le.setState(S,K,!1),S.transparent===!0&&S.side===on&&S.forceSinglePass===!1?(S.side=en,S.needsUpdate=!0,mo(S,B,X),S.side=Wn,S.needsUpdate=!0,mo(S,B,X),S.side=on):mo(S,B,X)}this.compile=function(S,B,K=null){K===null&&(K=S),O!==null&&O.renderStart(S,B,K),w=ue.get(K),w.init(B),_.push(w),K.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(w.pushLight($),$.castShadow&&w.pushShadow($))}),S!==K&&S.traverseVisible(function($){$.isLight&&$.layers.test(B.layers)&&(w.pushLight($),$.castShadow&&w.pushShadow($))}),w.setupLights(),O!==null&&O.updateLights(w.state.lightsArray),ht=this.localClippingEnabled,tt=Le.init(this.clippingPlanes,ht),tt===!0&&Le.setGlobalState(this.clippingPlanes,B),O!==null&&ke.render(w.state.shadowsArray,K,B);let X=new Set;return S.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let xe=$.material;if(xe)if(Array.isArray(xe))for(let we=0;we<xe.length;we++){let ge=xe[we];ou(ge,K,B,$),X.add(ge)}else ou(xe,K,B,$),X.add(xe)}),w=_.pop(),O!==null&&O.renderEnd(),X},this.compileAsync=function(S,B,K=null){let X=this.compile(S,B,K);return new Promise($=>{function xe(){if(X.forEach(function(we){let Te=q.get(we).currentProgram;(Te===void 0||Te.isReady())&&X.delete(we)}),X.size===0){$(S);return}setTimeout(xe,10)}Fe.get("KHR_parallel_shader_compile")!==null?xe():setTimeout(xe,10)})};let Pl=null;function Ip(S){Pl&&Pl(S)}function au(){Oi.stop()}function lu(){Oi.start()}let Oi=new cf;Oi.setAnimationLoop(Ip),typeof self<"u"&&Oi.setContext(self),this.setAnimationLoop=function(S){Pl=S,Ce.setAnimationLoop(S),S===null?Oi.stop():Oi.start()},Ce.addEventListener("sessionstart",au),Ce.addEventListener("sessionend",lu),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;O!==null&&O.renderStart(S,B);let K=Ce.enabled===!0&&Ce.isPresenting===!0,X=E!==null&&(J===null||K)&&E.begin(R,J);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Ce.enabled===!0&&Ce.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Ce.cameraAutoUpdate===!0&&Ce.updateCamera(B),B=Ce.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,B,J),w=ue.get(S,_.length),w.init(B),w.state.textureUnits=j.getTextureUnits(),_.push(w),je.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),qe.setFromProjectionMatrix(je,Tn,B.reversedDepth),ht=this.localClippingEnabled,tt=Le.init(this.clippingPlanes,ht),T=pe.get(S,y.length),T.init(),y.push(T),Ce.enabled===!0&&Ce.isPresenting===!0){let we=R.xr.getDepthSensingMesh();we!==null&&Ll(we,B,-1/0,R.sortObjects)}Ll(S,B,0,R.sortObjects),T.finish(),O!==null&&O.updateLights(w.state.lightsArray),R.sortObjects===!0&&T.sort(ie,be),yt=Ce.enabled===!1||Ce.isPresenting===!1||Ce.hasDepthSensing()===!1,yt&&Xe.addToRenderList(T,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Le.beginShadows();let $=w.state.shadowsArray;if(ke.render($,S,B),tt===!0&&Le.endShadows(),(X&&E.hasRenderPass())===!1){let we=T.opaque,ge=T.transmissive;if(w.setupLights(),B.isArrayCamera){let Te=B.cameras;if(ge.length>0)for(let Re=0,Ye=Te.length;Re<Ye;Re++){let et=Te[Re];hu(we,ge,S,et)}yt&&Xe.render(S);for(let Re=0,Ye=Te.length;Re<Ye;Re++){let et=Te[Re];cu(T,S,et,et.viewport)}}else ge.length>0&&hu(we,ge,S,B),yt&&Xe.render(S),cu(T,S,B)}J!==null&&z===0&&(j.updateMultisampleRenderTarget(J),j.updateRenderTargetMipmap(J)),X&&E.end(R),S.isScene===!0&&S.onAfterRender(R,S,B),Me.resetDefaultState(),Y=-1,Z=null,_.pop(),_.length>0?(w=_[_.length-1],j.setTextureUnits(w.state.textureUnits),tt===!0&&Le.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,y.pop(),y.length>0?T=y[y.length-1]:T=null,O!==null&&O.renderEnd()};function Ll(S,B,K,X){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)K=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(qe)){X&&Pt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(je);let we=ne.update(S),ge=S.material;ge.visible&&T.push(S,we,ge,K,Pt.z,null,B)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(qe))){let we=ne.update(S),ge=S.material;if(X&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Pt.copy(S.boundingSphere.center)):(we.boundingSphere===null&&we.computeBoundingSphere(),Pt.copy(we.boundingSphere.center)),Pt.applyMatrix4(S.matrixWorld).applyMatrix4(je)),Array.isArray(ge)){let Te=we.groups;for(let Re=0,Ye=Te.length;Re<Ye;Re++){let et=Te[Re],Ae=ge[et.materialIndex];Ae&&Ae.visible&&T.push(S,we,Ae,K,Pt.z,et,B)}}else ge.visible&&T.push(S,we,ge,K,Pt.z,null,B)}}let xe=S.children;for(let we=0,ge=xe.length;we<ge;we++)Ll(xe[we],B,K,X)}function cu(S,B,K,X){let{opaque:$,transmissive:xe,transparent:we}=S;w.setupLightsView(K),tt===!0&&Le.setGlobalState(R.clippingPlanes,K),X&&v.viewport(ee.copy(X)),$.length>0&&po($,B,K),xe.length>0&&po(xe,B,K),we.length>0&&po(we,B,K),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function hu(S,B,K,X){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[X.id]===void 0){let Ae=Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[X.id]=new nn(1,1,{generateMipmaps:!0,type:Ae?Dn:an,minFilter:Pn,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}let xe=w.state.transmissionRenderTarget[X.id],we=X.viewport||ee;xe.setSize(we.z*R.transmissionResolutionScale,we.w*R.transmissionResolutionScale);let ge=R.getRenderTarget(),Te=R.getActiveCubeFace(),Re=R.getActiveMipmapLevel();R.setRenderTarget(xe),R.getClearColor(Be),ve=R.getClearAlpha(),ve<1&&R.setClearColor(16777215,.5),R.clear(),yt&&Xe.render(K);let Ye=R.toneMapping;R.toneMapping=In;let et=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),w.setupLightsView(X),tt===!0&&Le.setGlobalState(R.clippingPlanes,X),po(S,K,X),j.updateMultisampleRenderTarget(xe),j.updateRenderTargetMipmap(xe),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let Ae=!1;for(let st=0,Lt=B.length;st<Lt;st++){let vt=B[st],{object:dt,geometry:Wt,material:Se,group:Zt}=vt;if(Se.side===on&&dt.layers.test(X.layers)){let nt=Se.side;Se.side=en,Se.needsUpdate=!0,uu(dt,K,X,Wt,Se,Zt),Se.side=nt,Se.needsUpdate=!0,Ae=!0}}Ae===!0&&(j.updateMultisampleRenderTarget(xe),j.updateRenderTargetMipmap(xe))}R.setRenderTarget(ge,Te,Re),R.setClearColor(Be,ve),et!==void 0&&(X.viewport=et),R.toneMapping=Ye}function po(S,B,K){let X=B.isScene===!0?B.overrideMaterial:null;for(let $=0,xe=S.length;$<xe;$++){let we=S[$],{object:ge,geometry:Te,group:Re}=we,Ye=we.material;Ye.allowOverride===!0&&X!==null&&(Ye=X),ge.layers.test(K.layers)&&uu(ge,B,K,Te,Ye,Re)}}function uu(S,B,K,X,$,xe){O!==null&&$.isNodeMaterial&&O.setObject(S,$),S.onBeforeRender(R,B,K,X,$,xe),S.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),$.onBeforeRender(R,B,K,X,S,xe),$.transparent===!0&&$.side===on&&$.forceSinglePass===!1?($.side=en,$.needsUpdate=!0,R.renderBufferDirect(K,B,X,$,S,xe),$.side=Wn,$.needsUpdate=!0,R.renderBufferDirect(K,B,X,$,S,xe),$.side=on):R.renderBufferDirect(K,B,X,$,S,xe),S.onAfterRender(R,B,K,X,$,xe)}function mo(S,B,K){B.isScene!==!0&&(B=Vt);let X=q.get(S),$=w.state.lights,xe=w.state.shadowsArray,we=$.state.version,ge=he.getParameters(S,$.state,xe,B,K,w.state.lightProbeGridArray),Te=he.getProgramCacheKey(ge),Re=X.programs;X.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?B.environment:null,X.fog=B.fog;let Ye=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;X.envMap=re.get(S.envMap||X.environment,Ye),X.envMapRotation=X.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,Re===void 0&&(S.addEventListener("dispose",Fn),Re=new Map,X.programs=Re);let et=Re.get(Te);if(et!==void 0){if(X.currentProgram===et&&X.lightsStateVersion===we)return fu(S,ge),et}else ge.uniforms=he.getUniforms(S),O!==null&&S.isNodeMaterial&&O.build(S,K,ge),S.onBeforeCompile(ge,R),et=he.acquireProgram(ge,Te),Re.set(Te,et),X.uniforms=ge.uniforms;let Ae=X.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ae.clippingPlanes=Le.uniform),fu(S,ge),X.needsLights=Np(S),X.lightsStateVersion=we,X.needsLights&&(Ae.ambientLightColor.value=$.state.ambient,Ae.lightProbe.value=$.state.probe,Ae.sunLights.value=$.state.sun,Ae.sunLightShadows.value=$.state.sunShadow,Ae.directionalLights.value=$.state.directional,Ae.directionalLightShadows.value=$.state.directionalShadow,Ae.spotLights.value=$.state.spot,Ae.spotLightShadows.value=$.state.spotShadow,Ae.rectAreaLights.value=$.state.rectArea,Ae.ltc_1.value=$.state.rectAreaLTC1,Ae.ltc_2.value=$.state.rectAreaLTC2,Ae.pointLights.value=$.state.point,Ae.pointLightShadows.value=$.state.pointShadow,Ae.hemisphereLights.value=$.state.hemi,Ae.sunShadowMatrix.value=$.state.sunShadowMatrix,Ae.sunShadowCascade.value=$.state.sunShadowCascade,Ae.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ae.spotLightMatrix.value=$.state.spotLightMatrix,Ae.spotLightMap.value=$.state.spotLightMap,Ae.pointShadowMatrix.value=$.state.pointShadowMatrix),X.lightProbeGrid=w.state.lightProbeGridArray.length>0,X.currentProgram=et,X.uniformsList=null,et}function du(S){if(S.uniformsList===null){let B=S.currentProgram.getUniforms();S.uniformsList=Zs.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function fu(S,B){let K=q.get(S);K.outputColorSpace=B.outputColorSpace,K.batching=B.batching,K.batchingColor=B.batchingColor,K.instancing=B.instancing,K.instancingColor=B.instancingColor,K.instancingMorph=B.instancingMorph,K.skinning=B.skinning,K.morphTargets=B.morphTargets,K.morphNormals=B.morphNormals,K.morphColors=B.morphColors,K.morphTargetsCount=B.morphTargetsCount,K.numClippingPlanes=B.numClippingPlanes,K.numIntersection=B.numClipIntersection,K.vertexAlphas=B.vertexAlphas,K.vertexTangents=B.vertexTangents,K.toneMapping=B.toneMapping}function Pp(S,B){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(B.matrixWorld);for(let K=0,X=S.length;K<X;K++){let $=S[K];if($.texture!==null&&$.boundingBox.containsPoint(M))return $}return null}function Lp(S,B,K,X,$){B.isScene!==!0&&(B=Vt),j.resetTextureUnits();let xe=B.fog,we=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?B.environment:null,ge=J===null?R.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ze.workingColorSpace,Te=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Re=re.get(X.envMap||we,Te),Ye=X.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,et=!!K.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Ae=!!K.morphAttributes.position,st=!!K.morphAttributes.normal,Lt=!!K.morphAttributes.color,vt=In;X.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(vt=R.toneMapping);let dt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Wt=dt!==void 0?dt.length:0,Se=q.get(X),Zt=w.state.lights;if(tt===!0&&(ht===!0||S!==Z)){let gt=S===Z&&X.id===Y;Le.setState(X,S,gt)}let nt=!1;X.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==Zt.state.version||Se.outputColorSpace!==ge||$.isBatchedMesh&&Se.batching===!1||!$.isBatchedMesh&&Se.batching===!0||$.isBatchedMesh&&Se.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Se.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Se.instancing===!1||!$.isInstancedMesh&&Se.instancing===!0||$.isSkinnedMesh&&Se.skinning===!1||!$.isSkinnedMesh&&Se.skinning===!0||$.isInstancedMesh&&Se.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Se.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Se.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Se.instancingMorph===!1&&$.morphTexture!==null||Se.envMap!==Re||X.fog===!0&&Se.fog!==xe||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==Le.numPlanes||Se.numIntersection!==Le.numIntersection)||Se.vertexAlphas!==Ye||Se.vertexTangents!==et||Se.morphTargets!==Ae||Se.morphNormals!==st||Se.morphColors!==Lt||Se.toneMapping!==vt||Se.morphTargetsCount!==Wt||!!Se.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(nt=!0):(nt=!0,Se.__version=X.version);let _n=Se.currentProgram;nt===!0&&(_n=mo(X,B,$),O&&X.isNodeMaterial&&O.onUpdateProgram(X,_n,Se));let On=!1,pi=!1,os=!1,ut=_n.getUniforms(),Tt=Se.uniforms;if(v.useProgram(_n.program)&&(On=!0,pi=!0,os=!0),X.id!==Y&&(Y=X.id,pi=!0),Se.needsLights){let gt=Pp(w.state.lightProbeGridArray,$);Se.lightProbeGrid!==gt&&(Se.lightProbeGrid=gt,pi=!0)}if(On||Z!==S){v.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ut.setValue(P,"projectionMatrix",S.projectionMatrix),ut.setValue(P,"viewMatrix",S.matrixWorldInverse);let gi=ut.map.cameraPosition;gi!==void 0&&gi.setValue(P,ot.setFromMatrixPosition(S.matrixWorld)),I.logarithmicDepthBuffer&&ut.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&ut.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),Z!==S&&(Z=S,pi=!0,os=!0)}if(Se.needsLights&&(Zt.state.sunShadowMap.length>0&&ut.setValue(P,"sunShadowMap",Zt.state.sunShadowMap,j),Zt.state.directionalShadowMap.length>0&&ut.setValue(P,"directionalShadowMap",Zt.state.directionalShadowMap,j),Zt.state.spotShadowMap.length>0&&ut.setValue(P,"spotShadowMap",Zt.state.spotShadowMap,j),Zt.state.pointShadowMap.length>0&&ut.setValue(P,"pointShadowMap",Zt.state.pointShadowMap,j)),$.isSkinnedMesh){ut.setOptional(P,$,"bindMatrix"),ut.setOptional(P,$,"bindMatrixInverse");let gt=$.skeleton;gt&&(gt.boneTexture===null&&gt.computeBoneTexture(),ut.setValue(P,"boneTexture",gt.boneTexture,j))}$.isBatchedMesh&&(ut.setOptional(P,$,"batchingTexture"),ut.setValue(P,"batchingTexture",$._matricesTexture,j),ut.setOptional(P,$,"batchingIdTexture"),ut.setValue(P,"batchingIdTexture",$._indirectTexture,j),ut.setOptional(P,$,"batchingColorTexture"),$._colorsTexture!==null&&ut.setValue(P,"batchingColorTexture",$._colorsTexture,j));let mi=K.morphAttributes;if((mi.position!==void 0||mi.normal!==void 0||mi.color!==void 0)&&H.update($,K,_n),(pi||Se.receiveShadow!==$.receiveShadow)&&(Se.receiveShadow=$.receiveShadow,ut.setValue(P,"receiveShadow",$.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&B.environment!==null&&(Tt.envMapIntensity.value=B.environmentIntensity),Tt.dfgLUT!==void 0&&(Tt.dfgLUT.value=Ay()),pi){if(ut.setValue(P,"toneMappingExposure",R.toneMappingExposure),Se.needsLights&&Dp(Tt,os),xe&&X.fog===!0&&Pe.refreshFogUniforms(Tt,xe),Pe.refreshMaterialUniforms(Tt,X,V,U,w.state.transmissionRenderTarget[S.id]),Se.needsLights&&Se.lightProbeGrid){let gt=Se.lightProbeGrid;Tt.probesSH.value=gt.texture,Tt.probesMin.value.copy(gt.boundingBox.min),Tt.probesMax.value.copy(gt.boundingBox.max),Tt.probesResolution.value.copy(gt.resolution)}Zs.upload(P,du(Se),Tt,j)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(Zs.upload(P,du(Se),Tt,j),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&ut.setValue(P,"center",$.center),ut.setValue(P,"modelViewMatrix",$.modelViewMatrix),ut.setValue(P,"normalMatrix",$.normalMatrix),ut.setValue(P,"modelMatrix",$.matrixWorld),X.uniformsGroups!==void 0){let gt=X.uniformsGroups;for(let gi=0,as=gt.length;gi<as;gi++){let mu=gt[gi];se.update(mu,_n),se.bind(mu,_n)}}return _n}function Dp(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.sunLights.needsUpdate=B,S.sunLightShadows.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function Np(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(S,B,K){let X=q.get(S);X.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),q.get(S.texture).__webglTexture=B,q.get(S.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:K,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,B){let K=q.get(S);K.__webglFramebuffer=B,K.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,K=0){J=S,F=B,z=K;let X=null,$=!1,xe=!1;if(S){let ge=q.get(S);if(ge.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(P.FRAMEBUFFER,ge.__webglFramebuffer),ee.copy(S.viewport),oe.copy(S.scissor),ae=S.scissorTest,v.viewport(ee),v.scissor(oe),v.setScissorTest(ae),Y=-1;return}else if(ge.__webglFramebuffer===void 0)j.setupRenderTarget(S);else if(ge.__hasExternalTextures)j.rebindTextures(S,q.get(S.texture).__webglTexture,q.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Ye=S.depthTexture;if(ge.__boundDepthTexture!==Ye){if(Ye!==null&&q.has(Ye)&&(S.width!==Ye.image.width||S.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");j.setupDepthRenderbuffer(S)}}let Te=S.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(xe=!0);let Re=q.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Re[B])?X=Re[B][K]:X=Re[B],$=!0):S.samples>0&&j.useMultisampledRTT(S)===!1?X=q.get(S).__webglMultisampledFramebuffer:Array.isArray(Re)?X=Re[K]:X=Re,ee.copy(S.viewport),oe.copy(S.scissor),ae=S.scissorTest}else ee.copy(ce).multiplyScalar(V).floor(),oe.copy(ze).multiplyScalar(V).floor(),ae=xt;if(K!==0&&(X=D),v.bindFramebuffer(P.FRAMEBUFFER,X)&&v.drawBuffers(S,X),v.viewport(ee),v.scissor(oe),v.setScissorTest(ae),$){let ge=q.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+B,ge.__webglTexture,K)}else if(xe){let ge=B;for(let Te=0;Te<S.textures.length;Te++){let Re=q.get(S.textures[Te]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Te,Re.__webglTexture,K,ge)}}else if(S!==null&&K!==0){let ge=q.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ge.__webglTexture,K)}Y=-1};function pu(S){let B=q.get(S);return(B.__readFormat!==S.format||B.__readType!==S.type)&&(B.__readFormat=S.format,B.__readType=S.type,B.__formatReadable=I.textureFormatReadable(S.format),B.__typeReadable=I.textureTypeReadable(S.type)),B}this.readRenderTargetPixels=function(S,B,K,X,$,xe,we,ge=0){if(!(S&&S.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we]),Te){v.bindFramebuffer(P.FRAMEBUFFER,Te);try{let Re=S.textures[ge],Ye=Re.format,et=Re.type;S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ge);let Ae=pu(Re);if(Ae.__formatReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ae.__typeReadable===!1){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-X&&K>=0&&K<=S.height-$&&P.readPixels(B,K,X,$,fe.convert(Ye),fe.convert(et),xe)}finally{let Re=J!==null?q.get(J).__webglFramebuffer:null;v.bindFramebuffer(P.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(S,B,K,X,$,xe,we,ge=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=q.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&we!==void 0&&(Te=Te[we]),Te)if(B>=0&&B<=S.width-X&&K>=0&&K<=S.height-$){v.bindFramebuffer(P.FRAMEBUFFER,Te);let Re=S.textures[ge],Ye=Re.format,et=Re.type;S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ge);let Ae=pu(Re);if(Ae.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ae.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let st=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,st),P.bufferData(P.PIXEL_PACK_BUFFER,xe.byteLength,P.STREAM_READ),P.readPixels(B,K,X,$,fe.convert(Ye),fe.convert(et),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let Lt=J!==null?q.get(J).__webglFramebuffer:null;v.bindFramebuffer(P.FRAMEBUFFER,Lt);let vt=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Ud(P,vt,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,st),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,xe),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(st),P.deleteSync(vt),xe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,B=null,K=0){let X=Math.pow(2,-K),$=Math.floor(S.image.width*X),xe=Math.floor(S.image.height*X),we=B!==null?B.x:0,ge=B!==null?B.y:0;j.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,K,0,0,we,ge,$,xe),v.unbindTexture()},this.copyTextureToTexture=function(S,B,K=null,X=null,$=0,xe=0){let we,ge,Te,Re,Ye,et,Ae,st,Lt,vt=S.isCompressedTexture?S.mipmaps[xe]:S.image;if(K!==null)we=K.max.x-K.min.x,ge=K.max.y-K.min.y,Te=K.isBox3?K.max.z-K.min.z:1,Re=K.min.x,Ye=K.min.y,et=K.isBox3?K.min.z:0;else{let Tt=Math.pow(2,-$);we=Math.floor(vt.width*Tt),ge=Math.floor(vt.height*Tt),S.isDataArrayTexture?Te=vt.depth:S.isData3DTexture?Te=Math.floor(vt.depth*Tt):Te=1,Re=0,Ye=0,et=0}X!==null?(Ae=X.x,st=X.y,Lt=X.z):(Ae=0,st=0,Lt=0);let dt=fe.convert(B.format),Wt=fe.convert(B.type),Se;B.isData3DTexture?(j.setTexture3D(B,0),Se=P.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(j.setTexture2DArray(B,0),Se=P.TEXTURE_2D_ARRAY):(j.setTexture2D(B,0),Se=P.TEXTURE_2D),v.activeTexture(P.TEXTURE0),v.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,B.flipY),v.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),v.pixelStorei(P.UNPACK_ALIGNMENT,B.unpackAlignment);let Zt=v.getParameter(P.UNPACK_ROW_LENGTH),nt=v.getParameter(P.UNPACK_IMAGE_HEIGHT),_n=v.getParameter(P.UNPACK_SKIP_PIXELS),On=v.getParameter(P.UNPACK_SKIP_ROWS),pi=v.getParameter(P.UNPACK_SKIP_IMAGES);v.pixelStorei(P.UNPACK_ROW_LENGTH,vt.width),v.pixelStorei(P.UNPACK_IMAGE_HEIGHT,vt.height),v.pixelStorei(P.UNPACK_SKIP_PIXELS,Re),v.pixelStorei(P.UNPACK_SKIP_ROWS,Ye),v.pixelStorei(P.UNPACK_SKIP_IMAGES,et);let os=S.isDataArrayTexture||S.isData3DTexture,ut=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){let Tt=q.get(S),mi=q.get(B),gt=q.get(Tt.__renderTarget),gi=q.get(mi.__renderTarget);v.bindFramebuffer(P.READ_FRAMEBUFFER,gt.__webglFramebuffer),v.bindFramebuffer(P.DRAW_FRAMEBUFFER,gi.__webglFramebuffer);for(let as=0;as<Te;as++)os&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,q.get(S).__webglTexture,$,et+as),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,q.get(B).__webglTexture,xe,Lt+as)),P.blitFramebuffer(Re,Ye,we,ge,Ae,st,we,ge,P.DEPTH_BUFFER_BIT,P.NEAREST);v.bindFramebuffer(P.READ_FRAMEBUFFER,null),v.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if($!==0||S.isRenderTargetTexture||q.has(S)){let Tt=q.get(S),mi=q.get(B);v.bindFramebuffer(P.READ_FRAMEBUFFER,C),v.bindFramebuffer(P.DRAW_FRAMEBUFFER,N);for(let gt=0;gt<Te;gt++)os?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.__webglTexture,$,et+gt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Tt.__webglTexture,$),ut?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,mi.__webglTexture,xe,Lt+gt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,mi.__webglTexture,xe),$!==0?P.blitFramebuffer(Re,Ye,we,ge,Ae,st,we,ge,P.COLOR_BUFFER_BIT,P.NEAREST):ut?P.copyTexSubImage3D(Se,xe,Ae,st,Lt+gt,Re,Ye,we,ge):P.copyTexSubImage2D(Se,xe,Ae,st,Re,Ye,we,ge);v.bindFramebuffer(P.READ_FRAMEBUFFER,null),v.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else ut?S.isDataTexture||S.isData3DTexture?P.texSubImage3D(Se,xe,Ae,st,Lt,we,ge,Te,dt,Wt,vt.data):B.isCompressedArrayTexture?P.compressedTexSubImage3D(Se,xe,Ae,st,Lt,we,ge,Te,dt,vt.data):P.texSubImage3D(Se,xe,Ae,st,Lt,we,ge,Te,dt,Wt,vt):S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,xe,Ae,st,we,ge,dt,Wt,vt.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,xe,Ae,st,vt.width,vt.height,dt,vt.data):P.texSubImage2D(P.TEXTURE_2D,xe,Ae,st,we,ge,dt,Wt,vt);v.pixelStorei(P.UNPACK_ROW_LENGTH,Zt),v.pixelStorei(P.UNPACK_IMAGE_HEIGHT,nt),v.pixelStorei(P.UNPACK_SKIP_PIXELS,_n),v.pixelStorei(P.UNPACK_SKIP_ROWS,On),v.pixelStorei(P.UNPACK_SKIP_IMAGES,pi),xe===0&&B.generateMipmaps&&P.generateMipmap(Se),v.unbindTexture()},this.initRenderTarget=function(S){q.get(S).__webglFramebuffer===void 0&&j.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?j.setTextureCube(S,0):S.isData3DTexture?j.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?j.setTexture2DArray(S,0):j.setTexture2D(S,0),v.unbindTexture()},this.resetState=function(){F=0,z=0,J=null,v.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}};var gf={type:"change"},hh={type:"start"},xf={type:"end"},ul=new ii,_f=new dn,Ry=Math.cos(70*$r.DEG2RAD),Bt=new G,ln=2*Math.PI,ct={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ch=1e-6,dl=class extends Ur{constructor(e,t=null){super(e,t),this.state=ct.NONE,this.target=new G,this.cursor=new G,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ii.ROTATE,MIDDLE:Ii.DOLLY,RIGHT:Ii.PAN},this.touches={ONE:Pi.ROTATE,TWO:Pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new G,this._lastQuaternion=new qt,this._lastTargetPosition=new G,this._quat=new qt().setFromUnitVectors(e.up,new G(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hs,this._sphericalDelta=new Hs,this._scale=1,this._panOffset=new G,this._rotateStart=new Oe,this._rotateEnd=new Oe,this._rotateDelta=new Oe,this._panStart=new Oe,this._panEnd=new Oe,this._panDelta=new Oe,this._dollyStart=new Oe,this._dollyEnd=new Oe,this._dollyDelta=new Oe,this._dollyDirection=new G,this._mouse=new Oe,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Py.bind(this),this._onPointerDown=Iy.bind(this),this._onPointerUp=Ly.bind(this),this._onContextMenu=ky.bind(this),this._onMouseWheel=Uy.bind(this),this._onKeyDown=Fy.bind(this),this._onTouchStart=Oy.bind(this),this._onTouchMove=By.bind(this),this._onMouseDown=Dy.bind(this),this._onMouseMove=Ny.bind(this),this._interceptControlDown=zy.bind(this),this._interceptControlUp=Hy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ct.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(gf),this.update(),this.state=ct.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Bt.copy(t).sub(this.target),Bt.applyQuaternion(this._quat),this._spherical.setFromVector3(Bt),this.autoRotate&&this.state===ct.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=ln:n>Math.PI&&(n-=ln),s<-Math.PI?s+=ln:s>Math.PI&&(s-=ln),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Bt.setFromSpherical(this._spherical),Bt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Bt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Bt.length();o=this._clampDistance(a*this._scale);let c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){let a=new G(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;let l=new G(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=Bt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ul.origin.copy(this.object.position),ul.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ul.direction))<Ry?this.object.lookAt(this.target):(_f.setFromNormalAndCoplanarPoint(this.object.up,this.target),ul.intersectPlane(_f,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ch||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ch||this._lastTargetPosition.distanceToSquared(this.target)>ch?(this.dispatchEvent(gf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ln/60*this.autoRotateSpeed*e:ln/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Bt.setFromMatrixColumn(t,0),Bt.multiplyScalar(-e),this._panOffset.add(Bt)}_panUp(e,t){this.screenSpacePanning===!0?Bt.setFromMatrixColumn(t,1):(Bt.setFromMatrixColumn(t,0),Bt.crossVectors(this.object.up,Bt)),Bt.multiplyScalar(e),this._panOffset.add(Bt)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Bt.copy(s).sub(this.target);let r=Bt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Oe,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Iy(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Py(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Ly(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(xf),this.state=ct.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Dy(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ii.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ct.DOLLY;break;case Ii.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ct.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ct.ROTATE}break;case Ii.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ct.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ct.PAN}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(hh)}function Ny(i){switch(this.state){case ct.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ct.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ct.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Uy(i){this.enabled===!1||this.enableZoom===!1||this.state!==ct.NONE||(i.preventDefault(),this.dispatchEvent(hh),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(xf))}function Fy(i){this.enabled!==!1&&this._handleKeyDown(i)}function Oy(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Pi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ct.TOUCH_ROTATE;break;case Pi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ct.TOUCH_PAN;break;default:this.state=ct.NONE}break;case 2:switch(this.touches.TWO){case Pi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ct.TOUCH_DOLLY_PAN;break;case Pi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ct.TOUCH_DOLLY_ROTATE;break;default:this.state=ct.NONE}break;default:this.state=ct.NONE}this.state!==ct.NONE&&this.dispatchEvent(hh)}function By(i){switch(this._trackPointer(i),this.state){case ct.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ct.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ct.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ct.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ct.NONE}}function ky(i){this.enabled!==!1&&i.preventDefault()}function zy(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Hy(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function uh(i,e){if(e===Uc)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===qs||e===Wr){let t=i.getIndex();if(t===null){let r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===qs)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function yf(i){let e=new Map,t=new Map,n=i.clone();return vf(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function vf(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)vf(i.children[n],e.children[n],t)}var jr=class extends Gn{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new xh(t)}),this.register(function(t){return new yh(t)}),this.register(function(t){return new Ch(t)}),this.register(function(t){return new Rh(t)}),this.register(function(t){return new Ih(t)}),this.register(function(t){return new Mh(t)}),this.register(function(t){return new bh(t)}),this.register(function(t){return new Sh(t)}),this.register(function(t){return new wh(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new Eh(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new Ah(t)}),this.register(function(t){return new Th(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new fl(t,Qe.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new fl(t,Qe.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Ph(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=hi.extractUrlBase(e);o=hi.resolveURL(l,this.path)}else o=hi.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new Bs(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Ef){try{o[Qe.KHR_BINARY_GLTF]=new Lh(e)}catch(u){s&&s(u);return}r=JSON.parse(o[Qe.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new kh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case Qe.KHR_MATERIALS_UNLIT:o[u]=new gh;break;case Qe.KHR_DRACO_MESH_COMPRESSION:o[u]=new Dh(r,this.dracoLoader);break;case Qe.KHR_TEXTURE_TRANSFORM:o[u]=new Nh;break;case Qe.KHR_MESH_QUANTIZATION:o[u]=new Uh;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Vy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function It(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var Qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},mh=class{constructor(e){this.parser=e,this.name=Qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new Ue(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],jt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ri(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Dr(h),l.distance=u;break;case"spot":l=new Lr(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Yn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},gh=class{constructor(){this.name=Qe.KHR_MATERIALS_UNLIT}getMaterialType(){return Rn}extendParams(e,t,n){let s=[];e.color=new Ue(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],jt),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Nt))}return Promise.all(s)}},_h=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},xh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Oe(r,r)}return Promise.all(s)}},yh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},vh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},Mh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SHEEN}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new Ue(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],jt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Nt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},bh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Sh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_VOLUME}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ue().setRGB(r[0],r[1],r[2],jt),Promise.all(s)}},wh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_IOR}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Eh=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ue().setRGB(r[0],r[1],r[2],jt),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Nt)),Promise.all(s)}},Th=class{constructor(e){this.parser=e,this.name=Qe.EXT_MATERIALS_BUMP}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},Ah=class{constructor(e){this.parser=e,this.name=Qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return It(this.parser,e,this.name)!==null?Yt:null}extendMaterialParams(e,t){let n=It(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},Ch=class{constructor(e){this.parser=e,this.name=Qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Rh=class{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},Ih=class{constructor(e){this.parser=e,this.name=Qe.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}},fl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):o.ready.then(function(){let f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}},Ph=class{constructor(e){this.name=Qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==vn.TRIANGLES&&l.mode!==vn.TRIANGLE_STRIP&&l.mode!==vn.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let g of u){let x=new $e,m=new G,p=new qt,b=new G(1,1,1),A=new $i(g.geometry,g.material,d);for(let T=0;T<d;T++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,T),c.SCALE&&b.fromBufferAttribute(c.SCALE,T),A.setMatrixAt(T,x.compose(m,p,b));let M=null;for(let T in c)if(T==="_COLOR_0"){let w=c[T];A.instanceColor=new si(w.array,w.itemSize,w.normalized)}else if(T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"){if(M===null){let y=A.geometry;M=new Ut,M.name=y.name;for(let _ in y.attributes)M.setAttribute(_,y.attributes[_]);for(let _ in y.morphAttributes)M.morphAttributes[_]=y.morphAttributes[_];y.index!==null&&M.setIndex(y.index),M.morphTargetsRelative=y.morphTargetsRelative;for(let _ of y.groups)M.addGroup(_.start,_.count,_.materialIndex);y.boundingBox!==null&&(M.boundingBox=y.boundingBox.clone()),y.boundingSphere!==null&&(M.boundingSphere=y.boundingSphere.clone()),M.drawRange.start=y.drawRange.start,M.drawRange.count=y.drawRange.count,M.userData=Object.assign({},y.userData),A.geometry=M}let w=c[T];M.setAttribute(T,new si(w.array,w.itemSize,w.normalized))}Mt.prototype.copy.call(A,g),this.parser.assignFinalMaterial(A),f.push(A)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},Ef="glTF",Jr=12,Mf={JSON:1313821514,BIN:5130562},Lh=class{constructor(e){this.name=Qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Jr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ef)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Jr,r=new DataView(e,Jr),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===Mf.JSON){let l=new Uint8Array(e,Jr+o,a);this.content=n.decode(l)}else if(c===Mf.BIN){let l=Jr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Dh=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=Oh[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Oh[h]||h.toLowerCase();if(o[h]!==void 0){let d=n.accessors[e.attributes[h]],f=js[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(let g in f.attributes){let x=f.attributes[g],m=c[g];m!==void 0&&(x.normalized=m)}u(f)},a,l,jt,d)})})}},Nh=class{constructor(){this.name=Qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Uh=class{constructor(){this.name=Qe.KHR_MESH_QUANTIZATION}},pl=class extends Vn{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,x=g-l,m=-2*f+3*d,p=f-d,b=1-m,A=p-d+u;for(let M=0;M!==a;M++){let T=o[x+M+a],w=o[x+M+c]*h,y=o[g+M+a],_=o[g+M]*h;r[M]=b*T+A*w+m*y+p*_}return r}},Gy=new qt,Fh=class extends pl{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Gy.fromArray(r).normalize().toArray(r),r}},vn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},js={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},bf={9728:Ct,9729:Rt,9984:ya,9985:Ws,9986:ji,9987:Pn},Sf={33071:yn,33648:ws,10497:wi},dh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Oh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ui={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Wy={CUBICSPLINE:void 0,LINEAR:Wi,STEP:Gi},fh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Xy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new ri({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Wn})),i.DefaultMaterial}function ts(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Yn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function $y(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function qy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Yy(i){let e,t=i.extensions&&i.extensions[Qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ph(t.attributes):e=i.indices+":"+ph(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ph(i.targets[n]);return e}function ph(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Bh(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Ky(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Zy=new $e,kh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Vy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Ir(this.options.manager):this.textureLoader=new Nr(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ts(r,a,s),Yn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(let c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Qe.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(hi.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=dh[s.type],a=js[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new Et(l,o,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=dh[s.type],l=js[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,m;if(f&&f!==u){let p=Math.floor(d/f),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count,A=t.cache.get(b);A||(x=new l(a,p*f,s.count*f/h),A=new Ps(x,f/h),t.cache.add(b,A)),m=new Ls(A,c,d%f/h,g)}else a===null?x=new l(s.count*c):x=new l(a,d,s.count*c),m=new Et(x,c,g);if(s.sparse!==void 0){let p=dh.SCALAR,b=js[s.sparse.indices.componentType],A=s.sparse.indices.byteOffset||0,M=s.sparse.values.byteOffset||0,T=new b(o[1],A,s.sparse.count*p),w=new l(o[2],M,s.sparse.count*c);a!==null&&(m=new Et(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let y=0,_=T.length;y<_;y++){let E=T[y];if(m.setX(E,w[y*c]),c>=2&&m.setY(E,w[y*c+1]),c>=3&&m.setZ(E,w[y*c+2]),c>=4&&m.setW(E,w[y*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let d=(r.samplers||{})[o.sampler]||{};return h.magFilter=bf[d.magFilter]||Rt,h.minFilter=bf[d.minFilter]||Pn,h.wrapS=Sf[d.wrapS]||wi,h.wrapT=Sf[d.wrapT]||wi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Ct&&h.minFilter!==Rt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=s.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){let m=new Ht(x);m.needsUpdate=!0,d(m)}),t.load(hi.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),Yn(u,o),u.userData.mimeType=o.mimeType||Ky(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Qe.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[Qe.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[Qe.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Fs,Qt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ei,Qt.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ri}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[Qe.KHR_MATERIALS_UNLIT]){let u=s[Qe.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new Ue(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],jt),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Nt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=on);let h=r.alphaMode||fh.OPAQUE;if(h===fh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===fh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Rn&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Oe(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Rn&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Rn){let u=r.emissiveFactor;a.emissive=new Ue().setRGB(u[0],u[1],u[2],jt)}return r.emissiveTexture!==void 0&&o!==Rn&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Nt)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),Yn(u,r),t.associations.set(u,{materials:e}),r.extensions&&ts(s,u,r),u})}createUniqueName(e){let t=ft.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[Qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return wf(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=Yy(l),u=s[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Qe.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=wf(new Ut,l,t),l.mode===vn.TRIANGLE_STRIP?d=d.then(f=>uh(f,Wr)):l.mode===vn.TRIANGLE_FAN&&(d=d.then(f=>uh(f,qs))),s[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?Xy(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let x=h[f],m=o[f],p,b=l[f];if(m.mode===vn.TRIANGLES||m.mode===vn.TRIANGLE_STRIP||m.mode===vn.TRIANGLE_FAN||m.mode===void 0){let A=r.isSkinnedMesh===!0,M=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");A&&M===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=A&&M?new yr(x,b):new Gt(x,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(m.mode===vn.LINES)p=new Yi(x,b);else if(m.mode===vn.LINE_STRIP)p=new qi(x,b);else if(m.mode===vn.LINE_LOOP)p=new Mr(x,b);else if(m.mode===vn.POINTS)p=new br(x,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&qy(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Yn(p,r),m.extensions&&ts(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&ts(s,u[0],r),u[0];let d=new tn;r.extensions&&ts(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new At($r.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Ci(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Yn(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let d=new $e;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new vr(a,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let f=s.channels[u],g=s.samplers[f.sampler],x=f.target,m=x.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,b=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",b)),l.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],x=u[3],m=u[4],p=[];for(let A=0,M=d.length;A<M;A++){let T=d[A],w=f[A],y=g[A],_=x[A],E=m[A];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();let R=n._createAnimationTracks(T,w,y,_,E);if(R)for(let L=0;L<R.length;L++)p.push(R[L])}let b=new Rr(r,void 0,p);return Yn(b,s),b})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Zy)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,g=u[0];h.pivot=new G().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Ds:l.length>1?h=new tn:l.length===1?h=l[0]:h=new Mt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),Yn(h,r),r.extensions&&ts(n,h,r),r.matrix!==void 0){let u=new $e;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new tn;n.name&&(r.name=s.createUniqueName(n.name)),Yn(r,n),n.extensions&&ts(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++){let d=c[h];d.parent!==null?r.add(yf(d)):r.add(d)}let l=h=>{let u=new Map;for(let[d,f]of s.associations)(d instanceof Qt||d instanceof Ht)&&u.set(d,f);return h.traverse(d=>{let f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}Ui[r.path]===Ui.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(a);let h;switch(Ui[r.path]){case Ui.weights:h=ai;break;case Ui.rotation:h=li;break;case Ui.translation:case Ui.scale:h=Ai;break;default:n.itemSize===1?h=ai:h=Ai;break}let u=s.interpolation!==void 0?Wy[s.interpolation]:Wi,d=this._getArrayFromAccessor(n);for(let f=0,g=c.length;f<g;f++){let x=new h(c[f]+"."+Ui[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),o.push(x)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Bh(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof li?Fh:pl;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Jy(i,e,t){let n=e.attributes,s=new fn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new G(c[0],c[1],c[2]),new G(l[0],l[1],l[2])),a.normalized){let h=Bh(js[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new G,c=new G;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let x=Bh(js[d.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new sn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function wf(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(let o in n){let a=Oh[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return Ze.workingColorSpace!==jt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ze.workingColorSpace}" not supported.`),Yn(i,e),Jy(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?$y(i,e.targets,t):i})}var zh={rotationX:-Math.PI/2,scale:[1.86/1.74*1.05,2/1.89*1.05,1.66/1.09*1.05],offset:[0,0,0]},ml={light:{input:2656238,hidden:10989753,kc:16565822,output:1318700,spike:2656238,dim:14607335,shell:2656238,shellOpacity:.07,edgeOpacity:.16},dark:{input:2656238,hidden:8884636,kc:16565822,output:16185594,spike:16773544,dim:2964040,shell:9417727,shellOpacity:.1,edgeOpacity:.18}},ns=matchMedia("(prefers-reduced-motion: reduce)").matches;function Tf(i,e,{mobile:t=!1,assetBase:n="",theme:s="light",autoRotate:r=!ns}={}){let o;try{o=new Zr({antialias:!t,alpha:!0,powerPreference:"low-power"})}catch{return null}o.setPixelRatio(Math.min(devicePixelRatio,t?1.25:2)),i.appendChild(o.domElement);let a=new Is,c=new At(45,1,.01,50);c.position.set(0,.55,2.8);let l=new dl(c,o.domElement);l.enableDamping=!0,l.dampingFactor=.08,l.minDistance=1.2,l.maxDistance=8,l.autoRotate=r&&!ns,l.autoRotateSpeed=.4,a.add(new zs(16777215,.9));let h=new Ri(16777215,1.2);h.position.set(2,3,4),a.add(h);let u=t?e.nodes.filter((U,V)=>U.layer!=="hidden"||V%3===0):e.nodes,d=new Map(u.map((U,V)=>[e.nodes.indexOf(U),V])),f=(t?e.edges.slice(0,2e3):e.edges).filter(([U,V])=>d.has(U)&&d.has(V)).map(([U,V,ie])=>[d.get(U),d.get(V),ie]),g=u.length,x=ml[s]??ml.light,m=new Tr(.011,8,6),p=new Ar({color:16777215}),b=new $i(m,p,g),A=new Float32Array(g*3),M=new Mt,T=U=>U.layer==="input"?x.input:U.layer==="output"?x.output:U.isKC?x.kc:x.hidden,w=U=>U.layer==="output"?1.6:U.layer==="input"?1.1:1,y=new Ue;u.forEach((U,V)=>{A.set(U.xyz,V*3),M.position.set(U.xyz[0],U.xyz[1],U.xyz[2]),M.scale.setScalar(w(U)),M.updateMatrix(),b.setMatrixAt(V,M.matrix),b.setColorAt(V,y.setHex(T(U)))}),b.instanceMatrix.needsUpdate=!0,b.instanceColor.needsUpdate=!0,a.add(b);let _=new Float32Array(f.length*6),E=new Float32Array(f.length*6),R=new Ut;function L(){f.forEach(([U,V],ie)=>{_.set(u[U].xyz,ie*6),_.set(u[V].xyz,ie*6+3),y.setHex(T(u[U])),E.set([y.r,y.g,y.b],ie*6),y.setHex(T(u[V])),E.set([y.r,y.g,y.b],ie*6+3)}),R.setAttribute("position",new Et(_,3)),R.setAttribute("color",new Et(E,3))}L();let O=new Ei({vertexColors:!0,transparent:!0,opacity:x.edgeOpacity}),D=new Yi(R,O);a.add(D);let C=new tn;C.rotation.x=zh.rotationX,C.scale.set(...zh.scale),C.position.set(...zh.offset),a.add(C);let N=new Yt({color:x.shell,transparent:!0,opacity:x.shellOpacity,roughness:.6,metalness:0,side:on,depthWrite:!1});new jr().load(`${n}models/brain_shell.glb`,U=>{U.scene.traverse(V=>{V.isMesh&&(V.material=N)}),C.add(U.scene),oe()},void 0,()=>{});let F={roi:"",showKC:!0,showEdges:!0,showShell:!0,activity:null},z=new Ue,J=new Ue;function Y(){let U=F.activity;U&&(z.setHex(x.dim),J.setHex(x.spike)),u.forEach((V,ie)=>{let be=(F.showKC||!V.isKC)&&(!F.roi||V.roi===F.roi||V.layer==="output"),ce=U?U[ie]:0,ze=(be?1:0)*w(V)*(U?.6+ce*1.7:1);M.position.set(A[ie*3],A[ie*3+1],A[ie*3+2]),M.scale.setScalar(ze),M.updateMatrix(),b.setMatrixAt(ie,M.matrix),U?(y.copy(z).lerp(J,ce),b.setColorAt(ie,y)):b.setColorAt(ie,y.setHex(T(V)))}),b.instanceMatrix.needsUpdate=!0,b.instanceColor.needsUpdate=!0,D.visible=F.showEdges,D.material.opacity=U?x.edgeOpacity*.4:x.edgeOpacity,C.visible=F.showShell,oe()}let Z=null,ee=!1;function oe(){o.render(a,c)}function ae(){l.update(),oe(),Z=requestAnimationFrame(ae)}function Be(){Z===null&&!ee&&ae()}function ve(){Z!==null&&cancelAnimationFrame(Z),Z=null}function De(){let U=i.clientWidth,V=i.clientHeight;!U||!V||(o.setSize(U,V,!1),c.aspect=U/V,c.updateProjectionMatrix(),oe())}return new ResizeObserver(De).observe(i),De(),ns?l.addEventListener("change",oe):Be(),{nodes:u,edges:f,mesh:b,setRoi(U){F.roi=U,Y()},setKC(U){F.showKC=U,Y()},setEdges(U){F.showEdges=U,Y()},setShell(U){F.showShell=U,Y()},setAutoRotate(U){l.autoRotate=U&&!ns},setTheme(U){x=ml[U]??ml.light,N.color.setHex(x.shell),N.opacity=x.shellOpacity,L(),R.attributes.color.needsUpdate=!0,Y()},highlightActivity(U){if(!U){F.activity&&(F.activity=null,Y());return}let V=new Float32Array(g);for(let ie=0;ie<U.length;ie++){let be=d.get(ie);be!==void 0&&(V[be]=U[ie])}F.activity=V,Y()},pause(){ee=!0,ve()},resume(){ee=!1,De(),ns?oe():Be()},dispose(){ve(),o.dispose()}}}function Af(i,{assetBase:e=""}={}){let t;try{t=new Zr({canvas:i,antialias:!0,alpha:!0})}catch{return null}t.setPixelRatio(Math.min(devicePixelRatio,2));let n=new Is,s=new At(35,1,.1,20);s.position.set(0,.3,4.2),n.add(new zs(16777215,1.1));let r=new Ri(16777215,1.6);r.position.set(3,4,2),n.add(r);let o=new tn;n.add(o);let a=new jr,c=new ri({color:8884636,roughness:.6,metalness:.05}),l=(g,x,m,p=0)=>a.load(`${e}models/${g}`,b=>{b.scene.traverse(A=>{A.isMesh&&(A.material=c)}),b.scene.position.set(x,p,0),b.scene.scale.setScalar(m),o.add(b.scene),u()},void 0,()=>{});l("fly.glb",-.9,1.05),l("fly_head.glb",1.1,.75,-.05);let h=null;function u(){t.render(n,s)}function d(){let g=i.clientWidth,x=i.clientHeight;!g||!x||(t.setSize(g,x,!1),s.aspect=g/x,s.updateProjectionMatrix(),u())}function f(){o.rotation.y+=.004,u(),h=requestAnimationFrame(f)}return new ResizeObserver(d).observe(i),d(),ns||f(),{renderer:t,pause(){h!==null&&cancelAnimationFrame(h),h=null},resume(){d(),!ns&&h===null&&f()}}}var ye=(i,e=2)=>i==null||Number.isNaN(i)?"\u2014":Number(i).toFixed(e),He=(i,e=0)=>i==null?"\u2014":`${(i*100).toFixed(e)}%`;function k(i,e={},t){let n=document.createElement(i);for(let[s,r]of Object.entries(e))s==="class"?n.className=r:n.setAttribute(s,r);return t!==void 0&&(n.textContent=t),n}function Ee(i,e={},t){let n=document.createElementNS("http://www.w3.org/2000/svg",i);for(let[s,r]of Object.entries(e))n.setAttribute(s,r);return t!==void 0&&(n.textContent=t),n}function Qs(i,e=18){let t=Ee("svg",{width:e,height:e,"aria-hidden":"true"});return t.appendChild(Ee("use",{href:`#${i}`})),t}function Qr(i){let e=atob(i),t=new Uint8Array(200);for(let n=0;n<200;n++)t[n]=e.charCodeAt(n>>3)>>(n&7)&1;return t}var jy=i=>`oklch(${(.97-i*.346).toFixed(3)} ${(.02+i*.156).toFixed(3)} 252)`;function Cf(i,{q:e,row:t,ref:n=null,dnTypes:s=[]}){let r=e.n,o=t*r,a=n===null?-1:n*r,c=document.createDocumentFragment(),l=0;for(let h=0;h<r;h++){let u=e.data[o+h],d=a>=0&&u!==e.data[a+h];d&&l++;let f=e.max>e.min?e.min+u/255*(e.max-e.min):e.min,g=k("div",{class:`cell${d?" changed":""}`,title:`${s[h]??"DN"} #${h}: ${f.toFixed(4)}`});g.style.background=jy(u/255),c.appendChild(g)}return i.replaceChildren(c),{changed:l}}function Hh(i,e){let t=new Set;for(let n=0;n<e;n++)t.add(i.data.slice(n*i.n,(n+1)*i.n).join(","));return t.size}function Nn({title:i="\uC544\uC9C1 \uCE21\uC815\uD55C \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694",desc:e="",cta:t=null,href:n="#/versus",hint:s=""}={}){let r=k("div",{class:"empty-state"}),o=k("div",{class:"empty-icon","aria-hidden":"true"});return o.appendChild(k("i")),r.append(o,k("div",{class:"empty-title"},i)),e&&r.appendChild(k("p",{class:"empty-desc"},e)),t&&r.appendChild(k("a",{class:"btn btn-primary btn-lg",href:n},t)),s&&r.appendChild(k("p",{class:"empty-hint"},s)),r}function Rf(i){let e=k("div",{class:"card"});return e.appendChild(Nn(i)),e}var Qy="fly-matchlog";var is=null,pt={matches:[],decisions:[],loaded:!1},Vh=new Set,to=()=>{for(let i of Vh)try{i(pt)}catch(e){console.warn("matchlog listener",e)}},Lf=i=>(Vh.add(i),()=>Vh.delete(i));function ev(){return new Promise(i=>{if(!globalThis.indexedDB)return i(null);let e;try{e=indexedDB.open(Qy,1)}catch{return i(null)}e.onupgradeneeded=()=>{let t=e.result;t.objectStoreNames.contains("matches")||t.createObjectStore("matches",{keyPath:"id"}),t.objectStoreNames.contains("decisions")||t.createObjectStore("decisions",{keyPath:"id"})},e.onsuccess=()=>i(e.result),e.onerror=()=>i(null),e.onblocked=()=>i(null)})}var If=i=>new Promise(e=>{if(!is)return e([]);try{let t=is.transaction(i,"readonly").objectStore(i).getAll();t.onsuccess=()=>e(t.result??[]),t.onerror=()=>e([])}catch{e([])}});function eo(i,e=[],t=[]){if(is)try{let s=is.transaction(i,"readwrite").objectStore(i);for(let r of e)s.put(r);for(let r of t)s.delete(r)}catch(n){console.warn("matchlog write",n)}}async function Df(){if(pt.loaded)return pt;is=await ev();let[i,e]=await Promise.all([If("matches"),If("decisions")]);return pt.matches=i.sort((t,n)=>n.startedAt-t.startedAt).slice(0,20),pt.decisions=e.sort((t,n)=>t.id-n.id).slice(-60),pt.loaded=!0,pt.storage=is?"indexeddb":"memory",to(),pt}globalThis.__matchlog={get state(){return pt},get db(){return!!is},totals:()=>no(),clear:()=>Gh()};var Un=()=>pt;var cn=i=>i?pt.decisions.filter(e=>e.matchId===i):pt.decisions.slice();function Nf(i){let e={id:Date.now(),startedAt:Date.now(),endedAt:null,winner:null,reason:null,seed:i?.seed??null,flyPlaceMs:i?.flyPlaceMs??null,model:i?.model??null,human:null,fly:null,think:null,timeline:[],decisionCount:0,quality:[]};pt.matches.unshift(e);let t=pt.matches.splice(20);return t.length&&eo("matches",[],t.map(n=>n.id)),to(),e.id}var Pf=i=>({pieces:i.pieces,attack:i.player.stats.attack,sent:i.player.stats.sent,lines:i.player.stats.lines,tetris:i.player.stats.tetris,tspin:i.player.stats.tspin,tspinMini:i.player.stats.tspinMini,maxCombo:i.player.stats.maxCombo,holds:i.player.stats.holds,garbageReceived:i.player.stats.garbageReceived,perfectClear:i.player.stats.perfectClear,dead:i.player.dead});function Uf(i,e,t){let n=pt.matches.find(r=>r.id===i);if(!n)return;let s=[...t].sort((r,o)=>r-o);n.endedAt=Date.now(),n.winner=e.winner,n.reason=e.reason,n.human=Pf(e.human),n.fly=Pf(e.fly),n.think=s.length?{n:s.length,median:s[s.length>>1],min:s[0],max:s[s.length-1],mean:s.reduce((r,o)=>r+o,0)/s.length}:null,n.timeline=e.log.map(r=>({...r})),n.decisionCount=pt.decisions.filter(r=>r.matchId===i).length,eo("matches",[n]),to()}var tv=4e3;function Ff(i,e){let t=pt.matches.find(n=>n.id===i);!t||t.quality.length>=tv||t.quality.push(e)}var nv=0;function Of(i,e,t){let n={id:Date.now()*1e3+nv++%1e3,matchId:i,at:Date.now(),ms:t,...e};pt.decisions.push(n);let s=pt.decisions.splice(0,Math.max(0,pt.decisions.length-60));return eo("decisions",[n],s.map(r=>r.id)),to(),n}function Gh(){let i=pt.matches.map(t=>t.id),e=pt.decisions.map(t=>t.id);pt.matches=[],pt.decisions=[],eo("matches",[],i),eo("decisions",[],e),to()}function no(){let i=pt.matches.filter(o=>o.endedAt);if(!i.length)return null;let e=i.filter(o=>o.winner==="human").length,t=i.filter(o=>o.winner==="fly").length,n=o=>i.reduce((a,c)=>a+(o(c)??0),0),s=o=>{let a=i.map(o).filter(c=>c!=null).sort((c,l)=>c-l);return a.length?a[a.length>>1]:null},r=i.map(o=>o.think?.median).filter(o=>o!=null).sort((o,a)=>o-a);return{games:i.length,wins:e,losses:t,draws:i.length-e-t,humanPieces:n(o=>o.human?.pieces),flyPieces:n(o=>o.fly?.pieces),humanAttack:n(o=>o.human?.attack),flyAttack:n(o=>o.fly?.attack),humanLines:n(o=>o.human?.lines),flyLines:n(o=>o.fly?.lines),humanTetris:n(o=>o.human?.tetris),flyTetris:n(o=>o.fly?.tetris),humanPiecesMedian:s(o=>o.human?.pieces),flyPiecesMedian:s(o=>o.fly?.pieces),humanAttackMedian:s(o=>o.human?.attack),flyAttackMedian:s(o=>o.fly?.attack),thinkMedian:r.length?r[r.length>>1]:null,decisions:pt.decisions.length}}function gl(i=pt.decisions){let e=i.filter(l=>l.teacherAligned&&l.candidates.length>1);if(!e.length)return null;let t=0,n=0,s=0,r=0,o=0,a=0,c=0;for(let l of e){let h=l.candidates.length,u=l.candidates[l.chosen].teacherRank;u===0&&t++,n+=1-u/(h-1),u>=h/2&&s++;let d=l.candidates.map(w=>w.teacher),f=Math.max(...d),g=Math.min(...d);r+=f-d[l.chosen],o+=f-g;let x=l.candidates.map(w=>w.score),m=d,p=0,b=0,A=0,M=0;for(let w=0;w<h;w++)for(let y=w+1;y<h;y++){let _=Math.sign(x[w]-x[y]),E=Math.sign(m[w]-m[y]);if(!(_===0&&E===0)){if(_===0){A++;continue}if(E===0){M++;continue}_===E?p++:b++}}let T=Math.sqrt((p+b+A)*(p+b+M));T>0&&(a+=(p-b)/T,c++)}return{decisions:e.length,candidatesPerDecision:e.reduce((l,h)=>l+h.candidates.length,0)/e.length,top1:t/e.length,pickPercentile:n/e.length,bottomHalfRate:s/e.length,relRegret:o>0?r/o:0,tau:c?a/c:null}}var io=10,_l=20,iv=["I","O","T","S","Z","J","L"],xl={empty:"#eef1f4",fixed:"#a7b0b9",placed:"#2887ee",gone:"#ffe1e1"},so={brand:"#2887ee",chosen:"#007738",other:"#c5cbd2"},sv="#e3e7ec";function Bf(i){let e=document.getElementById("decision-body"),t=document.getElementById("decision-grid"),n=document.getElementById("dec-notice"),s=document.getElementById("decision-empty"),r=document.getElementById("dec-match"),o=document.getElementById("dec-board"),a=document.getElementById("dec-strip"),c=document.getElementById("dec-heat"),l=document.getElementById("dec-bump"),h=document.getElementById("dec-label"),u={matchId:null,d:0,c:0},d=[],f=!1;function g(y,_,E,R){let L=y.getContext("2d");L.clearRect(0,0,y.width,y.height);for(let O=0;O<_l;O++)for(let D=0;D<io;D++){let C=O*io+D,N=E[C],F=_?_[C]:0;L.fillStyle=!N&&!F?xl.empty:N&&!F?xl.placed:N?xl.fixed:xl.gone,L.fillRect(D*R,O*R,R,R)}if(R>=6){L.strokeStyle=sv,L.lineWidth=1,L.beginPath();for(let O=1;O<io;O++)L.moveTo(O*R+.5,0),L.lineTo(O*R+.5,_l*R);for(let O=1;O<_l;O++)L.moveTo(0,O*R+.5),L.lineTo(io*R,O*R+.5);L.stroke()}}function x(){let y=Un().matches.filter(_=>cn(_.id).length);r.replaceChildren(...y.map((_,E)=>{let R=cn(_.id).length,L=new Date(_.startedAt).toLocaleString("ko-KR",{dateStyle:"short",timeStyle:"short"}),O=_.winner==="human"?"\uB0B4\uAC00 \uC774\uAE40":_.winner==="fly"?"\uCD08\uD30C\uB9AC\uAC00 \uC774\uAE40":_.endedAt?"\uBB34\uC2B9\uBD80":"\uC9C4\uD589 \uC911";return k("option",{value:String(_.id),selected:E===0&&u.matchId===null?"selected":void 0},`${L} \xB7 ${O} \xB7 \uACB0\uC815 ${R}`)})),u.matchId!==null&&(r.value=String(u.matchId))}function m(){let y=0,_=-1;return d.forEach((E,R)=>{if(E.candidates.length<4)return;let L=Hh(E.dn,E.candidates.length)/E.candidates.length;L>_&&(_=L,y=R)}),y}function p(){let y=d[u.d],_=Qr(y.boardBefore);h.textContent=`\uACB0\uC815 ${u.d+1}/${d.length} \xB7 ${iv[y.piece]??"?"} \xB7 \uD6C4\uBCF4 ${y.candidates.length} \xB7 \uC0DD\uAC01 ${y.ms} ms`,a.replaceChildren(...y.candidates.map((E,R)=>{let L=k("canvas",{width:String(io*3),height:String(_l*3),role:"option",title:`${E.useHold?"HOLD \xB7 ":""}col ${E.col} rot ${E.rot} \xB7 \uBAA8\uB378 ${ye(E.score,2)} \xB7 \uAD50\uC0AC ${ye(E.teacher,1)}`});return g(L,_,Qr(E.board),3),L.addEventListener("click",()=>{u.c=R,b()}),L})),b()}function b(){let y=d[u.d],_=y.candidates[u.c],E=Qr(y.boardBefore);g(o,E,Qr(_.board),20),[...a.children].forEach((D,C)=>{D.className=`${C===u.c?"selected ":""}${C===y.chosen?"chosen":""}`,D.setAttribute("aria-selected",String(C===u.c))});let R=u.c===y.chosen;document.getElementById("dec-info").innerHTML=`\uD6C4\uBCF4 <b>${_.useHold?"HOLD \xB7 ":""}col ${_.col} \xB7 rot ${_.rot}</b>${_.lines?` \xB7 ${_.lines}\uC904 \uC81C\uAC70`:""}${_.sent?` \xB7 \uACF5\uACA9 ${_.sent}`:""}${R?' \xB7 <span class="chosen">\uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uBC30\uCE58</span>':""}<br>\uBAA8\uB378 \uC810\uC218 <b>${ye(_.score,2)}</b> \xB7 \uAD50\uC0AC \uC810\uC218 <b>${ye(_.teacher,1)}</b>${y.teacherAligned?` \xB7 \uAD50\uC0AC \uC21C\uC704 <b>${_.teacherRank+1}/${y.candidates.length}</b>`:""}`;let{changed:L}=Cf(c,{q:y.dn,row:u.c,ref:R?null:y.chosen,dnTypes:T}),O=Hh(y.dn,y.candidates.length);document.getElementById("dec-heat-title").textContent=`\uCC3D ${A(y)} \uC2A4\uD15D \uD3C9\uADE0 \xB7 \uC774 \uACB0\uC815\uC758 \uCD5C\uC19F\uAC12~\uCD5C\uB313\uAC12\uC73C\uB85C \uC815\uADDC\uD654 \xB7 ${y.dn.n}\uAC1C`,document.getElementById("dec-heat-min").textContent=ye(y.dn.min,3),document.getElementById("dec-heat-max").textContent=ye(y.dn.max,3),document.getElementById("dec-heat-info").innerHTML=`\uC774 \uACB0\uC815\uC758 \uD6C4\uBCF4 ${y.candidates.length}\uAC1C \uC911 \uC11C\uB85C \uB2E4\uB978 DN \uBCA1\uD130 <b>${O}</b>\uAC1C`+(R?"":` \xB7 \uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uD6C4\uBCF4\uC640 \uB2E4\uB978 DN <b>${L}</b>/${y.dn.n} (\uC8FC\uD669 \uD14C\uB450\uB9AC)`),M(y),i?.(y,u.c)}let A=y=>y.trace?.T??25;function M(y){let _=y.candidates.length,E=[...y.candidates.keys()].sort((V,ie)=>y.candidates[ie].score-y.candidates[V].score||V-ie),R=[...y.candidates.keys()].sort((V,ie)=>y.candidates[ie].teacher-y.candidates[V].teacher||V-ie),L=16,O=26,D=76,C=76,N=380,F=O+_*L+10;l.setAttribute("viewBox",`0 0 ${N} ${F}`),l.replaceChildren();let z=Ee("g");z.appendChild(Ee("text",{x:D,y:14,"text-anchor":"end",style:"font-weight:600"},"A \uBAA8\uB378 \uC21C\uC704")),z.appendChild(Ee("text",{x:N-C,y:14,style:"font-weight:600"},"B \uAD50\uC0AC \uC21C\uC704"));let J=V=>O+V*L+L/2,Y=new Map(E.map((V,ie)=>[V,ie])),Z=new Map(R.map((V,ie)=>[V,ie]));y.candidates.forEach((V,ie)=>{let be=J(Y.get(ie)),ce=J(Z.get(ie)),ze=ie===u.c,xt=ie===y.chosen;z.appendChild(Ee("line",{x1:D+4,y1:be,x2:N-C-4,y2:ce,stroke:ze?so.brand:xt?so.chosen:so.other,"stroke-width":ze||xt?2:1,opacity:ze||xt?1:.8}))});let ee=V=>V===u.c?`fill:${so.brand};font-weight:600`:V===y.chosen?`fill:${so.chosen};font-weight:600`:"",oe=V=>`${V.useHold?"h":""}c${V.col} r${V.rot}`;E.forEach((V,ie)=>{let be=Ee("text",{x:D,y:J(ie)+4,"text-anchor":"end",style:ee(V)},`${ie+1}. ${oe(y.candidates[V])}`);be.style.cursor="pointer",be.addEventListener("click",()=>{u.c=V,b()}),z.appendChild(be)}),R.forEach((V,ie)=>{let be=Ee("text",{x:N-C,y:J(ie)+4,style:ee(V)},`${ie+1}. ${oe(y.candidates[V])}`);be.style.cursor="pointer",be.addEventListener("click",()=>{u.c=V,b()}),z.appendChild(be)}),l.appendChild(z);let ae=Z.get(y.chosen)+1,Be=y.candidates.map(V=>V.teacher),ve=Math.max(...Be),De=Math.min(...Be),U=ve-Be[y.chosen];document.getElementById("dec-rank-info").innerHTML=`\uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uBC30\uCE58\uC758 \uAD50\uC0AC \uC21C\uC704 <b>${ae} / ${_}</b> \xB7 \uC0C1\uB300 regret <b>${ye(ve>De?U/(ve-De):0,3)}</b> (0 \uC774\uBA74 \uAD50\uC0AC \uCD5C\uC120)<br>\uCD08\uB85D = \uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uBC30\uCE58, \uD30C\uB791 = \uBCF4\uB294 \uC911\uC778 \uD6C4\uBCF4. \uB450 \uC21C\uC704\uB97C \uC787\uB294 \uC120\uC774 \uD3C9\uD589\uD560\uC218\uB85D \uBAA8\uB378\uC774 \uAD50\uC0AC\uC758 \uC21C\uC704\uB97C \uADF8\uB300\uB85C \uC548\uB2E4\uB294 \uB73B\uC774\uC5D0\uC694.`}let T=[];function w(){d=cn(u.matchId);let y=d.length>0;if(f=y,t.hidden=!y,n.hidden=!y,document.getElementById("dec-controls").hidden=!y,s.hidden=y,!y){s.replaceChildren(Nn({desc:"\uB300\uC804\uC5D0\uC11C \uCD08\uD30C\uB9AC\uAC00 \uC218\uB97C \uB450\uBA74 \uADF8 \uACB0\uC815\uC758 \uD6C4\uBCF4 \uBC30\uCE58\xB7DN \uCC3D\uD3C9\uADE0\xB7\uAD50\uC0AC \uC21C\uC704\uAC00 \uC5EC\uAE30\uC5D0 \uC313\uC5EC\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uD55C \uD310\uB9CC \uD574\uB3C4 \uCD5C\uADFC \uACB0\uC815 \uC218\uC2ED \uAC1C\uB97C \uBCFC \uC218 \uC788\uC5B4\uC694"}));return}x(),u.d>=d.length&&(u.d=m()),u.c=d[u.d].chosen,p()}return document.getElementById("dec-prev").addEventListener("click",()=>{u.d=(u.d-1+d.length)%d.length,u.c=d[u.d].chosen,p()}),document.getElementById("dec-next").addEventListener("click",()=>{u.d=(u.d+1)%d.length,u.c=d[u.d].chosen,p()}),r.addEventListener("change",()=>{u.matchId=Number(r.value),d=cn(u.matchId),u.d=m(),u.c=d[u.d]?.chosen??0,p()}),{state:u,setDnTypes(y){T=y},refresh(){let y=cn(u.matchId).length>0;f!==y?w():y&&(d=cn(u.matchId),u.d>=d.length&&(u.d=d.length-1,u.c=d[u.d].chosen,p()),x())},render:w,get decision(){return d[u.d]??null},get candidate(){return u.c}}}var ro={input:"#2887ee",hidden:"#a7b0b9",output:"#141f2c"},kf={input:"\uC785\uB825 LC/LPLC",hidden:"\uC911\uAC04",output:"\uCD9C\uB825 DN"},yl={muted:"#6a7480",cursor:"#ff8800",grid:"#e3e7ec"},rv=matchMedia("(prefers-reduced-motion: reduce)").matches;function zf(i,e){let t=document.getElementById("act-raster"),n=document.getElementById("act-chart"),s=document.getElementById("activity-grid"),r=document.getElementById("activity-empty"),o={input:0,hidden:1,output:2},a=i.nodes.map((D,C)=>C).sort((D,C)=>o[i.nodes[D].layer]-o[i.nodes[C].layer]||D-C),c=new Int32Array(i.nodes.length);a.forEach((D,C)=>{c[D]=C});let l={input:0,hidden:0,output:0};for(let D of i.nodes)l[D.layer]++;let h={dec:null,t:0,playing:!1,timer:null},u=[],d=()=>h.dec?.trace?.T??25,f=()=>!!h.dec?.trace,g=(D,C)=>h.dec.trace.data[D*h.dec.trace.n+C]/255,x=D=>{let C=h.dec.trace;return C.max>C.min?C.min+D*(C.max-C.min):C.min},m=()=>{let D=h.dec.trace;return Math.max(1e-6,Math.abs(D.min),Math.abs(D.max))},p=(D,C)=>Math.abs(x(g(D,C)))/m();function b(){if(!f()||t.clientWidth===0)return;let D=Math.min(devicePixelRatio,2),C=t.clientWidth,N=t.clientHeight;t.width=C*D,t.height=N*D;let F=t.getContext("2d");F.setTransform(D,0,0,D,0,0),F.clearRect(0,0,C,N);let z=74,J=12,Y=26,Z=12,ee=a.length,oe=d(),ae=(C-z-Z)/oe,Be=(N-J-Y)/ee,ve=getComputedStyle(document.body).fontFamily,De=[["input",0,l.input],["hidden",l.input,ee-l.output],["output",ee-l.output,ee]];for(let[U,V,ie]of De)F.fillStyle=ro[U],F.globalAlpha=.06,F.fillRect(z,J+V*Be,C-z-Z,(ie-V)*Be),F.globalAlpha=1,F.fillStyle=ro[U],F.font=`600 11px ${ve}`,F.textAlign="right",F.fillText(kf[U],z-8,J+(V+(ie-V)/2)*Be+4);for(let U=0;U<oe;U++){let V=z+U*ae,ie=U>h.t;for(let be=0;be<a.length;be++){let ce=p(U,be);if(ce<.03)continue;let ze=c[be];F.globalAlpha=ie?ce*.22:ce,F.fillStyle=ro[i.nodes[be].layer],F.fillRect(V,J+ze*Be,Math.max(1,ae),Math.max(1,Be))}}F.globalAlpha=1,F.strokeStyle=yl.cursor,F.lineWidth=1.5,F.beginPath(),F.moveTo(z+(h.t+1)*ae,J),F.lineTo(z+(h.t+1)*ae,N-Y),F.stroke(),F.fillStyle=yl.muted,F.textAlign="center",F.font=`500 10px ${ve}`;for(let U=0;U<oe;U+=5)F.fillText(`${U}`,z+(U+.5)*ae,N-9);F.fillText("\uC2A4\uD15D",C-22,N-9)}function A(){if(!f())return;let D=d(),C=380,N=n.clientWidth?Math.round(C*n.clientHeight/n.clientWidth):240,F=46,z=12,J=18,Y=28;n.setAttribute("viewBox",`0 0 ${C} ${N}`),n.replaceChildren();let Z={input:new Float64Array(D),hidden:new Float64Array(D),output:new Float64Array(D)};for(let ve=0;ve<D;ve++){let De={input:0,hidden:0,output:0};for(let U=0;U<a.length;U++)De[i.nodes[U].layer]+=Math.abs(x(g(ve,U)));for(let U of["input","hidden","output"])Z[U][ve]=l[U]?De[U]/l[U]:0}let ee=Math.max(1e-6,...["input","hidden","output"].flatMap(ve=>[...Z[ve]])),oe=ve=>F+ve/Math.max(1,D-1)*(C-F-z),ae=ve=>J+(1-ve/ee)*(N-J-Y),Be=Ee("g",{class:"axis"});for(let ve=0;ve<=4;ve++){let De=ee*ve/4;Be.appendChild(Ee("line",{x1:F,x2:C-z,y1:ae(De),y2:ae(De)})),Be.appendChild(Ee("text",{x:F-6,y:ae(De)+3,"text-anchor":"end"},De.toFixed(2)))}for(let ve=0;ve<D;ve+=5)Be.appendChild(Ee("text",{x:oe(ve),y:N-8,"text-anchor":"middle"},`${ve}`));Be.appendChild(Ee("text",{x:C-z,y:N-8,"text-anchor":"end"},"\uC2A4\uD15D")),n.appendChild(Be),["input","hidden","output"].forEach((ve,De)=>{let U=[...Z[ve]].map((V,ie)=>`${oe(ie)},${ae(V)}`).join(" ");n.appendChild(Ee("polyline",{points:U,fill:"none",stroke:ro[ve],"stroke-width":2,"stroke-linejoin":"round"})),n.appendChild(Ee("text",{x:F+4+De*68,y:12,style:`fill:${ro[ve]};font-weight:600`},kf[ve]))}),n.appendChild(Ee("line",{x1:oe(h.t),x2:oe(h.t),y1:J,y2:N-Y,stroke:yl.cursor,"stroke-width":1.5})),n.appendChild(Ee("text",{x:C-z,y:12,"text-anchor":"end",style:`fill:${yl.muted}`},`\uD45C\uBCF8 ${a.length} \uB274\uB7F0 (\uC804\uCCB4 ${i.meta?.total?.toLocaleString?.()??"8,000"})`))}function M(){for(let D of u)D.play.replaceChildren(Qs(h.playing?"i-pause":"i-play"),document.createTextNode(h.playing?"\uC77C\uC2DC\uC815\uC9C0":"\uC7AC\uC0DD")),D.play.setAttribute("aria-pressed",String(h.playing)),D.play.disabled=!f(),D.step.disabled=!f(),D.reset.disabled=!f()}function T(){let D=f()?`\uC2A4\uD15D ${h.t+1} / ${d()} \xB7 \uC774 \uC2A4\uD15D \uD3C9\uADE0 |\uD65C\uC131| ${ye(w(),3)}`:"\uB300\uC804\uC5D0\uC11C \uCD08\uD30C\uB9AC\uAC00 \uC218\uB97C \uB450\uBA74 \uC7AC\uC0DD\uD560 \uC218 \uC788\uC5B4\uC694";for(let N of u)N.label.textContent=D;b(),A(),M(),e?.highlightActivity(f()?y(h.t):null);let C=document.getElementById("act-info");if(C&&f()){let N=h.dec.trace;C.innerHTML=`\uD65C\uC131 \uBC94\uC704 <b>${ye(N.min,3)} ~ ${ye(N.max,3)}</b> (tanh \uC0C1\uD0DC) \xB7 \uCC3D ${d()} \uC2A4\uD15D \xB7 \uD45C\uBCF8 ${N.n} \uB274\uB7F0 \xB7 \uACB0\uC815 \uC0DD\uAC01 \uC2DC\uAC04 <b>${h.dec.ms} ms</b> \xB7 \uD6C4\uBCF4 ${h.dec.candidates.length}\uAC1C`}}function w(){let D=0;for(let C=0;C<a.length;C++)D+=Math.abs(x(g(h.t,C)));return D/a.length}function y(D){let C=new Float32Array(a.length);for(let F=0;F<a.length;F++){let z=Math.abs(x(g(D,F)));C[F]=z}let N=0;for(let F of C)F>N&&(N=F);if(N>0)for(let F=0;F<C.length;F++)C[F]/=N;return C}function _(D){let C=d();h.t=(D%C+C)%C,T()}function E(){h.playing=!1,h.timer&&clearInterval(h.timer),h.timer=null,M()}function R(){f()&&(h.t>=d()-1&&(h.t=0),h.playing=!0,M(),h.timer=setInterval(()=>{if(h.t>=d()-1){E();return}_(h.t+1)},rv?400:180))}function L(D){if(!D)return;let C={play:D.querySelector('[data-sp="play"]'),step:D.querySelector('[data-sp="step"]'),reset:D.querySelector('[data-sp="reset"]'),label:D.querySelector('[data-sp="label"]')};C.play.addEventListener("click",()=>h.playing?E():R()),C.step.addEventListener("click",()=>{E(),_(h.t+1)}),C.reset.addEventListener("click",()=>{E(),_(0)}),u.push(C),M()}function O(){let D=f();s&&(s.hidden=!D);let C=document.getElementById("act-notice");C&&(C.hidden=!D);let N=document.getElementById("act-play");N&&(N.hidden=!D),r&&(r.hidden=D,D||r.replaceChildren(Nn({desc:"\uCD08\uD30C\uB9AC\uAC00 \uACE0\uB978 \uBC30\uCE58\uB97C \uBC30\uC120 \uC81C\uC57D \uB124\uD2B8\uC6CC\uD06C\uC5D0 \uB123\uC5C8\uC744 \uB54C, \uD45C\uBCF8 \uB274\uB7F0 907\uAC1C\uC758 \uC2A4\uD15D\uBCC4 \uD65C\uC131\uC744 \uC5EC\uAE30\uC11C \uC7AC\uC0DD\uD574\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uCEE4\uB125\uD1B0 3D \uD654\uBA74\uC5D0\uC11C\uB3C4 \uAC19\uC740 \uC7AC\uC0DD\uC744 \uBCFC \uC218 \uC788\uC5B4\uC694"})))}return new ResizeObserver(()=>b()).observe(t),new ResizeObserver(()=>A()).observe(n),{bindControls:L,setDecision(D){E(),h.dec=D,h.t=0,O(),T()},redraw(){O(),b(),A()},clearHighlight(){e?.highlightActivity(null)},get hasTrace(){return f()}}}var Fi={human:"#2887ee",fly:"#141f2c",muted:"#6a7480",grid:"#e3e7ec",warn:"#ff8800"};function Hf(i){let e=document.getElementById("analysis-empty"),t=document.getElementById("analysis-cards"),n=document.getElementById("an-match"),s=null;function r(l,h,{yLabel:u,yMax:d=null,xMax:f}){l.setAttribute("viewBox","0 0 460 210"),l.replaceChildren();let M=d??Math.max(1,...h.flatMap(_=>_.points.map(E=>E[1]))),T=_=>42+_/Math.max(1,f)*406,w=_=>16+(1-_/M)*166,y=Ee("g",{class:"axis"});for(let _=0;_<=4;_++){let E=M*_/4;y.appendChild(Ee("line",{x1:42,x2:448,y1:w(E),y2:w(E)})),y.appendChild(Ee("text",{x:36,y:w(E)+3,"text-anchor":"end"},`${Math.round(E)}`))}for(let _=0;_<=4;_++){let E=Math.round(f*_/4);y.appendChild(Ee("text",{x:T(E),y:201,"text-anchor":_===4?"end":"middle"},_===4?`${E} \uC870\uAC01`:`${E}`))}l.appendChild(y),h.forEach((_,E)=>{_.points.length>1&&l.appendChild(Ee("polyline",{points:_.points.map(([R,L])=>`${T(R)},${w(L)}`).join(" "),fill:"none",stroke:_.color,"stroke-width":1.8,"stroke-linejoin":"round",opacity:.95})),l.appendChild(Ee("text",{x:46+E*62,y:11,style:`fill:${_.color};font-weight:600`},_.label))}),l.appendChild(Ee("text",{x:448,y:11,"text-anchor":"end",style:`fill:${Fi.muted}`},u))}function o(l,h,{fmtV:u=g=>`${g}`,color:d=Fi.fly,note:f=""}){let A=f?24:8,M=8+h.length*26+A;l.setAttribute("viewBox",`0 0 460 ${M}`),l.replaceChildren();let T=Math.max(1e-9,...h.map(w=>w.value));h.forEach((w,y)=>{let _=8+y*26;l.appendChild(Ee("text",{x:110,y:_+26/2+4,"text-anchor":"end"},w.label));let E=w.value/T*296;l.appendChild(Ee("rect",{x:120,y:_+4,width:Math.max(1,E),height:16,rx:3,fill:w.color??d,opacity:.9})),l.appendChild(Ee("text",{x:120+E+6,y:_+26/2+4,style:`fill:${Fi.muted}`},u(w.value)))}),f&&l.appendChild(Ee("text",{x:120,y:M-8,style:`fill:${Fi.muted};font-size:9px`},f))}function a(){let l=Un().matches.filter(h=>(h.quality?.length??0)>0||cn(h.id).length);return n.replaceChildren(...l.map(h=>{let u=new Date(h.startedAt).toLocaleString("ko-KR",{dateStyle:"short",timeStyle:"short"}),d=h.winner==="human"?"\uB0B4\uAC00 \uC774\uAE40":h.winner==="fly"?"\uCD08\uD30C\uB9AC\uAC00 \uC774\uAE40":h.endedAt?"\uBB34\uC2B9\uBD80":"\uC9C4\uD589 \uC911";return k("option",{value:String(h.id)},`${u} \xB7 ${d}`)})),s&&(n.value=String(s)),l}function c(){let l=Un().matches.filter(C=>(C.quality?.length??0)>0||cn(C.id).length),h=l.length>0;if(t.hidden=!h,document.getElementById("an-controls").hidden=!h,e.hidden=h,!h){e.replaceChildren(Nn({desc:"\uC870\uAC01\uC744 \uB193\uC744 \uB54C\uB9C8\uB2E4\uC758 \uAD6C\uBA4D\xB7\uB192\uC774\uC640, \uCD08\uD30C\uB9AC\uAC00 \uAD50\uC0AC \uC21C\uC704\uC5D0\uC11C \uBA87 \uBC88\uC9F8\uB97C \uACE8\uB790\uB294\uC9C0\uB97C \uC5EC\uAE30\uC5D0 \uBAA8\uC544\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uC0AC\uB78C \uCABD\uACFC \uCD08\uD30C\uB9AC \uCABD\uC744 \uAC19\uC740 \uCD95\uC5D0 \uB193\uACE0 \uBD10\uC694"}));return}a(),(!s||!l.some(C=>C.id===s))&&(s=l[0].id),n.value=String(s);let d=Un().matches.find(C=>C.id===s)?.quality??[],f=cn(s),g=Math.max(1,...d.map(C=>C.at)),x=(C,N)=>d.filter(F=>F.side===C).map(F=>[F.at,F[N]]);r(document.getElementById("an-holes"),[{label:"\uC0AC\uB78C",color:Fi.human,points:x("human","holes")},{label:"\uCD08\uD30C\uB9AC",color:Fi.fly,points:x("fly","holes")}],{yLabel:"\uAD6C\uBA4D \uC218",xMax:g}),r(document.getElementById("an-height"),[{label:"\uC0AC\uB78C",color:Fi.human,points:x("human","height")},{label:"\uCD08\uD30C\uB9AC",color:Fi.fly,points:x("fly","height")}],{yLabel:"\uCD5C\uACE0 \uB192\uC774 (\uCE78)",yMax:20,xMax:g});let m=f.filter(C=>C.teacherAligned&&C.candidates.length>1),p=[0,0,0,0,0];for(let C of m){let N=C.candidates[C.chosen].teacherRank/(C.candidates.length-1);p[Math.min(4,Math.floor(N*5))]++}let b=m.length||1;o(document.getElementById("an-rank"),[{label:"\uC0C1\uC704 20% \uC548",value:p[0]/b,color:"#007738"},{label:"20\u201340%",value:p[1]/b},{label:"40\u201360%",value:p[2]/b},{label:"60\u201380%",value:p[3]/b},{label:"\uD558\uC704 20%",value:p[4]/b,color:"#f03848"}],{fmtV:C=>He(C,0),note:`\uCD08\uD30C\uB9AC \uACB0\uC815 ${m.length}\uAC1C \xB7 \uAD50\uC0AC \uC21C\uC704\uC5D0\uC11C \uBA87 \uBC88\uC9F8\uB97C \uACE8\uB790\uB098`});let A=[0,0,0,0],M=0;for(let C of f)C.candidates[C.chosen]?.useHold&&M++;for(let C of d.filter(N=>N.side==="fly"))C.lines>=1&&A[C.lines-1]++;let T=A.reduce((C,N)=>C+N,0)||1;o(document.getElementById("an-lines"),[{label:"\uC2F1\uAE00",value:A[0]/T},{label:"\uB354\uBE14",value:A[1]/T},{label:"\uD2B8\uB9AC\uD50C",value:A[2]/T},{label:"\uD14C\uD2B8\uB9AC\uC2A4",value:A[3]/T,color:"#2887ee"}],{fmtV:C=>He(C,0),note:`\uCD08\uD30C\uB9AC\uAC00 \uC9C0\uC6B4 \uC904 ${T-(T===1&&!A.some(Boolean)?1:0)}\uD68C \uAE30\uC900 \xB7 hold \uC0AC\uC6A9 ${f.length?He(M/f.length,0):"\u2014"}`});let w=gl(f),y=i?.ranking?.trained??null,_=document.getElementById("an-summary"),E=(C,N,F,z)=>{let J=k("div",{class:"card kpi"});return J.append(k("div",{class:"label"},C),k("div",{class:"value"},N),k("div",{class:"sub"},`${F}${z?` \xB7 ${z}`:""}`)),J};_.replaceChildren(E("\uAD50\uC0AC \uCD5C\uC120\uC744 \uACE0\uB978 \uBE44\uC728",w?He(w.top1,1):"\u2014",`\uC624\uD504\uB77C\uC778 ${y?He(y.top1,1):"\u2014"}`,`\uB0B4 \uB300\uC804 \uACB0\uC815 ${w?.decisions??0}\uAC1C`),E("\uC0C1\uB300 regret",w?ye(w.relRegret,3):"\u2014",`\uC624\uD504\uB77C\uC778 ${y?ye(y.relRegret,3):"\u2014"}`,"0 \uC774\uBA74 \uD56D\uC0C1 \uAD50\uC0AC \uCD5C\uC120"),E("\uACB0\uC815 \uB0B4 \uCF04\uB2EC \u03C4",w?.tau!=null?ye(w.tau,3):"\u2014",`\uC624\uD504\uB77C\uC778 ${y?ye(y.tau,3):"\u2014"}`,"\uBAA8\uB378 \uC21C\uC704 \u2194 \uAD50\uC0AC \uC21C\uC704"),E("\uD558\uC704 \uC808\uBC18\uC744 \uACE0\uB978 \uBE44\uC728",w?He(w.bottomHalfRate,1):"\u2014",`\uC624\uD504\uB77C\uC778 ${y?He(y.bottomHalfRate,1):"\u2014"}`,"\uB0AE\uC744\uC218\uB85D \uC88B\uC544\uC694"));let R=document.getElementById("an-foot"),L=d.filter(C=>C.side==="fly"),O=d.filter(C=>C.side==="human"),D=(C,N)=>{let F=C.map(z=>z[N]).sort((z,J)=>z-J);return F.length?F[F.length>>1]:null};R.innerHTML=`\uC774 \uD310: \uCD08\uD30C\uB9AC \uC870\uAC01 ${L.length} \xB7 \uAD6C\uBA4D \uC911\uC559\uAC12 ${D(L,"holes")??"\u2014"} \xB7 \uCD5C\uACE0 \uB192\uC774 \uC911\uC559\uAC12 ${D(L,"height")??"\u2014"} \xB7 \uC6B0\uBB3C \uAE4A\uC774 \uC911\uC559\uAC12 ${D(L,"well")??"\u2014"} / \uC0AC\uB78C \uC870\uAC01 ${O.length} \xB7 \uAD6C\uBA4D ${D(O,"holes")??"\u2014"} \xB7 \uB192\uC774 ${D(O,"height")??"\u2014"} \xB7 \uC6B0\uBB3C ${D(O,"well")??"\u2014"}.`+(y?` \uC624\uD504\uB77C\uC778 \uC2E4\uCE21(\uD14C\uC2A4\uD2B8 \uBD84\uD560 ${i.ranking.decisions} \uACB0\uC815)\uC740 \uAC19\uC740 \uC815\uC758\uB85C \uC7B0 \uAC12\uC774\uC5D0\uC694 \u2014 \uB300\uC804\uC740 \uD310\uB9C8\uB2E4 \uACB0\uC815 \uC218\uAC00 \uC801\uC5B4 \uAC12\uC774 \uD06C\uAC8C \uD754\uB4E4\uB824\uC694.`:"")}return n.addEventListener("change",()=>{s=Number(n.value),c()}),{render:c,refresh:c}}var er={human:"#2887ee",fly:"#141f2c",grid:"#e3e7ec",muted:"#6a7480",red:"#f03848"},ov={human:["\uB0B4\uAC00 \uC774\uAE40","tag-green"],fly:["\uCD08\uD30C\uB9AC\uAC00 \uC774\uAE40","tag-red"]};function Vf(){let i=document.getElementById("matches-body"),e=document.getElementById("matches-empty"),t=document.getElementById("matches-kpis"),n=document.getElementById("matches-list"),s=document.getElementById("matches-timeline"),r=document.getElementById("matches-timeline-card"),o=document.getElementById("matches-summary-card"),a=document.getElementById("matches-list-card"),c=null;document.getElementById("matches-clear")?.addEventListener("click",()=>{confirm("\uB300\uC804 \uAE30\uB85D\uC744 \uBAA8\uB450 \uC9C0\uC6B8\uAE4C\uC694? \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC5B4\uC694.")&&Gh()});let l=(f,g,x)=>{let m=k("div",{class:"card kpi"});return m.append(k("div",{class:"label"},f),k("div",{class:"value"},g),k("div",{class:"sub"},x)),m};function h(f){s.replaceChildren();let g=f.timeline??[],x=Math.max(1,f.human?.pieces??1,f.fly?.pieces??1),m=640,p=54,b=24,A=26,M=56,T=14,w=b+p*2+A;s.setAttribute("viewBox",`0 0 ${m} ${w}`);let y=R=>M+R/x*(m-M-T),_=Math.max(1,...g.map(R=>R.sent??0)),E=Ee("g",{class:"axis"});for(let R=0;R<=4;R++){let L=Math.round(x*R/4);E.appendChild(Ee("line",{x1:y(L),x2:y(L),y1:b-6,y2:w-A})),E.appendChild(Ee("text",{x:y(L),y:w-10,"text-anchor":R===4?"end":"middle"},R===4?`${L} \uC870\uAC01`:`${L}`))}s.appendChild(E),[["human","\uC0AC\uB78C",0],["fly","\uCD08\uD30C\uB9AC",1]].forEach(([R,L,O])=>{let D=b+O*p;s.appendChild(Ee("text",{x:M-10,y:D+p/2+4,"text-anchor":"end",style:`fill:${R==="human"?er.human:er.fly};font-weight:600`},L)),s.appendChild(Ee("line",{x1:M,x2:m-T,y1:D+p-10,y2:D+p-10,stroke:er.grid,"stroke-width":1}));for(let C of g){if(C.side!==R||!(C.sent>0))continue;let N=6+C.sent/_*(p-22),F=Ee("rect",{x:y(C.at)-1.5,y:D+p-10-N,width:3,height:N,rx:1.5,fill:R==="human"?er.human:er.fly,opacity:.9});F.appendChild(Ee("title",{},`${L} ${C.at}\uBC88\uC9F8 \uC870\uAC01 \xB7 \uACF5\uACA9 ${C.sent}\uC904${C.tspin?" \xB7 T-\uC2A4\uD540":""}${C.combo>1?` \xB7 ${C.combo} \uCF64\uBCF4`:""}`)),s.appendChild(F)}}),s.appendChild(Ee("text",{x:M,y:14,style:`fill:${er.muted}`},`\uB9C9\uB300 \uD558\uB098\uAC00 \uBCF4\uB0B8 \uACF5\uACA9 \uD55C \uBC88 (\uB192\uC774 = \uC904 \uC218, \uCD5C\uB300 ${_}\uC904)`))}function u(){let f=Un().matches.filter(x=>x.endedAt),g=document.createDocumentFragment();f.forEach((x,m)=>{m&&g.appendChild(k("div",{class:"divider"}));let p=k("button",{class:`list-row as-button${c===x.id?" on":""}`,type:"button"}),[b,A]=ov[x.winner]??["\uBB34\uC2B9\uBD80","tag"],M=k("div",{class:`avatar${x.winner==="human"?" on":""}`},x.winner==="human"?"\uC2B9":x.winner==="fly"?"\uD328":"\uBB34"),T=k("div",{class:"main"});T.append(k("b",{},new Date(x.startedAt).toLocaleString("ko-KR",{dateStyle:"medium",timeStyle:"short"})),k("span",{class:"num"},`\uC870\uAC01 ${x.human?.pieces??0} vs ${x.fly?.pieces??0} \xB7 \uACF5\uACA9 ${x.human?.attack??0} vs ${x.fly?.attack??0} \xB7 \uACB0\uC815 \uAE30\uB85D ${cn(x.id).length}`));let w=k("div",{class:"end"});w.append(k("span",{class:`tag ${A}`},b),k("span",{class:"num"},x.think?`${x.think.median} ms/\uC218`:"\u2014")),p.append(M,T,w),p.addEventListener("click",()=>{c=x.id,d()}),g.appendChild(p)}),n.replaceChildren(g)}function d(){let f=no(),g=!!f;for(let m of[o,a,r])m&&(m.hidden=!g);if(e.hidden=g,!g){e.replaceChildren(Nn({desc:"\uCD08\uD30C\uB9AC\uC640 \uD55C \uD310 \uB450\uBA74 \uC804\uC801\uACFC \uACF5\uACA9 \uC8FC\uACE0\uBC1B\uAE30\uAC00 \uC5EC\uAE30\uC5D0 \uC313\uC5EC\uC694. \uD310\uC744 \uACE0\uB974\uBA74 \uB2E4\uB978 \uD654\uBA74\uB4E4\uB3C4 \uADF8 \uD310\uC744 \uB530\uB77C\uAC00\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uAE30\uB85D\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uB0A8\uC544\uC694 (\uCD5C\uADFC 20\uD310)"}));return}t.replaceChildren(l("\uC804\uC801",`${f.wins}\uC2B9 ${f.losses}\uD328${f.draws?` ${f.draws}\uBB34`:""}`,`${f.games}\uD310 \xB7 \uAE30\uB85D\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uB0A8\uC544\uC694`),l("\uC870\uAC01 \uC911\uC559\uAC12",`${f.humanPiecesMedian??0} vs ${f.flyPiecesMedian??0}`,"\uC67C\uCABD\uC774 \uB098, \uC624\uB978\uCABD\uC774 \uCD08\uD30C\uB9AC\uC608\uC694"),l("\uACF5\uACA9 \uC911\uC559\uAC12",`${f.humanAttackMedian??0} vs ${f.flyAttackMedian??0}`,`\uD569\uACC4 ${f.humanAttack} vs ${f.flyAttack}\uC904`),l("\uCD08\uD30C\uB9AC \uC0DD\uAC01 \uC2DC\uAC04",f.thinkMedian!==null?`${f.thinkMedian} ms`:"\u2014","\uD55C \uC218\uB97C \uACE0\uB974\uB294 \uB370 \uAC78\uB9B0 \uC2DC\uAC04\uC758 \uC911\uC559\uAC12")),(!c||!Un().matches.some(m=>m.id===c&&m.endedAt))&&(c=Un().matches.find(m=>m.endedAt)?.id??null),u();let x=Un().matches.find(m=>m.id===c);if(x){h(x);let m=gl(cn(x.id)),p=document.getElementById("matches-timeline-foot"),b=x.winner==="human"?"\uCD08\uD30C\uB9AC\uAC00 \uD0D1\uC544\uC6C3\uD588\uC5B4\uC694":x.winner==="fly"?"\uB0B4\uAC00 \uD0D1\uC544\uC6C3\uD588\uC5B4\uC694":x.reason??"";p.innerHTML=`${new Date(x.startedAt).toLocaleString("ko-KR",{dateStyle:"medium",timeStyle:"short"})} \xB7 ${b} \xB7 \uB0B4 \uC904 ${x.human?.lines??0}(\uD14C\uD2B8\uB9AC\uC2A4 ${x.human?.tetris??0}) \xB7 \uCD08\uD30C\uB9AC \uC904 ${x.fly?.lines??0}(\uD14C\uD2B8\uB9AC\uC2A4 ${x.fly?.tetris??0}) \xB7 \uBC1B\uC740 \uAC00\uBE44\uC9C0 ${x.human?.garbageReceived??0} vs ${x.fly?.garbageReceived??0}`+(m?` \xB7 \uC774 \uD310\uC758 \uCD08\uD30C\uB9AC \uACB0\uC815 ${m.decisions}\uAC1C: \uAD50\uC0AC \uCD5C\uC120 \uC120\uD0DD ${(m.top1*100).toFixed(0)}% \xB7 \uC0C1\uB300 regret ${ye(m.relRegret,3)}`:"")}}return{render:d,refresh:d,select(f){c=f,d()}}}function av(i){let e=i>>>0^2654435769,t=new Uint32Array(4);for(let n=0;n<4;n++){e=e+2654435769>>>0;let s=e;s=Math.imul(s^s>>>16,2246822507)>>>0,s=Math.imul(s^s>>>13,3266489909)>>>0,t[n]=(s^s>>>16)>>>0}return t.every(n=>n===0)&&(t[0]=1),t}function Kn(i=1){let e=av(i),t=e[0],n=e[1],s=e[2],r=e[3];function o(){let a=n+r>>>0,c=a<n?1:0,l=t+s+c>>>0,h=t,u=n,d=s,f=r;return t=d,n=f,h=(h^(h<<23|u>>>9))>>>0,u=(u^u<<23)>>>0,u=(u^(u>>>18|h<<14))>>>0,h=(h^h>>>18)>>>0,h=(h^d)>>>0,u=(u^f)>>>0,u=(u^(f>>>5|d<<27))>>>0,h=(h^d>>>5)>>>0,s=h,r=u,(l*2097152+(a>>>11))/9007199254740992}return{next:o,int:a=>Math.floor(o()*a),uniform:(a,c)=>a+(c-a)*o(),shuffle(a){for(let c=a.length-1;c>0;c--){let l=Math.floor(o()*(c+1)),h=a[c];a[c]=a[l],a[l]=h}return a}}}var Ge=10,_t=20,lo=Ge*_t,lv=4,cv=Ge*lv,di=["I","O","T","S","Z","J","L"],Gf={I:[`....
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
.X.`]};function hv(i){let e=i.split(`
`),t=[];e.forEach((l,h)=>[...l].forEach((u,d)=>{u==="X"&&t.push([d,h])}));let n=Math.min(...t.map(l=>l[0])),s=Math.min(...t.map(l=>l[1])),r=t.map(([l,h])=>[l-n,h-s]).sort((l,h)=>l[1]-h[1]||l[0]-h[0]),o=Math.max(...r.map(l=>l[0]))+1,a=Math.max(...r.map(l=>l[1]))+1,c=new Array(o).fill(-1);for(let[l,h]of r)c[l]=Math.max(c[l],h);return{cells:r,w:o,h:a,bottom:c}}var rs=di.map(i=>Gf[i].map(hv));function Xh(){return new Uint8Array(lo)}function Wf(i,e){for(let t=0;t<_t;t++)if(i[t*Ge+e])return t;return _t}function uv(i,e,t,n){let s=rs[e][n&3];if(t<0||t+s.w>Ge)return null;let r=_t;for(let o=0;o<s.w;o++){let a=Wf(i,t+o)-1-s.bottom[o];a<r&&(r=a)}return r}function vl(i,e,t,n,s){let r=rs[e][n&3];if(s===void 0&&(s=uv(i,e,t,n)),s===null)throw new RangeError(`placement out of bounds: piece ${di[e]} col ${t} rot ${n}`);if(s<0)return{board:new Uint8Array(i),linesCleared:0,gameOver:!0,landingRow:s,erodedPieceCells:0};let o=new Uint8Array(i);for(let[u,d]of r.cells)o[(s+d)*Ge+t+u]=1;let a=new Set(r.cells.map(([,u])=>s+u)),c=0,l=0,h=_t-1;for(let u=_t-1;u>=0;u--){let d=!0;for(let f=0;f<Ge;f++)if(!o[u*Ge+f]){d=!1;break}if(d){c++,a.has(u)&&(l+=r.cells.filter(([,f])=>s+f===u).length);continue}h!==u&&o.copyWithin(h*Ge,u*Ge,(u+1)*Ge),h--}return h>=0&&o.fill(0,0,(h+1)*Ge),{board:o,linesCleared:c,gameOver:!1,landingRow:s,erodedPieceCells:l}}var dv=5,fv=8,pv=[0,0,1,2,4],mv=[0,2,4,6],gv=10,Wh=[[2,0],[4,1],[6,2],[10,3],[1/0,4]];function _v(i){if(i<=0)return 0;for(let[e,t]of Wh)if(i<=e)return t;return Wh[Wh.length-1][1]}function xv(i){let e=i.split(`
`),t=[];return e.forEach((n,s)=>[...n].forEach((r,o)=>{r==="X"&&t.push([o,s])})),{cells:t,size:e.length,minX:Math.min(...t.map(n=>n[0])),minY:Math.min(...t.map(n=>n[1]))}}var $h=di.map(i=>Gf[i].map(xv)),yv={"0>1":[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],"1>0":[[0,0],[1,0],[1,1],[0,-2],[1,-2]],"1>2":[[0,0],[1,0],[1,1],[0,-2],[1,-2]],"2>1":[[0,0],[-1,0],[-1,-1],[0,2],[-1,2]],"2>3":[[0,0],[1,0],[1,-1],[0,2],[1,2]],"3>2":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"3>0":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"0>3":[[0,0],[1,0],[1,-1],[0,2],[1,2]]},vv={"0>1":[[0,0],[-2,0],[1,0],[-2,1],[1,-2]],"1>0":[[0,0],[2,0],[-1,0],[2,-1],[-1,2]],"1>2":[[0,0],[-1,0],[2,0],[-1,-2],[2,1]],"2>1":[[0,0],[1,0],[-2,0],[1,2],[-2,-1]],"2>3":[[0,0],[2,0],[-1,0],[2,-1],[-1,2]],"3>2":[[0,0],[-2,0],[1,0],[-2,1],[1,-2]],"3>0":[[0,0],[1,0],[-2,0],[1,2],[-2,-1]],"0>3":[[0,0],[-1,0],[2,0],[-1,-2],[2,1]]},Mv=(i,e,t)=>(di[i]==="I"?vv:yv)[`${e}>${t}`],bv=di.indexOf("T"),Xf=di.indexOf("O"),Sv=2;function $f(i){let e=new Int32Array(Ge);for(let t=0;t<Ge;t++)e[t]=Wf(i,t);return e}function qf(i){let e=$f(i);return Array.from(e,t=>_t-t)}function wv(i){let e=$h[i][0],t=Math.max(...e.cells.map(n=>n[1]));return{bx:Math.floor((Ge-e.size)/2),by:-(t+1)}}var ss=di.map((i,e)=>$h[e].map(t=>({xs:Int8Array.from(t.cells.map(n=>n[0])),ys:Int8Array.from(t.cells.map(n=>n[1])),minX:t.minX,maxX:Math.max(...t.cells.map(n=>n[0])),minY:t.minY,maxY:Math.max(...t.cells.map(n=>n[1])),size:t.size}))),Ev=di.map((i,e)=>Array.from({length:16},(t,n)=>{let s=n>>2,r=n&3;return(r===(s+1)%4||r===(s+3)%4)&&e!==Xf?Mv(e,s,r):null}));function ao(i,e,t,n){let{xs:s,ys:r}=e;for(let o=0;o<4;o++){let a=t+s[o],c=n+r[o];if(a<0||a>=Ge||c<-Sv||c>=_t||c>=0&&i[c*Ge+a])return!1}return!0}function Tv(i,e,t,n,s,{spin:r,kick5:o=!1}){if(e!==bv||!r)return null;let a=$h[e][n&3],c=t-a.minX,l=s-a.minY,h=(p,b)=>p<0||p>=Ge||b>=_t||b>=0&&i[b*Ge+p]===1,u=h(c,l),d=h(c+2,l),f=h(c,l+2),g=h(c+2,l+2);if(u+d+f+g<3)return null;let m=[[u,d],[d,g],[f,g],[u,f]][n&3];return m[0]&&m[1]||o?"full":"mini"}function Av(i,e,t){if(e<=0)return{board:new Uint8Array(i),toppedOut:!1};let n=new Uint8Array(lo),s=!1;for(let r=0;r<e*Ge;r++)if(i[r]){s=!0;break}n.set(i.subarray(e*Ge),0);for(let r=_t-e;r<_t;r++)for(let o=0;o<Ge;o++)n[r*Ge+o]=o===t?0:1;return{board:n,toppedOut:s}}var oo=new Map;function Yf(i){if(oo.has(i))return oo.get(i);oo.size>=512&&oo.clear();let e=Kn(i),t=[],n={seed:i,at(s){for(;t.length<=s;){let r=e.shuffle([0,1,2,3,4,5,6]);for(;r.length;)t.push(r.pop())}return t[s]}};return oo.set(i,n),n}function co(i){let e=Yf(i);return{seed:i,seq:e,drawn:1,current:e.at(0),hold:null,holdUsed:!1,board:Xh(),garbage:[],combo:0,pieces:0,dead:!1,stats:{attack:0,sent:0,cancelled:0,lines:0,tetris:0,tspin:0,tspinMini:0,perfectClear:0,garbageReceived:0,maxCombo:0,holds:0}}}var Ml=(i,e=dv)=>Array.from({length:e},(t,n)=>i.seq.at(i.drawn+n)),ho=i=>i.garbage.reduce((e,t)=>e+t.lines,0);function qh(i){if(i.holdUsed)throw new Error("hold already used for this placement");return i.hold===null?{...i,hold:i.current,current:i.seq.at(i.drawn),drawn:i.drawn+1,holdUsed:!0,stats:{...i.stats,holds:i.stats.holds+1}}:{...i,hold:i.current,current:i.hold,holdUsed:!0,stats:{...i.stats,holds:i.stats.holds+1}}}function Yh(i,e,t){if(e<=0)return i;if(!(t>=0&&t<Ge))throw new RangeError(`garbage hole out of range: ${t}`);return{...i,garbage:[...i.garbage,{lines:e,hole:t}]}}function Kh(i,{col:e,rot:t,top:n,spin:s=!1,kick5:r=!1}){if(i.dead)throw new Error("player is dead");let o=i.current,a=vl(i.board,o,e,t,n),c=a.landingRow,l={piece:o,col:e,rot:t,top:c,spin:s,landingRow:c,erodedPieceCells:a.erodedPieceCells};if(a.gameOver)return{player:{...i,dead:!0,holdUsed:!1},event:{...l,linesCleared:0,tspin:null,perfectClear:!1,combo:0,attack:0,sent:0,cancelled:0,garbageInserted:0,toppedOut:!0,board:a.board}};let h=Tv(i.board,o,e,t,c,{spin:s,kick5:r}),u=a.linesCleared,d=u>0?i.combo+1:0,f=!1;if(u>0){f=!0;for(let y=0;y<lo;y++)if(a.board[y]){f=!1;break}}let g=0;u>0&&(g=(h==="full"?mv[u]:pv[u])+_v(d)+(f?gv:0));let x=i.garbage,m=g,p=0;if(g>0&&x.length){let y=g;x=[];for(let _ of i.garbage)y>=_.lines?(y-=_.lines,p+=_.lines):y>0?(x.push({lines:_.lines-y,hole:_.hole}),p+=y,y=0):x.push(_);m=y}let b=a.board,A=0,M=!1;if(u===0&&x.length){let y=fv,_=[];for(let E of x){if(y<=0){_.push(E);continue}let R=Math.min(y,E.lines),L=Av(b,R,E.hole);b=L.board,M=M||L.toppedOut,A+=R,y-=R,R<E.lines&&_.push({lines:E.lines-R,hole:E.hole})}x=_}let T={...i.stats,attack:i.stats.attack+g,sent:i.stats.sent+m,cancelled:i.stats.cancelled+p,lines:i.stats.lines+u,tetris:i.stats.tetris+(u===4?1:0),tspin:i.stats.tspin+(h==="full"&&u>0?1:0),tspinMini:i.stats.tspinMini+(h==="mini"&&u>0?1:0),perfectClear:i.stats.perfectClear+(f?1:0),garbageReceived:i.stats.garbageReceived+A,maxCombo:Math.max(i.stats.maxCombo,d)};return{player:{...i,board:b,garbage:x,combo:d,holdUsed:!1,pieces:i.pieces+1,dead:M,stats:T,current:i.seq.at(i.drawn),drawn:i.drawn+1},event:{...l,linesCleared:u,tspin:h,perfectClear:f,combo:d,attack:g,sent:m,cancelled:p,garbageInserted:A,toppedOut:M,board:a.board}}}function bl(i,e){let t=e.useHold?qh(i):i;return Kh(t,e)}function Zh(i,e,t,n,s){return ao(i,ss[e][t&3],n,s)}function Kf(i,e,t,n){let s=ss[i][e&3],r=[];for(let o=0;o<4;o++)r.push([t+s.xs[o],n+s.ys[o]]);return r}function Zf(i,e,t,n){let s=ss[i][e&3];return{col:t+s.minX,rot:e&3,top:n+s.minY,lockOut:n+s.minY<0}}function Jh(i,e,t,n,s){return!ao(i,ss[e][t&3],n,s+1)}function jh(i,e,t,n,s){let r=ss[e][t&3],o=s;for(;ao(i,r,n,o+1);)o++;return o}function Jf(i,e,t,n,s,r){let o=t&3,a=n&3;if(e===Xf)return{rot:o,bx:s,by:r,kick5:!1,kick:0};if(o===a)return{rot:o,bx:s,by:r,kick5:!1,kick:0};let c=Ev[e][o<<2|a];if(!c)return ao(i,ss[e][a],s,r)?{rot:a,bx:s,by:r,kick5:!1,kick:0}:null;let l=ss[e][a];for(let h=0;h<c.length;h++){let u=s+c[h][0],d=r+c[h][1];if(ao(i,l,u,d))return{rot:a,bx:u,by:d,kick5:h===4,kick:h}}return null}function jf(i,e){let{bx:t,by:n}=wv(e);return Zh(i,e,0,t,n)?{rot:0,bx:t,by:n}:null}var uo={gravityMs:800,softDropMs:12,dasMs:120,arrMs:12,lockDelayMs:500,lockResets:15},fo={left:!1,right:!1,softDrop:!1,hardDrop:!1,cw:!1,ccw:!1,flip:!1,hold:!1};function El(i,e,t=null){let n=jf(i,e);return n?{piece:e,rot:n.rot,bx:n.bx,by:n.by,lockMs:0,resets:0,gravMs:0,repeatMs:t?.repeatMs??0,dasDir:t?.dasDir??0,dasMs:t?.dasMs??0,lowestBy:n.by,spin:!1,kick5:!1,prev:{...fo,...t?.prev??{}}}:null}var eu=(i,e)=>({prev:{...fo,...e??i?.prev??{}},dasDir:i?.dasDir??0,dasMs:i?.dasMs??0,repeatMs:i?.repeatMs??0}),Sl=(i,e,t,n)=>Zh(e,i.piece,i.rot,i.bx+t,i.by+n)?(i.bx+=t,i.by+=n,!0):!1,Qh=(i,e,t)=>{let n=Jf(e,i.piece,i.rot,t,i.bx,i.by);return!n||n.rot===i.rot&&n.bx===i.bx&&n.by===i.by?!1:(i.rot=n.rot,i.bx=n.bx,i.by=n.by,i.kick5=n.kick5,!0)};function wl(i,e,t,n){i.spin=n,n||(i.kick5=!1),i.by>i.lowestBy&&(i.lowestBy=i.by,i.resets=0),Jh(e,i.piece,i.rot,i.bx,i.by)&&i.resets<t.lockResets&&(i.lockMs=0,i.resets++)}function Qf(i){let e=Zf(i.piece,i.rot,i.bx,i.by);return{col:e.col,rot:e.rot,top:e.top,spin:i.spin,kick5:i.kick5,lockOut:e.lockOut}}function ep(i,e,t,n,s=uo){let r={...fo,...n},o=i.prev,a=!1,c=!1,l=r.hold&&!o.hold;r.cw&&!o.cw?c=Qh(i,e,i.rot+1&3)||c:r.ccw&&!o.ccw?c=Qh(i,e,i.rot+3&3)||c:r.flip&&!o.flip&&(c=Qh(i,e,i.rot+2&3)||c),c&&wl(i,e,s,!0);let h=r.left&&!r.right?-1:r.right&&!r.left?1:0;if(h===0)i.dasDir=0,i.dasMs=0,i.repeatMs=0;else if(i.dasDir!==h)i.dasDir=h,i.dasMs=0,i.repeatMs=0,Sl(i,e,h,0)&&(a=!0,wl(i,e,s,!1));else if(i.dasMs+=t,i.dasMs>=s.dasMs)if(s.arrMs<=0){for(;Sl(i,e,h,0);)a=!0;a&&wl(i,e,s,!1)}else for(i.repeatMs+=t;i.repeatMs>=s.arrMs&&(i.repeatMs-=s.arrMs,Sl(i,e,h,0));)a=!0,wl(i,e,s,!1);if(r.hardDrop&&!o.hardDrop){let g=jh(e,i.piece,i.rot,i.bx,i.by);return g!==i.by&&(i.by=g,i.spin=!1,i.kick5=!1),i.prev=r,{lock:Qf(i),holdRequest:!1,moved:!0,rotated:c,hardDrop:!0}}let u=r.softDrop?s.softDropMs:s.gravityMs,d=!1;for(i.gravMs+=t;i.gravMs>=u;)if(i.gravMs-=u,Sl(i,e,0,1))a=!0,d=!0,i.spin=!1,i.kick5=!1,i.by>i.lowestBy&&(i.lowestBy=i.by,i.resets=0);else{i.gravMs=0;break}let f=null;return Jh(e,i.piece,i.rot,i.bx,i.by)?(d?i.lockMs=0:i.lockMs+=t,i.lockMs>=s.lockDelayMs&&(f=Qf(i))):i.lockMs=0,i.prev=r,{lock:f,holdRequest:l,moved:a,rotated:c,hardDrop:!1}}var tp=(i,e)=>jh(e,i.piece,i.rot,i.bx,i.by);function ip({seedHuman:i=1,seedFly:e=1,garbageSeed:t=7,tuning:n=uo,cap:s=2e3}={}){let r=co(i),o=co(e);return{rng:Kn(t),tuning:n,cap:s,human:{player:r,k:El(r.board,r.current),lastEvent:null,pieces:0,keys:null},fly:{player:o,k:null,lastEvent:null,pieces:0},over:!1,winner:null,reason:null,log:[]}}var np=i=>i==="human"?"fly":"human";function Tl(i,e,t){i.over=!0,i.winner=e,i.reason=t}function sp(i,e,t,n){let s=i[e];if(s.player=t,s.lastEvent=n,s.pieces++,n.sent>0){let r=i[np(e)];r.player=Yh(r.player,n.sent,i.rng.int(Ge))}return i.log.push({side:e,sent:n.sent,cancelled:n.cancelled,lines:n.linesCleared,tspin:n.tspin,combo:n.combo,at:i[e].pieces}),i.log.length>40&&i.log.shift(),t.dead||n.toppedOut?(Tl(i,np(e),`${e} \uD0D1\uC544\uC6C3`),!0):s.pieces>=i.cap?(Tl(i,null,"\uC870\uAC01 \uC0C1\uD55C"),!0):!1}function rp(i,e,t){if(i.over)return{locked:!1,held:!1,event:null};let n=i.human;if(!n.k)return Tl(i,"fly","human \uC2A4\uD3F0 \uBD88\uAC00"),{locked:!1,held:!1,event:null};n.keys=t;let s=ep(n.k,n.player.board,e,t,i.tuning);if(s.holdRequest&&!n.player.holdUsed){let l=eu(n.k,t);return n.player=qh(n.player),n.k=El(n.player.board,n.player.current,l),{locked:!1,held:!0,event:null}}if(!s.lock)return{locked:!1,held:!1,event:null};let{player:r,event:o}=Kh(n.player,{col:s.lock.col,rot:s.lock.rot,top:s.lock.top,spin:s.lock.spin,kick5:s.lock.kick5}),a=eu(n.k,t),c=sp(i,"human",r,o);return n.k=c?null:El(r.board,r.current,a),{locked:!0,held:!1,event:o}}function op(i){let e=i.fly.player;return{board:Uint8Array.from(e.board),current:e.current,hold:e.hold,holdUsed:e.holdUsed,seed:e.seed,drawn:e.drawn,combo:e.combo,pieces:e.pieces,dead:e.dead,garbage:e.garbage.map(t=>({...t})),stats:{...e.stats},next:Ml(e,5),pending:ho(e)}}function ap(i,e){if(i.over)return null;if(!e)return Tl(i,"human","fly \uB193\uC744 \uC790\uB9AC \uC5C6\uC74C"),null;let{player:t,event:n}=bl(i.fly.player,e);return sp(i,"fly",t,n),n}function lp(i,e){let t=i[e],n=t.player,s={board:n.board,current:n.current,hold:n.hold,holdUsed:n.holdUsed,next:Ml(n,5),pending:ho(n),stats:n.stats,combo:n.combo,pieces:t.pieces,dead:n.dead,piece:null,ghost:null};return e==="human"&&t.k&&(s.piece={piece:t.k.piece,rot:t.k.rot,bx:t.k.bx,by:t.k.by},s.ghost={piece:t.k.piece,rot:t.k.rot,bx:t.k.bx,by:tp(t.k,n.board)}),s}var cp=["oklch(0.700 0.130 205)","oklch(0.840 0.171 87)","oklch(0.624 0.176 300)","oklch(0.600 0.150 154)","oklch(0.628 0.218 22)","oklch(0.624 0.176 254)","oklch(0.748 0.183 56)"],Cv="oklch(0.957 0.005 247)",Rv="oklch(0.913 0.008 247)",Iv="oklch(0.752 0.016 251)",Pv="oklch(0.978 0.003 247)",fi=2,Al=_t+fi,Lv=i=>({width:Ge*i,height:Al*i});function tu(i,{cell:e=30}={}){let t=Lv(e),n=Math.min(2,globalThis.devicePixelRatio||1);i.width=Math.round(t.width*n),i.height=Math.round(t.height*n),i.style.width=`${t.width}px`,i.style.height=`${t.height}px`;let s=i.getContext("2d");s.scale(n,n);let r=l=>(l+fi)*e,o=Math.max(2,Math.round(e*.12)),a=(l,h,u,d=1)=>{s.globalAlpha=d,s.fillStyle=u,s.beginPath(),s.roundRect(l*e+1,r(h)+1,e-2,e-2,o),s.fill(),s.globalAlpha=1};function c(l){s.fillStyle=Pv,s.fillRect(0,0,t.width,fi*e),s.fillStyle=Cv,s.fillRect(0,fi*e,t.width,_t*e),s.strokeStyle=Rv,s.lineWidth=1,s.beginPath();for(let u=1;u<Ge;u++)s.moveTo(u*e+.5,0),s.lineTo(u*e+.5,t.height);for(let u=1;u<Al;u++)s.moveTo(0,u*e+.5),s.lineTo(t.width,u*e+.5);s.stroke(),s.strokeStyle="oklch(0.840 0.012 248)",s.beginPath(),s.moveTo(0,fi*e+.5),s.lineTo(t.width,fi*e+.5),s.stroke();for(let u=0;u<_t;u++)for(let d=0;d<Ge;d++)l.board[u*Ge+d]&&a(d,u,Iv);let h=(u,d)=>{for(let[f,g]of Kf(u.piece,u.rot,u.bx,u.by))g>=-fi&&g<_t&&f>=0&&f<Ge&&a(f,g,cp[u.piece],d)};l.ghost&&h(l.ghost,.2),l.piece&&h(l.piece,1)}return{draw:c,size:t,cell:e}}function nu(i,e,t){let n=e[i][0],s=document.createElement("div");s.className="vs-mini",s.style.gridTemplateColumns=`repeat(${n.w}, ${t}px)`,s.style.gridTemplateRows=`repeat(${n.h}, ${t}px)`;let r=new Set(n.cells.map(([o,a])=>a*n.w+o));for(let o=0;o<n.w*n.h;o++){let a=document.createElement("div");r.has(o)&&(a.style.background=cp[i]),s.appendChild(a)}return s}var Cl={landingHeight:-4.500158825082766,erodedPieceCells:3.4181268101392694,rowTransitions:-3.2178882868487753,columnTransitions:-9.348695305445199,holes:-7.899265427351652,cumulativeWells:-3.3855972247263626};var up=["landingHeight","erodedPieceCells","rowTransitions","columnTransitions","holes","cumulativeWells"],Bv={ceilingFrac:.05,topSpikeShare:.3,dnActive:40,medianRateHz:[.5,40]};var TE={saturatedFrac:.05,dnActive:Bv.dnActive,cosineSeparation:.01};var NE=up.map(i=>Cl[i]);var kv=["landingHeight","erodedPieceCells","attackSent","comboState"],zv=["rowTransitions","columnTransitions","holes","cumulativeWells","wellDepth","tspinSetup","garbageQueueHeight"],Hv=[...kv,...zv];var Vv=4,jE={weights:{landingHeight:-1.5,erodedPieceCells:Cl.erodedPieceCells,rowTransitions:-2,columnTransitions:-6,holes:-10,cumulativeWells:-.3,attackSent:15,comboState:.5,wellDepth:25,tspinSetup:3,garbageQueueHeight:-1.5},dangerHeight:13};function dp(i){return Gv(qf(i))}function Gv(i){let e=1/0,t=1/0,n=-1;for(let r=0;r<Ge;r++)i[r]<e?(t=e,e=i[r],n=r):i[r]<t&&(t=i[r]);let s=0;for(let r=0;r<Ge;r++){let a=(r===n?t:e)-i[r];a>s&&(s=a)}return Math.min(Vv,s)}var Wv=new Int32Array(_t);function fp(i){let e=0,t=0,n=0,s=0,r=new Int32Array(Ge),o=Wv;for(let a=0;a<Ge;a++){let c=0,l=!1;for(let u=0;u<_t;u++){let d=i[u*Ge+a];d!==c&&t++,c=d,d?l||(l=!0,r[a]=_t-u):l&&n++}c!==1&&t++;let h=0;for(let u=_t-1;u>=0;u--)h=i[u*Ge+a]?0:h+1,o[u]=h;for(let u=0;u<_t;u++){if(i[u*Ge+a])continue;let d=a===0?1:i[u*Ge+a-1],f=a===Ge-1?1:i[u*Ge+a+1];d&&f&&(s+=o[u])}}for(let a=0;a<_t;a++){let c=1,l=a*Ge;for(let h=0;h<Ge;h++){let u=i[l+h];u!==c&&e++,c=u}c!==1&&e++}return{rowTransitions:e,columnTransitions:t,holes:n,cumulativeWells:s,heights:r}}var QE=Hv.length+1;var pp="fly.settings.v2",Xv="fly.settings.v1",$v=matchMedia("(prefers-reduced-motion: reduce)").matches,qv={autoRotate:!$v,darkViz:!1,grayOverlap:!0,tabular:!1},Yv={gravityMs:800,softDropMs:12,dasMs:120,arrMs:12},tr={...qv,...Yv},mp={gravityMs:{label:"\uC911\uB825",desc:"\uD55C \uCE78 \uC790\uB3D9\uC73C\uB85C \uB0B4\uB824\uAC00\uB294 \uC8FC\uAE30",min:100,max:1500,step:50},softDropMs:{label:"\uC18C\uD504\uD2B8\uB4DC\uB86D",desc:"\u2193 \uB97C \uB204\uB974\uACE0 \uC788\uC744 \uB54C \uD55C \uCE78 \uC8FC\uAE30",min:4,max:60,step:2},dasMs:{label:"DAS",desc:"\uC88C\uC6B0\uB97C \uB204\uB974\uACE0 \uC790\uB3D9 \uBC18\uBCF5\uC774 \uC2DC\uC791\uB418\uAE30\uAE4C\uC9C0",min:40,max:220,step:10},arrMs:{label:"ARR",desc:"\uC790\uB3D9 \uBC18\uBCF5 \uC8FC\uAE30 (0 \uC774\uBA74 \uC989\uC2DC \uBCBD\uAE4C\uC9C0)",min:0,max:80,step:1}},gp=[[["\u2190","\u2192"],"\uC774\uB3D9"],[["\u2193"],"\uC18C\uD504\uD2B8\uB4DC\uB86D"],[["Space"],"\uD558\uB4DC\uB4DC\uB86D"],[["\u2191","X"],"\uD68C\uC804"],[["Z"],"\uBC18\uB300 \uD68C\uC804"],[["A"],"180\xB0"],[["C","Shift"],"\uD640\uB4DC"],[["P"],"\uC77C\uC2DC\uC815\uC9C0"],[["R"],"\uB9AC\uB9E4\uCE58"]];function Kv(){try{let i=JSON.parse(localStorage.getItem(pp)??"null");if(i)return{...tr,...i};let e=JSON.parse(localStorage.getItem(Xv)??"null");return{...tr,...e??{}}}catch{return{...tr}}}var iu=i=>{try{localStorage.setItem(pp,JSON.stringify(i))}catch{}};function _p(i){let e=Kv(),t=[...document.querySelectorAll("[data-setting]")],n=[...document.querySelectorAll("[data-tune]")],s=()=>{for(let r of t)r.checked=!!e[r.dataset.setting];for(let r of n){r.value=String(e[r.dataset.tune]);let o=document.getElementById(`${r.dataset.tune}-out`);o&&(o.textContent=`${e[r.dataset.tune]} ms`)}document.body.classList.toggle("tabular",!!e.tabular)};for(let r of t)r.addEventListener("change",()=>{e[r.dataset.setting]=r.checked,iu(e),s(),i?.(r.dataset.setting,r.checked,e)});for(let r of n)r.addEventListener("input",()=>{let o=Number(r.value);e[r.dataset.tune]=o;let a=document.getElementById(`${r.dataset.tune}-out`);a&&(a.textContent=`${o} ms`),iu(e),i?.(r.dataset.tune,o,e)});document.getElementById("settings-reset")?.addEventListener("click",()=>{Object.assign(e,tr),iu(e),s();for(let r of Object.keys(tr))i?.(r,e[r],e)}),s();for(let r of Object.keys(tr))i?.(r,e[r],e);return e}var xp=i=>({gravityMs:i.gravityMs,softDropMs:i.softDropMs,dasMs:i.dasMs,arrMs:i.arrMs});var su=150,Zv=8e3,bt=i=>document.getElementById(i);function yp({settings:i,sampled:e=null,onRecord:t=null,build:n=""}={}){let s=n?`?v=${n}`:"",r=bt("vs-human"),o=bt("vs-fly"),a={human:{hold:bt("vs-humanHold"),next:bt("vs-humanNext"),garbage:bt("vs-humanGarbage"),combo:bt("vs-humanCombo"),badge:bt("vs-humanBadge")},fly:{hold:bt("vs-flyHold"),next:bt("vs-flyNext"),garbage:bt("vs-flyGarbage"),combo:bt("vs-flyCombo"),badge:bt("vs-flyBadge")}},c=bt("vs-resultScrim"),l={ArrowLeft:"left",ArrowRight:"right",ArrowDown:"softDrop",Space:"hardDrop",ArrowUp:"cw",KeyX:"cw",KeyZ:"ccw",ControlLeft:"ccw",KeyA:"flip",KeyC:"hold",ShiftLeft:"hold"},h={...fo},u=!1,d=!1,f=!1,g=null,x=null,m=null,p=!1,b=!1,A=0,M=0,T=null,w=!1,y=0,_=0,E=null,R=[],L=null,O=!1,D=0,C=0,N=()=>({...uo,...xp(i)});function F(){if(O)return;O=!0;let P=x.human,_e=x.fly;bt("vs-resultTitle").textContent=x.winner==="human"?"\uC0AC\uB78C\uC774 \uC774\uACBC\uC5B4\uC694":x.winner==="fly"?"\uCD08\uD30C\uB9AC\uAC00 \uC774\uACBC\uC5B4\uC694":"\uBB34\uC2B9\uBD80\uC608\uC694",bt("vs-resultSub").textContent=x.winner==="human"?"\uCD08\uD30C\uB9AC\uAC00 \uD0D1\uC544\uC6C3\uD588\uC5B4\uC694":x.winner==="fly"?"\uD0D1\uC544\uC6C3\uD588\uC5B4\uC694":x.reason??"",bt("vs-rPiecesA").textContent=P.pieces,bt("vs-rPiecesB").textContent=_e.pieces,bt("vs-rAttackA").textContent=P.player.stats.attack,bt("vs-rAttackB").textContent=_e.player.stats.attack,bt("vs-rLinesA").textContent=`${P.player.stats.lines} \xB7 ${P.player.stats.tetris}`,bt("vs-rLinesB").textContent=`${_e.player.stats.lines} \xB7 ${_e.player.stats.tetris}`,bt("vs-rThink").textContent=E!==null?`${E} ms/\uC218`:"\u2014",c.classList.add("open"),L&&(Uf(L,x,R),t?.())}let z=()=>c.classList.remove("open");function J(){for(let _e of Object.keys(h))h[_e]=!1;z();let P=Math.random()*1e9|0;x=ip({seedHuman:P,seedFly:P,garbageSeed:P^1542469173,tuning:N(),cap:5e3}),T=null,w=!1,A++,E=null,R=[],O=!1,L=Nf({seed:P,flyPlaceMs:su,model:"C0 (7\uB2E8\uACC4 A-4\u2032)"}),_=performance.now()+1200,Z(),De()}function Y(P,_e){if(!L)return;let Fe=x[P],I=fp(Fe.player.board),v=0;for(let W=0;W<I.heights.length;W++)I.heights[W]>v&&(v=I.heights[W]);Ff(L,{side:P,at:Fe.pieces,height:v,holes:I.holes,well:Fe.player.dead?0:dp(Fe.player.board),lines:_e?.linesCleared??0,sent:_e?.sent??0,pending:Fe.player.garbage.reduce((W,q)=>W+q.lines,0)})}function Z(){!p||!x||x.over||w||T||(w=!0,y=performance.now(),M=++A,m.postMessage({type:"decide",id:M,snapshot:op(x),detail:!0}))}function ee(P){let _e=P.data;if(_e.type==="ready"){p=!0,oe("\uC0DD\uAC01 \uC911",!1),Z();return}if(_e.type==="decision"){if(w=!1,_e.id!==M)return;T=_e.cand,E=_e.ms,R.push(_e.ms),_e.detail&&L&&(Of(L,_e.detail,_e.ms),t?.());return}_e.type==="error"&&(w=!1,oe("\uC624\uB958",!0),console.error("\uCD08\uD30C\uB9AC \uC624\uB958:",_e.error))}function oe(P,_e){a.fly.badge.textContent=P,a.fly.badge.className=_e?"vs-badge quiet":"vs-badge"}function ae(){if(!(m||b)){try{m=new Worker(new URL(`fly-worker.js${s}`,document.baseURI))}catch(P){b=!0,oe("\uC6CC\uCEE4\uB97C \uB744\uC6B8 \uC218 \uC5C6\uC5B4\uC694",!0),console.error("\uC6CC\uCEE4\uB97C \uB744\uC6B0\uC9C0 \uBABB\uD588\uC5B4\uC694:",P);return}m.onmessage=ee,m.onerror=P=>{b=!0,w=!1,oe("\uC624\uB958",!0),console.error("\uC6CC\uCEE4\uB97C \uB744\uC6B0\uC9C0 \uBABB\uD588\uC5B4\uC694:",P.message??P)},m.postMessage({type:"init",base:new URL("model",document.baseURI).href,ver:s,sampled:e})}}let Be=P=>Math.max(5,Math.round((g?.human.cell??30)*P));function ve(P,_e){let Fe=a[P];if(Fe.hold.replaceChildren(),_e.hold===null||_e.hold===void 0)Fe.hold.appendChild(Object.assign(document.createElement("span"),{className:"empty",textContent:"\uC5C6\uC5B4\uC694"}));else{let v=nu(_e.hold,rs,Be(.4667));_e.holdUsed&&v.classList.add("used"),Fe.hold.appendChild(v)}Fe.next.replaceChildren();for(let v of(_e.next??[]).slice(0,5))Fe.next.appendChild(nu(v,rs,Be(.4)));let I=Math.min(20,_e.pending??0);Fe.garbage.style.height=`${I/20*100}%`,Fe.garbage.classList.toggle("high",I>=4),Fe.combo.innerHTML=_e.combo>1?`${_e.combo}<span>COMBO</span>`:""}function De(){if(!(!x||!g)){for(let P of["human","fly"]){let _e=lp(x,P);g[P].draw(_e),ve(P,_e)}x.over||(a.human.badge.textContent=u?"\uC77C\uC2DC\uC815\uC9C0":d?"\uB450\uB294 \uC911":"\uB300\uAE30 \uC911",a.human.badge.className=u||!d?"vs-badge quiet":"vs-badge",p&&!b&&oe(w?"\uC0DD\uAC01 \uC911":"\uB450\uB294 \uC911",!1))}}function U(P,_e=performance.now()){if(!x||x.over||u||!d){De();return}x.tuning=N();let Fe=rp(x,P,h);if(Fe.locked&&Y("human",Fe.event),!x.over&&(w&&_e-y>Zv&&(w=!1,console.warn("\uCD08\uD30C\uB9AC \uACB0\uC815\uC774 \uB2A6\uC5B4 \uB2E4\uC2DC \uC694\uCCAD\uD574\uC694")),!T&&!w&&Z(),T&&_e>=_)){let I=ap(x,T);I&&Y("fly",I),T=null,_=_e+su,x.over||Z()}x.over&&F(),De()}function V(P){C=requestAnimationFrame(V);let _e=Math.min(100,P-D);D=P,U(_e,P)}let ie=()=>{let P=document.activeElement;P&&P!==document.body&&typeof P.blur=="function"&&P.blur()};function be(P){if(!f)return;let _e=l[P.code];if((_e||P.code==="KeyR"||P.code==="KeyP")&&(P.preventDefault(),ie(),!P.repeat)){if(P.code==="KeyR"){J(),d=!0;return}if(P.code==="KeyP"){u=!u,De();return}d||(d=!0),h[_e]=!0}}function ce(P){if(!f)return;let _e=l[P.code];_e&&(P.preventDefault(),h[_e]=!1)}let ze=()=>{for(let P of Object.keys(h))h[P]=!1};addEventListener("keydown",be,{passive:!1}),addEventListener("keyup",ce,{passive:!1}),addEventListener("blur",ze),document.addEventListener("visibilitychange",()=>{if(document.hidden){ze();return}D=performance.now(),_=Math.max(_,D+300)}),bt("vs-restart").addEventListener("click",P=>{J(),d=!0,P.currentTarget.blur()}),bt("vs-again").addEventListener("click",P=>{J(),d=!0,P.currentTarget.blur()}),c.addEventListener("click",P=>{P.target===c&&z()});let xt=2.8+.4667+.3333+.4667+Ge,qe=40,tt=14,ht=16;function je(){let P=document.querySelector(".vs-row"),_e=document.querySelector(".vs-phead"),Fe=P?.clientHeight??0,I=P?.clientWidth??0;if(!Fe||!I)return g?.human.cell??30;let v=P&&getComputedStyle(P).flexDirection==="column",q=((v?I:(I-ht)/2)-qe)/xt;if(v)return Math.max(10,Math.min(64,Math.floor(q)));let j=Fe-qe-(_e?.offsetHeight??44)-tt;return Math.max(10,Math.min(64,Math.floor(Math.min(j/Al,q))))}function ot(P=!1){let _e=je();if(!(!P&&g&&g.human.cell===_e)){document.documentElement.style.setProperty("--cell",`${_e}px`),g={human:tu(r,{cell:_e}),fly:tu(o,{cell:_e})};for(let Fe of["human","fly"]){let I=bt(`vs-${Fe}GarbageTrack`);I&&(I.style.marginTop=`${fi*_e}px`,I.style.height=`${_t*_e}px`)}De()}}let Pt=new ResizeObserver(()=>{f&&ot()}),Vt=document.querySelector(".vs-row");Vt&&Pt.observe(Vt),addEventListener("resize",()=>{f&&ot()}),document.fonts?.ready?.then(()=>{f&&ot()});function yt(){f||(f=!0,document.body.classList.add("playing"),ae(),x||J(),ot(!0),D=performance.now(),_=Math.max(_,D+300),C||(C=requestAnimationFrame(V)))}function wt(){f&&(f=!1,document.body.classList.remove("playing"),z(),ze(),C&&cancelAnimationFrame(C),C=0)}return globalThis.__versus={get match(){return x},keys:h,get started(){return d},get paused(){return u},get ready(){return p},get active(){return f},get awaiting(){return w},get failed(){return b},get pending(){return T},get nextAt(){return _-performance.now()},get matchId(){return L},get cell(){return g?.human.cell},tuning:N,flyPlaceMs:su,step:U,newMatch:J,press(P){dispatchEvent(new KeyboardEvent("keydown",{code:P,bubbles:!0,cancelable:!0}))},release(P){dispatchEvent(new KeyboardEvent("keyup",{code:P,bubbles:!0,cancelable:!0}))}},{activate:yt,deactivate:wt,get active(){return f}}}var St={c0:"#2887ee",teacher:"#141f2c",baseline:"#87919c",none:"#f03848",ok:"#007738",muted:"#6a7480"};function nr(i,e){let t=k("div",{class:"card chart"});t.appendChild(k("div",{class:"card-title"},i));let n=Ee("svg",{role:"img","aria-label":i});return t.appendChild(n),e&&t.appendChild(k("p",{class:"note"},e)),{card:t,svg:n}}function Rl(i,e,{min:t,max:n,fmtTick:s,ticks:r=4}){let d=12+e.length*24+26;i.setAttribute("viewBox",`0 0 440 ${d}`),i.replaceChildren();let f=x=>150+(x-t)/(n-t)*274,g=Ee("g",{class:"axis"});for(let x=0;x<=r;x++){let m=t+(n-t)*x/r;g.appendChild(Ee("line",{x1:f(m),x2:f(m),y1:12,y2:d-26})),g.appendChild(Ee("text",{x:f(m),y:d-10,"text-anchor":"middle"},s(m)))}i.appendChild(g),e.forEach((x,m)=>{let p=12+m*24+12;if(i.appendChild(Ee("text",{x:140,y:p+4,"text-anchor":"end",style:x.color===St.c0?`fill:${St.c0};font-weight:600`:x.none?`fill:${St.muted}`:""},x.label)),x.none){i.appendChild(Ee("text",{x:156,y:p+4,style:`fill:${St.none};font-weight:600;font-size:10px`},"\uC544\uC9C1 \uD559\uC2B5\uD558\uC9C0 \uC54A\uC74C"));return}x.ci&&i.appendChild(Ee("line",{x1:f(Math.max(t,x.ci[0])),x2:f(Math.min(n,x.ci[1])),y1:p,y2:p,stroke:x.color,"stroke-width":2,"stroke-linecap":"round",opacity:.9}));let b=f(Math.min(n,Math.max(t,x.value))),A=x.ci?f(Math.min(n,x.ci[1])):b,M=A+46>424;i.appendChild(Ee("circle",{cx:b,cy:p,r:3.6,fill:x.color})),i.appendChild(Ee("text",{x:M?f(Math.max(t,x.ci?.[0]??x.value))-8:A+8,y:p+3.5,"text-anchor":M?"end":"start",style:`fill:${St.muted};font-size:10px`},x.text??""))})}function vp(i){let e=document.getElementById("compare-charts"),t=document.getElementById("compare-extra");e.replaceChildren(),t.replaceChildren();let n=i.play.gate20,s=i.play.base50,r=i.teacher.play,o=i.play.random,a=i.nulls.map(y=>({label:`${y.key} ${y.ko}`,none:!0})),c=Math.max(1e3,r.piecesMedian)*1.02,l=nr("\uD50C\uB808\uC774: \uC870\uAC01 \uC911\uC559\uAC12 (\uC0C1\uD55C 1000)",`\uD55C \uD310\uC5D0\uC11C \uBA87 \uC218\uB97C \uB450\uACE0 \uBC84\uD2F0\uB294\uAC00\uC608\uC694. \uAD50\uC0AC\uB294 ${r.piecesMedian} (\uC0DD\uC874 ${He(r.survival,0)}), \uCD08\uD30C\uB9AC\uB294 ${n.piecesMedian} \u2014 \uAD50\uC0AC\uC758 ${He(n.piecesMedian/r.piecesMedian,0)}\uC608\uC694. \uBB34\uC791\uC704 \uBC30\uCE58\uB294 ${o?.piecesMedian??"\u2014"}.`);Rl(l.svg,[{label:"C0 \uC2E4\uC81C \uBC30\uC120 (20\uAC8C\uC784)",value:n.piecesMedian,ci:n.piecesMedianCI,color:St.c0,text:`${n.piecesMedian}`},...s?[{label:"C0 \uC2E4\uC81C \uBC30\uC120 (50\uAC8C\uC784)",value:s.piecesMedian,ci:s.piecesMedianCI,color:St.c0,text:`${s.piecesMedian}`}]:[],...a,{label:"\uAD50\uC0AC (\uD559\uC2B5 \uBAA9\uD45C)",value:r.piecesMedian,color:St.teacher,text:`${r.piecesMedian}`},...o?[{label:"\uBB34\uC791\uC704 \uBC30\uCE58",value:o.piecesMedian,ci:o.piecesMedianCI,color:St.baseline,text:`${o.piecesMedian}`}]:[]],{min:0,max:c,fmtTick:y=>`${Math.round(y)}`}),e.appendChild(l.card);let h=nr("\uD50C\uB808\uC774: \uACF5\uACA9 \uC911\uC559\uAC12 (\uBCF4\uB0B8 \uAC00\uBE44\uC9C0 \uC904)",`\uACF5\uACA9\uC740 \uC904\uC744 \uC5EC\uB7EC \uAC1C \uD55C \uBC88\uC5D0 \uC9C0\uC6B8\uC218\uB85D \uCEE4\uC838\uC694. \uCD08\uD30C\uB9AC\uAC00 \uC9C0\uC6B4 \uC904\uC758 ${He(n.tetrisLineShare,1)}\uB9CC \uD14C\uD2B8\uB9AC\uC2A4(4\uC904)\uC608\uC694 \u2014 \uAD50\uC0AC\uB294 ${He(r.lineComposition.shares[3],1)}.`);Rl(h.svg,[{label:"C0 \uC2E4\uC81C \uBC30\uC120 (20\uAC8C\uC784)",value:n.attackMedian,ci:n.attackMedianCI,color:St.c0,text:`${n.attackMedian}`},...s?[{label:"C0 \uC2E4\uC81C \uBC30\uC120 (50\uAC8C\uC784)",value:s.attackMedian,ci:s.attackMedianCI,color:St.c0,text:`${s.attackMedian}`}]:[],...a,{label:"\uAD50\uC0AC (\uD559\uC2B5 \uBAA9\uD45C)",value:r.attackMedian,color:St.teacher,text:`${r.attackMedian}`}],{min:0,max:Math.max(r.attackMedian*1.05,50),fmtTick:y=>`${Math.round(y)}`}),e.appendChild(h.card);let u=i.ranking,d=nr(`\uC21C\uC704: \uAD50\uC0AC \uCD5C\uC120\uC744 \uACE0\uB978 \uBE44\uC728 (\uD14C\uC2A4\uD2B8 \uACB0\uC815 ${u.decisions.toLocaleString()}\uAC1C, \uD6C4\uBCF4 \uD3C9\uADE0 ${ye(u.candidatesPerDecision,1)})`,"\uAC19\uC740 \uD14C\uC2A4\uD2B8 \uBD84\uD560\uC5D0\uC11C \uD559\uC2B5 \uC804 \xB7 \uD559\uC2B5 \uD6C4 \xB7 \uC6B0\uC5F0\uC744 \uB098\uB780\uD788 \uB193\uC558\uC5B4\uC694. \uC21C\uC704\uB294 \uBD84\uBA85\uD788 \uC62C\uB790\uC5B4\uC694 \u2014 \uC774 \uCD95\uC5D0\uC11C\uB294 \uBC30\uC120 \uC704 \uD559\uC2B5\uC774 \uC791\uB3D9\uD574\uC694.");Rl(d.svg,[{label:"\uD559\uC2B5 \uD6C4",value:u.trained.top1,ci:u.trained.top1CI,color:St.c0,text:He(u.trained.top1,1)},{label:"\uD559\uC2B5 \uC804 (\uCD08\uAE30 \uAC00\uC911\uCE58)",value:u.untrained.top1,ci:u.untrained.top1CI,color:St.baseline,text:He(u.untrained.top1,1)},{label:"\uC6B0\uC5F0 (\uBB34\uC791\uC704 \uC120\uD0DD)",value:u.chance.top1,ci:u.chance.top1CI,color:St.baseline,text:He(u.chance.top1,1)}],{min:0,max:.6,fmtTick:y=>He(y,0)}),e.appendChild(d.card);let f=nr("\uC21C\uC704: \uC0C1\uB300 regret (\uB0AE\uC744\uC218\uB85D \uAD50\uC0AC \uCD5C\uC120\uC5D0 \uAC00\uAE4C\uC6CC\uC694)","\uACE0\uB978 \uD6C4\uBCF4\uAC00 \uAD50\uC0AC \uCD5C\uC120\uBCF4\uB2E4 \uC5BC\uB9C8\uB098 \uB098\uC05C\uAC00\uB97C \uADF8 \uACB0\uC815\uC758 \uCD5C\uC120~\uCD5C\uC545 \uD3ED\uC73C\uB85C \uB098\uB208 \uAC12\uC774\uC5D0\uC694. 0 \uC774\uBA74 \uB9E4\uBC88 \uAD50\uC0AC \uCD5C\uC120\uC744 \uACE8\uB790\uB2E4\uB294 \uB73B\uC774\uC5D0\uC694.");Rl(f.svg,[{label:"\uD559\uC2B5 \uD6C4",value:u.trained.relRegret,ci:u.trained.relRegretCI,color:St.c0,text:ye(u.trained.relRegret,3)},{label:"\uD559\uC2B5 \uC804 (\uCD08\uAE30 \uAC00\uC911\uCE58)",value:u.untrained.relRegret,ci:u.untrained.relRegretCI,color:St.baseline,text:ye(u.untrained.relRegret,3)},{label:"\uC6B0\uC5F0 (\uBB34\uC791\uC704 \uC120\uD0DD)",value:u.chance.relRegret,ci:u.chance.relRegretCI,color:St.baseline,text:ye(u.chance.relRegret,3)}],{min:0,max:.6,fmtTick:y=>y.toFixed(2)}),e.appendChild(f.card);let g=i.gate,x=nr(`\uAC8C\uC774\uD2B8 ${g.passCount} / ${g.total}: \uAD50\uC0AC \uB300\uBE44 \uBE44\uC728`,"\uAE30\uC900\uC120(1.0)\uC740 \uADF8 \uD56D\uBAA9\uC758 \uD1B5\uACFC\uC120\uC774\uC5D0\uC694. \uC870\uAC01\uACFC \uACF5\uACA9\uC774 \uD06C\uAC8C \uBAA8\uC790\uB77C \uC5EC\uAE30\uC11C \uBA48\uCDC4\uC5B4\uC694. \uC21C\uC704 \uC9C0\uD45C\uB294 \uC624\uB974\uB294\uB370 \uD50C\uB808\uC774 \uAE38\uC774\uB294 \uC624\uB974\uC9C0 \uC54A\uB294 \uAC83\uC774 7\uB2E8\uACC4\uC758 \uACB0\uB860\uC774\uC5D0\uC694.");{let y=g.criteria.map(z=>{let J=z.lower?z.measured>0?z.threshold/z.measured:2:z.measured/(z.threshold||1);return{label:z.label,ratio:Math.min(2,J),passed:z.passed,raw:z}}),_=440,E=26,R=150,L=54,O=12,D=26,C=O+y.length*E+D;x.svg.setAttribute("viewBox",`0 0 ${_} ${C}`);let N=z=>R+z/2*(_-R-L),F=Ee("g",{class:"axis"});for(let z of[0,.5,1,1.5,2])F.appendChild(Ee("line",{x1:N(z),x2:N(z),y1:O,y2:C-D,stroke:z===1?St.muted:void 0})),F.appendChild(Ee("text",{x:N(z),y:C-10,"text-anchor":"middle"},`${z}\xD7`));x.svg.appendChild(F),y.forEach((z,J)=>{let Y=O+J*E;x.svg.appendChild(Ee("text",{x:R-10,y:Y+E/2+4,"text-anchor":"end"},z.label)),x.svg.appendChild(Ee("rect",{x:R,y:Y+5,width:Math.max(1,N(z.ratio)-R),height:E-12,rx:3,fill:z.passed?St.ok:St.none,opacity:.85})),x.svg.appendChild(Ee("text",{x:N(z.ratio)+6,y:Y+E/2+4,style:`fill:${St.muted};font-size:10px`},`${z.ratio>=2?"\u22652":z.ratio.toFixed(2)}\xD7`))}),x.svg.appendChild(Ee("line",{x1:N(1),x2:N(1),y1:O,y2:C-D,stroke:St.teacher,"stroke-width":1.5,"stroke-dasharray":"3 3"}))}e.appendChild(x.card);let m=i.play.lineComposition,p=nr("\uC9C0\uC6B4 \uC904\uC758 \uAD6C\uC131",`\uCD08\uD30C\uB9AC\uB294 \uC2F1\uAE00\uC774 ${He(m.student.shares[0],1)}\uB85C \uB300\uBD80\uBD84\uC774\uC5D0\uC694. \uD14C\uD2B8\uB9AC\uC2A4\uB97C \uC313\uC73C\uB824\uBA74 \uC6B0\uBB3C\uC744 \uAE38\uAC8C \uC720\uC9C0\uD574\uC57C \uD558\uB294\uB370, \uC6B0\uBB3C \uAE38\uC774 \uC911\uC559\uAC12\uC774 ${i.play.wellRun.student.median} (\uAD50\uC0AC ${i.play.wellRun.teacher.median}) \uC774\uC5D0\uC694.`);{let y=["\uC2F1\uAE00","\uB354\uBE14","\uD2B8\uB9AC\uD50C","\uD14C\uD2B8\uB9AC\uC2A4"];p.svg.setAttribute("viewBox","0 0 440 124"),p.svg.replaceChildren();let N=["#c5cbd2","#a7b0b9","#6a7480","#2887ee"];[["\uCD08\uD30C\uB9AC",m.student.shares,0],["\uAD50\uC0AC",m.teacher.shares,1]].forEach(([F,z,J])=>{let Y=16+J*40;p.svg.appendChild(Ee("text",{x:32,y:Y+20,"text-anchor":"end",style:"font-weight:600"},F));let Z=40;z.forEach((ee,oe)=>{let ae=ee*388;if(ae>0){let Be=Ee("rect",{x:Z,y:Y+6,width:ae,height:24,fill:N[oe],opacity:.95});Be.appendChild(Ee("title",{},`${y[oe]} ${He(ee,1)}`)),p.svg.appendChild(Be),ae>34&&p.svg.appendChild(Ee("text",{x:Z+ae/2,y:Y+22,"text-anchor":"middle",style:`fill:${oe===3||oe===2?"#fff":"#141f2c"};font-size:10px;font-weight:600`},He(ee,0)))}Z+=ae})}),y.forEach((F,z)=>{p.svg.appendChild(Ee("rect",{x:40+z*78,y:106,width:9,height:9,rx:2,fill:N[z]})),p.svg.appendChild(Ee("text",{x:40+z*78+13,y:114,style:`fill:${St.muted};font-size:10px`},F))})}t.appendChild(p.card);let b=k("div",{class:"card tint"});b.innerHTML=`<div class="card-title">\uB300\uC870\uAD70 ${i.nulls.filter(y=>y.trained).length} / ${i.nulls.length} \uD559\uC2B5\uB428</div>
    <p>"\uC2E4\uC81C \uBC30\uC120\uC774\uB77C\uC11C \uB418\uB294 \uAC83\uC778\uAC00"\uB97C \uAC00\uB974\uB824\uBA74 \uAC19\uC740 \uD30C\uB77C\uBBF8\uD130 \uC218\uB85C \uBC30\uC120\uB9CC \uBC14\uAFBC \uB300\uC870\uAD70\uC744 \uAC19\uC740 \uC808\uCC28\uB85C \uD559\uC2B5\uD574\uC57C \uD574\uC694.
    \uB9C8\uC2A4\uD06C 3\uC885\uC740 \uB9CC\uB4E4\uC5B4\uC838 \uC788\uACE0 sanity \uB3C4 \uD1B5\uACFC\uD588\uC9C0\uB9CC(\uC804\uBD80 P ${i.nulls[0]?.P?.toLocaleString()??"\u2014"} \uB85C C0 \uC640 \uC815\uD655\uD788 \uAC19\uC544\uC694), \uAC00\uC911\uCE58 \uD559\uC2B5\uC740 \uC544\uC9C1\uC774\uC5D0\uC694.
    \uADF8\uB798\uC11C \uC774 \uD398\uC774\uC9C0\uC5D0\uB294 <b>C0 \uC758 \uC790\uB9AC\uB9CC \uCC44\uC6CC\uC838 \uC788\uACE0 \uB300\uC870\uAD70 \uC904\uC740 \uBE44\uC5B4 \uC788\uC5B4\uC694.</b> \uAC12\uC744 \uCD94\uC815\uD574 \uCC44\uC6B0\uC9C0 \uC54A\uC544\uC694.</p>`;let A=k("table",{class:"mini-table"});A.innerHTML='<thead><tr><th>\uB300\uC870\uAD70</th><th>\uBD84\uB9AC\uD558\uB824\uB294 \uAC83</th><th class="r">\uC6D0\uBCF8 \uAC04\uC120 \uAD50\uC9D1\uD569</th><th class="r">\uCC28\uC218 \uBCF4\uC874</th><th class="r">\uC0C1\uD0DC</th></tr></thead>';let M=k("tbody");for(let y of i.nulls){let _=k("tr");_.append(k("td",{},`${y.key} ${y.ko}`),k("td",{},y.separatesWhat??"\u2014"),k("td",{class:"r"},y.sanity?.edgeOverlapWithOriginal!=null?`${He(y.sanity.edgeOverlapWithOriginal,2)} (\uC6B0\uC5F0 ${He(y.sanity.chanceOverlap,2)})`:"\u2014"),k("td",{class:"r"},y.sanity?.degreeIdentical?"\uC608":"\uC544\uB2C8\uC624"),k("td",{class:"r"},y.trained?"\uD559\uC2B5 \uC644\uB8CC":y.state==="interrupted"?"\uD559\uC2B5 \uC911\uB2E8":"\uBBF8\uC2DC\uC791")),M.appendChild(_)}A.appendChild(M);let T=k("div",{class:"table-wrap"});T.appendChild(A),b.appendChild(T),t.appendChild(b);let w=document.getElementById("compare-foot");w.innerHTML=`${i.phase} \xB7 ${new Date(i.ranAt).toLocaleString("ko-KR")} \xB7 ${ye(i.elapsedHours,2)} h \uD559\uC2B5 \xB7 \uAD50\uC0AC ${i.teacher.label} \xB7 \uD559\uC2B5 \uACB0\uC815 ${i.data.trainDecisions.toLocaleString()} / \uAC80\uC99D ${i.data.valDecisions.toLocaleString()} / \uD14C\uC2A4\uD2B8 ${i.data.testDecisions.toLocaleString()} \xB7 \uC190\uC2E4 ${i.data.hyper.loss}(\u03BB ${i.data.hyper.lambda}, \u03BC ${i.data.hyper.mu}) \xB7 DAgger ${i.data.hyper.daggerRounds} \uB77C\uC6B4\uB4DC. \uCEE4\uB125\uD1B0\uC5D0\uC11C \uC624\uB294 \uAC83\uC740 \uBC30\uC120\uBFD0\uC774\uACE0 \uAC00\uC911\uCE58 ${i.model.P.toLocaleString()}\uAC1C\uB294 \uD559\uC2B5\uB41C \uAC12\uC774\uC5D0\uC694 \u2014 corr(\uCD08\uAE30, \uCD5C\uC885) ${ye(i.weights.corr,3)}, \uC5B5\uC81C\uC131 ${He(i.weights.inhibitoryFrac,1)}(\uCD08\uAE30 0%).`}function Mp(i,e){let t=i.gate,n=i.ranking,s=document.getElementById("home-kpis"),r=(y,_,E,R="")=>{let L=k("div",{class:`card kpi${R?` ${R}`:""}`});return L.append(k("div",{class:"label"},y),k("div",{class:"value"},_),k("div",{class:"sub"},E)),L},o=t.criteria.find(y=>y.key==="piecesMedian"),a=t.criteria.find(y=>y.key==="attackMedian"),c=t.criteria.find(y=>y.key==="relRegret");s.replaceChildren(r("\uAC8C\uC774\uD2B8",`${t.passCount} / ${t.total}`,`${t.phase} \xB7 \uAD50\uC0AC \uB300\uBE44 \uAE30\uC900 5\uAC1C \uC911 \uD1B5\uACFC \uC218`),r("\uC0C1\uB300 regret",ye(c.measured,3),`CI [${ye(c.ci?.[0],3)}, ${ye(c.ci?.[1],3)}] \xB7 0 \uC774\uBA74 \uB9E4 \uC218\uAC00 \uAD50\uC0AC \uCD5C\uC120`),r("\uC870\uAC01 \uC911\uC559\uAC12",`${o.measured}`,`\uAD50\uC0AC ${o.teacher} \uC758 ${He(o.ratio,0)} \xB7 \uAE30\uC900 ${o.threshold}`),r("\uACF5\uACA9 \uC911\uC559\uAC12",`${a.measured}`,`\uAD50\uC0AC ${a.teacher} \uC758 ${He(a.ratio,0)} \xB7 \uAE30\uC900 ${ye(a.threshold,1)}`)),document.getElementById("home-gate").replaceChildren(...t.criteria.flatMap((y,_)=>{let E=k("div",{class:"row lg"}),R=k("div",{class:"grow"});R.append(k("div",{class:"title"},y.label),k("div",{class:"desc"},y.desc));let L=k("div",{class:"val num"});L.append(k("b",{class:y.passed?"ok":"no"},`${ye(y.measured,y.key==="relRegret"||y.key==="garbageDeathShare"?3:1)}`),k("span",{class:"muted"},` ${y.lower?"\u2264":"\u2265"} ${ye(y.threshold,y.key==="relRegret"||y.key==="garbageDeathShare"?2:1)}`));let O=k("span",{class:`tag ${y.passed?"tag-green":"tag-red"}`},y.passed?"\uD1B5\uACFC":"\uBBF8\uB2EC");return E.append(R,L,O),_?[k("div",{class:"divider"}),E]:[E]}));let h=document.getElementById("home-mine");function u(){let y=no();if(!y){h.replaceChildren(Nn({title:"\uC544\uC9C1 \uB300\uC804\uD55C \uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694",desc:"\uCD08\uD30C\uB9AC\uC640 \uD55C \uD310 \uB450\uBA74 \uC804\uC801\uC774 \uC5EC\uAE30\uC5D0 \uB0A8\uACE0, \uCEE4\uB125\uD1B0\xB7\uACB0\uC815 \uD0D0\uC0C9\xB7\uC2E0\uACBD \uD65C\uB3D9 \uD654\uBA74\uC774 \uADF8 \uD310\uC758 \uAC12\uC73C\uB85C \uCC44\uC6CC\uC838\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uD0A4\uBCF4\uB4DC \uBC29\uD5A5\uD0A4\uC640 \uC2A4\uD398\uC774\uC2A4\uB85C \uB46C\uC694"}));return}let _=k("div",{class:"card-head"}),E=k("div",{class:"grow"});E.append(k("div",{class:"card-title"},`${y.wins}\uC2B9 ${y.losses}\uD328${y.draws?` ${y.draws}\uBB34`:""}`),k("div",{class:"card-sub num"},`${y.games}\uD310 \xB7 \uCD08\uD30C\uB9AC \uC0DD\uAC01 \uC2DC\uAC04 \uC911\uC559\uAC12 ${y.thinkMedian??"\u2014"} ms/\uC218 \xB7 \uAE30\uB85D\uD55C \uACB0\uC815 ${y.decisions}\uAC1C`));let R=k("div",{class:"right"});R.appendChild(k("a",{class:"btn btn-secondary btn-sm",href:"#/matches"},"\uB300\uC804 \uAE30\uB85D")),_.append(E,R);let L=k("div",{class:"mini-stats"});[["\uC870\uAC01 \uC911\uC559\uAC12",`${y.humanPiecesMedian??0}`,`${y.flyPiecesMedian??0}`],["\uACF5\uACA9 \uC911\uC559\uAC12",`${y.humanAttackMedian??0}`,`${y.flyAttackMedian??0}`],["\uC9C0\uC6B4 \uC904 \uD569\uACC4",`${y.humanLines}`,`${y.flyLines}`],["\uD14C\uD2B8\uB9AC\uC2A4 \uD569\uACC4",`${y.humanTetris}`,`${y.flyTetris}`]].forEach(([O,D,C])=>{let N=k("div",{class:"ms"});N.append(k("span",{class:"k"},O),k("b",{class:"a num"},D),k("span",{class:"vs"},"vs"),k("b",{class:"b num"},C)),L.appendChild(N)}),h.replaceChildren(_,L,k("p",{class:"card-note"},"\uC67C\uCABD\uC774 \uB098, \uC624\uB978\uCABD\uC774 \uCD08\uD30C\uB9AC\uC608\uC694. \uAE30\uB85D\uC740 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0\uB9CC \uB0A8\uC544\uC694."))}u();let d=document.getElementById("home-bars"),f={top1:{name:"\uAD50\uC0AC \uCD5C\uC120\uC744 \uACE0\uB978 \uBE44\uC728",fmt:y=>He(y,1),max:1},relRegret:{name:"\uC0C1\uB300 regret (\uB0AE\uC744\uC218\uB85D \uC88B\uC544\uC694)",fmt:y=>ye(y,3),max:.6,invert:!0},tau:{name:"\uACB0\uC815 \uB0B4 \uCF04\uB2EC \u03C4",fmt:y=>ye(y,3),max:.7}},g=[...document.querySelectorAll("#home-metric [data-metric]")],x=document.getElementById("home-metric-name");function m(y){let _=f[y];x.textContent=_.name;let E=[{k:"\uD559\uC2B5 \uD6C4",v:n.trained[y],on:!0},{k:"\uD559\uC2B5 \uC804",v:n.untrained[y]},{k:"\uC6B0\uC5F0",v:n.chance[y]}];d.replaceChildren(...E.map(R=>{let L=k("div",{class:`bar${R.on?" on":" diff"}`,title:`${R.k} \xB7 ${_.fmt(R.v)}`}),O=10+Math.max(0,Math.min(1,(R.v??0)/_.max))*150,D=k("div",{class:"b"});return D.style.height=`${O}px`,L.append(k("div",{class:"v"},_.fmt(R.v)),D,k("div",{class:"k"},R.k)),L})),g.forEach(R=>R.setAttribute("aria-selected",String(R.dataset.metric===y)))}let p="top1";g.forEach(y=>y.addEventListener("click",()=>{p=y.dataset.metric,m(p)})),m(p);let b=document.getElementById("home-recent"),A=[{key:"C0",ko:"\uC2E4\uC81C \uBC30\uC120",en:"real connectome",trained:!0,note:`\u03C4 ${ye(n.trained.tau,3)} \xB7 top-1 ${He(n.trained.top1,1)}`},...i.nulls.map(y=>({key:y.key,ko:y.ko,en:y.name,trained:y.trained,note:y.trained?`\u03C4 ${ye(y.test?.tau,3)}`:"\uC544\uC9C1 \uD559\uC2B5\uD558\uC9C0 \uC54A\uC74C"}))];b.replaceChildren(...A.flatMap((y,_)=>{let E=k("a",{class:"list-row",href:"#/experiments"}),R=k("div",{class:`avatar${y.key==="C0"?" on":""}`},y.key),L=k("div",{class:"main"});L.append(k("b",{},`${y.ko} \xB7 ${y.en}`),k("span",{class:"num"},y.key==="C0"?`P ${i.model.P.toLocaleString()} \xB7 E ${i.model.E.toLocaleString()}`:"\uB9C8\uC2A4\uD06C\uB9CC \uC900\uBE44\uB428 \xB7 \uAC19\uC740 P"));let O=k("div",{class:"end"});return y.trained?O.append(k("b",{class:y.key==="C0"?"brand":""},y.note)):O.append(k("span",{class:"tag"},"\uBBF8\uD559\uC2B5"),k("span",{},"\uB300\uC870\uAD70")),E.append(R,L,O),_?[k("div",{class:"divider"}),E]:[E]})),b.appendChild(k("div",{class:"divider"}));let M=k("a",{class:"list-more",href:"#/experiments"},"\uC2E4\uD5D8 \uC804\uCCB4\uBCF4\uAE30");M.appendChild(Qs("i-chev",20)),b.appendChild(M);let T=document.getElementById("home-conclusion");T.innerHTML=`<div class="grow"><div class="title">\uC21C\uC704\uB294 \uBC30\uC6E0\uC9C0\uB9CC \uD310\uC744 \uC624\uB798 \uB04C\uC9C0\uB294 \uBABB\uD574\uC694</div>
    <div class="sub num">\uAC19\uC740 \uD14C\uC2A4\uD2B8 \uBD84\uD560\uC5D0\uC11C \uD559\uC2B5 \uC804 \u2192 \uD6C4\uB85C \uAD50\uC0AC \uCD5C\uC120 \uC120\uD0DD\uC774 ${He(n.untrained.top1,1)} \u2192 ${He(n.trained.top1,1)},
    \uC0C1\uB300 regret ${ye(n.untrained.relRegret,3)} \u2192 ${ye(n.trained.relRegret,3)} \uB85C \uC6C0\uC9C1\uC600\uC5B4\uC694 (\uC6B0\uC5F0\uC740 ${He(n.chance.top1,1)} \xB7 ${ye(n.chance.relRegret,3)}).
    \uADF8\uB7F0\uB370 \uC2E4\uC81C \uD50C\uB808\uC774\uB294 \uC870\uAC01 \uC911\uC559\uAC12 ${o.measured} \u2014 \uAD50\uC0AC ${o.teacher} \uC758 ${He(o.ratio,0)}\uC5D0 \uADF8\uCCD0\uC694. \uACB0\uC815\uB2F9 regret \uC774 \uAC8C\uC784 \uAE38\uC774\uC640 \uC815\uB82C\uB418\uC9C0 \uC54A\uB294\uB2E4\uB294 \uB73B\uC774\uACE0,
    \uAC8C\uC774\uD2B8 ${t.passCount}/${t.total} \uB85C \uBA48\uCD98 \uC0C1\uD0DC\uB97C \uADF8\uB300\uB85C \uBCF4\uC5EC\uC918\uC694. \uCEE4\uB125\uD1B0\uC5D0\uC11C \uC624\uB294 \uAC83\uC740 \uBC30\uC120(\uB9C8\uC2A4\uD06C ${i.model.E.toLocaleString()} \uAC04\uC120)\uBFD0\uC774\uACE0 \uAC00\uC911\uCE58 ${i.model.P.toLocaleString()}\uAC1C\uB294 \uD559\uC2B5\uB41C \uAC12\uC774\uC5D0\uC694.</div></div>
    <a class="link" href="#/compare">\uC870\uAC74 \uBE44\uAD50 \uBCF4\uAE30 <svg><use href="#i-chev"/></svg></a>`;let w=document.getElementById("home-graph-note");return w&&(w.textContent=`\uCEE4\uB125\uD1B0 3D \uB294 \uC804\uCCB4 ${i.model.N.toLocaleString()} \uB274\uB7F0 \uC911 ${e.nodes.length.toLocaleString()}\uAC1C\uB97C \uCE35\uD654 \uD45C\uBCF8\uC73C\uB85C \uBF51\uC544 \uADF8\uB824\uC694.`),{refresh:u}}var Il={done:["\uC644\uB8CC","tag-green"],interrupted:["\uD559\uC2B5 \uC911\uB2E8","tag-red"],"not-started":["\uBBF8\uD559\uC2B5","tag"]};function bp(i){let e=i.ranking,t=i.gate,n=[{key:"A4",kind:"stage7",condition:"C0",ko:"\uC2E4\uC81C \uBC30\uC120",en:"real connectome",name:`${i.phase} \uBCF8 \uD559\uC2B5`,state:"done",tau:e.trained.tau,top1:e.trained.top1,relRegret:e.trained.relRegret,pieces:i.play.gate20.piecesMedian,games:i.play.gate20.games,sub:`\uAD50\uC0AC ${i.teacher.variant} \xB7 DAgger ${i.data.hyper.daggerRounds} \uB77C\uC6B4\uB4DC \xB7 \uAC8C\uC774\uD2B8 ${t.passCount}/${t.total}`}];i.play.base50&&n.push({key:"B0",kind:"stage7",condition:"C0",ko:"\uC2E4\uC81C \uBC30\uC120",en:"real connectome",name:"Phase B \uD504\uB85C\uD1A0\uCF5C \uAE30\uC900\uC120",state:"done",tau:e.trained.tau,top1:e.trained.top1,relRegret:e.trained.relRegret,pieces:i.play.base50.piecesMedian,games:i.play.base50.games,sub:`\uB300\uC870\uAD70\uACFC \uC9DD\uC9C0\uC744 \uACF5\uC720 \uC2DC\uB4DC ${i.play.base50.games} \uAC8C\uC784 \xB7 \uC0AC\uB9DD \uC6D0\uC778 4\uC885`});for(let s of i.nulls)n.push({key:s.key,kind:"null",condition:s.key,ko:s.ko,en:s.name,name:"\uB300\uC870\uAD70",state:s.state,tau:s.test?.tau??null,top1:s.test?.top1??null,relRegret:s.test?.relRegret??null,pieces:s.play?.piecesMedian??null,games:s.play?.games??null,sub:s.maskBuilt?`\uB9C8\uC2A4\uD06C \uC900\uBE44\uB428 \xB7 P ${s.P?.toLocaleString()} (C0 \uC640 \uB3D9\uC77C)`:"\uB9C8\uC2A4\uD06C \uC5C6\uC74C",nullMeta:s});return n}function Sp(i){let e=document.getElementById("exp-table"),t=document.getElementById("exp-chips"),n=document.getElementById("exp-search"),s={filter:"all",q:""},r=bp(i),o=m=>{if(s.filter==="done"&&m.state!=="done"||s.filter==="todo"&&m.state==="done")return!1;if(!s.q)return!0;let p=`${m.key} ${m.condition} ${m.ko} ${m.en} ${m.name} ${m.sub}`.toLowerCase();return s.q.split(/\s+/).every(b=>p.includes(b))};function a(){let m={all:r.length,done:r.filter(b=>b.state==="done").length,todo:r.filter(b=>b.state!=="done").length},p=r.filter(o).length;t.replaceChildren(...[["all","\uC804\uCCB4"],["done","\uC644\uB8CC"],["todo","\uBBF8\uD559\uC2B5"]].map(([b,A])=>{let M=k("button",{class:"chip","aria-pressed":String(s.filter===b)},`${A} ${m[b]}`);return M.addEventListener("click",()=>{s.filter=b,l()}),M}),k("span",{class:"count num"},`${r.length}\uAC1C \uC911 ${p}\uAC1C \uBCF4\uB294 \uC911`))}function c(){let m=r.filter(o),p=k("div",{class:"thead"});p.append(k("div",{},"\uC2E4\uD589"),k("div",{},"\uC870\uAC74"),k("div",{class:"r"},"\uACB0\uC815 \uB0B4 \u03C4"),k("div",{class:"r"},"top-1"),k("div",{class:"r"},"\uC870\uAC01 \uC911\uC559\uAC12"),k("div",{class:"r"},"\uC0C1\uD0DC"));let b=document.createDocumentFragment();b.append(p,k("div",{class:"divider"})),m.length||b.appendChild(k("div",{class:"empty"},"\uC870\uAC74\uC5D0 \uB9DE\uB294 \uC2E4\uD589\uC774 \uC5C6\uC5B4\uC694")),m.forEach((A,M)=>{M&&b.appendChild(k("div",{class:"divider"}));let T=k("a",{class:"tr",href:`#/experiments/${A.key}`}),w=k("div",{class:"td-name"});w.append(k("b",{},`${A.ko} \xB7 ${A.name}`),k("span",{},A.sub));let y=A.state==="done",[_,E]=Il[A.state]??Il["not-started"];T.append(w,k("div",{class:"td-cond"},`${A.condition} ${A.en}`),k("div",{class:`r${A.condition==="C0"?" brand":y?"":" dim"}`},y?ye(A.tau,3):"\u2014"),k("div",{class:`r${y?"":" dim"}`},y?He(A.top1,1):"\u2014"),k("div",{class:`r${y?"":" dim"}`},A.pieces!==null&&A.pieces!==void 0?`${A.pieces}`:"\u2014"),(()=>{let R=k("div",{class:"td-status"});return R.appendChild(k("span",{class:`tag ${E}`},_)),R})()),b.appendChild(T)}),e.replaceChildren(b)}function l(){a(),c()}n.addEventListener("input",()=>{s.q=n.value.trim().toLowerCase(),l()}),l();let h=document.getElementById("exp-stage6");if(!i.stage6){h.hidden=!0;return}let u=i.stage6,d=k("details",{class:"card archive"});d.appendChild(k("summary",{},`\uC774\uC804 \uB2E8\uACC4 \u2014 6\uB2E8\uACC4 \uACE0\uC815 \uC2A4\uD30C\uC774\uD0B9 \uB9AC\uC800\uBC84 + \uD559\uC2B5 \uB9AC\uB4DC\uC544\uC6C3 (${u.conditions.length}\uAC1C \uC2E4\uD589, ${new Date(u.generatedAt).toLocaleDateString("ko-KR")})`)),d.appendChild(k("p",{class:"card-note"},`\uBC30\uC120\uACFC \uAC00\uC911\uCE58\uB97C \uBAA8\uB450 \uCEE4\uB125\uD1B0\uC5D0\uC11C \uAC00\uC838\uC640 \uACE0\uC815\uD558\uACE0 \uB9AC\uB4DC\uC544\uC6C3(${u.combo})\uB9CC \uD559\uC2B5\uD55C \uBCC4\uAC1C\uC758 \uC644\uACB0 \uC2E4\uD5D8\uC774\uC5D0\uC694. \uACB0\uC815 \uB0B4 \uC21C\uC704 \uC815\uBCF4\uAC00 \uC5C6\uB2E4\uB294 \uC74C\uC131 \uACB0\uACFC\uB85C \uB05D\uB0AC\uACE0, 7\uB2E8\uACC4\uB294 \uC5EC\uAE30\uC11C "\uAC00\uC911\uCE58\uB97C \uD559\uC2B5\uD55C\uB2E4"\uB85C \uBC14\uAFBC \uAC70\uC608\uC694. \uC0AD\uC81C\uD558\uC9C0 \uC54A\uACE0 \uADF8\uB300\uB85C \uB0A8\uACA8 \uB46C\uC694.`));let f=k("table",{class:"mini-table"});f.innerHTML='<thead><tr><th>\uC2E4\uD589</th><th>\uC870\uAC74</th><th class="r">\u03C4</th><th class="r">R\xB2</th><th class="r">\uC904 \uC911\uC559\uAC12</th><th class="r">\uC0C1\uD0DC</th></tr></thead>';let g=k("tbody");for(let m of u.conditions){let p=k("tr",{class:m.key==="C0"?"on":""});p.append(k("td",{},m.key),k("td",{},`${m.condition} ${m.name}`),k("td",{class:"r"},m.tau===null?"\u2014":ye(m.tau,3)),k("td",{class:"r"},m.r2===null?"\u2014":ye(m.r2,3)),k("td",{class:"r"},m.linesMedian===null?"\u2014":`${m.linesMedian}`),k("td",{class:"r"},m.region==="ok"?"\uC644\uB8CC":"\uB3D9\uC791 \uC601\uC5ED \uC5C6\uC74C")),g.appendChild(p)}f.appendChild(g);let x=k("div",{class:"table-wrap"});x.appendChild(f),d.appendChild(x),h.replaceChildren(d)}function wp(i,e){let n=bp(i).find(p=>p.key===e);if(!n)return!1;document.getElementById("exp-title").textContent=`${n.ko} \xB7 ${n.name}`;let[s,r]=Il[n.state]??Il["not-started"];document.getElementById("exp-status").replaceChildren(k("span",{class:`tag ${r}`},s)),document.getElementById("exp-params").textContent=`${n.condition} ${n.en} \xB7 N ${i.model.N.toLocaleString()} \xB7 E ${i.model.E.toLocaleString()} \xB7 P ${i.model.P.toLocaleString()} \xB7 T ${i.model.T}`,document.getElementById("exp-actions").replaceChildren((()=>{let p=k("a",{class:"btn btn-secondary",href:"https://github.com/stx4R/Fly#readme",target:"_blank",rel:"noopener"},"\uBCF4\uACE0\uC11C ");return p.appendChild(Qs("i-ext")),p})(),k("a",{class:"btn btn-primary",href:n.state==="done"?"#/versus":"#/compare"},n.state==="done"?"\uC774 \uBAA8\uB378\uACFC \uB300\uC804\uD558\uAE30":"\uC870\uAC74 \uBE44\uAD50\uC5D0\uC11C \uBCF4\uAE30"));let a=document.getElementById("exp-body"),c=(p,b)=>{let A=k("div",{class:"card"});A.appendChild(k("div",{class:"card-title"},p));let M=k("div",{class:"kv"});return b.forEach(([T,w,y],_)=>{_&&M.appendChild(k("div",{class:"divider"}));let E=k("div",{class:"row"}),R=k("div",{class:"grow"});R.appendChild(k("div",{class:"title"},T)),y&&R.appendChild(k("div",{class:"desc"},y)),E.append(R,k("div",{class:"val num"},w)),M.appendChild(E)}),A.appendChild(M),A},l=(p,b,A)=>{let M=k("div",{class:"card kpi"});return M.append(k("div",{class:"label"},p),k("div",{class:"value"},b),k("div",{class:"sub"},A)),M},h=[],u=k("div",{class:"card notice"});if(n.kind==="null"){let p=n.nullMeta;u.innerHTML=`<div class="grow"><div class="title">${p.key} ${p.name} \xB7 ${p.ko}</div><div class="sub">${p.desc} \uBD84\uB9AC\uD558\uB824\uB294 \uAC83: ${p.separatesWhat??"\u2014"}</div></div>`,h.push(u);let b=k("div",{class:"card tint"});return b.innerHTML=`<div class="card-title">\uC544\uC9C1 \uD559\uC2B5\uD558\uC9C0 \uC54A\uC558\uC5B4\uC694</div>
      <p>\uB9C8\uC2A4\uD06C\uB294 \uB9CC\uB4E4\uC5B4\uC838 \uC788\uACE0 sanity \uB3C4 \uD1B5\uACFC\uD588\uC9C0\uB9CC (${p.builtAt?new Date(p.builtAt).toLocaleString("ko-KR"):"\u2014"}), \uAC00\uC911\uCE58 \uD559\uC2B5\uC740 ${p.state==="interrupted"?`${p.startedAt?new Date(p.startedAt).toLocaleString("ko-KR"):""} \uC5D0 \uC2DC\uC791\uD588\uB2E4\uAC00 \uC911\uB2E8\uB410\uC5B4\uC694`:"\uC544\uC9C1 \uC2DC\uC791\uD558\uC9C0 \uC54A\uC558\uC5B4\uC694"}.
      \uADF8\uB798\uC11C \uC774 \uC870\uAC74\uC758 \u03C4 \xB7 top-1 \xB7 \uD50C\uB808\uC774 \uC218\uCE58\uB294 <b>\uC5C6\uC5B4\uC694</b>. \uC5C6\uB294 \uAC12\uC744 \uCD94\uC815\uD574\uC11C \uCC44\uC6B0\uC9C0 \uC54A\uC544\uC694.</p>`,h.push(b),h.push(c("\uB9C8\uC2A4\uD06C sanity (\uC2E4\uCE21)",[["\uD30C\uB77C\uBBF8\uD130 \uC218 P",`${p.P?.toLocaleString()??"\u2014"}`,`C0 \uC640 \uAC19\uC544\uC57C \uD574\uC694 (\uAE30\uB300 ${p.sanity?.expectedP?.toLocaleString()??"\u2014"})`],["\uB274\uB7F0 \xB7 \uAC04\uC120",`${p.N?.toLocaleString()??"\u2014"} \xB7 ${p.E?.toLocaleString()??"\u2014"}`,"C0 \uC640 \uB3D9\uC77C"],["\uCC28\uC218 \uBD84\uD3EC \uBCF4\uC874",p.sanity?.degreeIdentical===null?"\u2014":p.sanity?.degreeIdentical?"\uC608":"\uC544\uB2C8\uC624"],["\uC6D0\uBCF8 \uAC04\uC120 \uAD50\uC9D1\uD569",p.sanity?.edgeOverlapWithOriginal!=null?He(p.sanity.edgeOverlapWithOriginal,2):"\u2014",p.sanity?.chanceOverlap!=null?`\uC6B0\uC5F0 \uC218\uC900 ${He(p.sanity.chanceOverlap,2)}`:""]])),a.replaceChildren(...h),!0}let d=i.ranking,f=n.key==="B0"?i.play.base50:i.play.gate20;u.innerHTML=`<div class="grow"><div class="title">${n.condition} ${n.en} \xB7 ${n.name}</div>
    <div class="sub">\uCEE4\uB125\uD1B0\uC5D0\uC11C \uC624\uB294 \uAC83\uC740 \uBC30\uC120(\uD76C\uC18C\uC131 \uB9C8\uC2A4\uD06C ${i.model.E.toLocaleString()} \uAC04\uC120)\uBFD0\uC774\uACE0, \uB9C8\uC2A4\uD06C\uAC00 1\uC778 \uC790\uB9AC\uC758 \uAC00\uC911\uCE58 ${i.model.P.toLocaleString()}\uAC1C\uB294 \uD559\uC2B5\uB41C \uAC12\uC774\uC5D0\uC694.
    \uAD50\uC0AC\uB294 ${i.teacher.label}, \uD559\uC2B5 \uB370\uC774\uD130\uB294 \uACB0\uC815 ${i.data.trainDecisions.toLocaleString()}\uAC1C\uC608\uC694. ${n.sub}</div></div>`,h.push(u);let g=k("div",{class:"kpis"});if(g.append(l("\uACB0\uC815 \uB0B4 \uCF04\uB2EC \u03C4",ye(d.trained.tau,3),`CI ${d.trained.tauCI?`[${ye(d.trained.tauCI[0],3)}, ${ye(d.trained.tauCI[1],3)}]`:"\u2014"} \xB7 \uD14C\uC2A4\uD2B8 \uACB0\uC815 ${d.decisions.toLocaleString()}\uAC1C`),l("top-1",He(d.trained.top1,1),`CI [${He(d.trained.top1CI[0],1)}, ${He(d.trained.top1CI[1],1)}] \xB7 \uC6B0\uC5F0 ${He(d.chance.top1,1)}`),l("\uC0C1\uB300 regret",ye(d.trained.relRegret,3),`\uD559\uC2B5 \uC804 ${ye(d.untrained.relRegret,3)} \xB7 \uC6B0\uC5F0 ${ye(d.chance.relRegret,3)}`),l("\uC870\uAC01 \uC911\uC559\uAC12",`${f.piecesMedian}`,`${f.games} \uAC8C\uC784 \xB7 CI [${ye(f.piecesMedianCI?.[0],0)}, ${ye(f.piecesMedianCI?.[1],0)}] \xB7 \uAD50\uC0AC ${i.teacher.play.piecesMedian}`)),h.push(g),n.key==="A4"){let p=i.gate,b=k("div",{class:"card"});b.appendChild(k("div",{class:"card-title"},`\uAC8C\uC774\uD2B8 ${p.passCount} / ${p.total} \u2014 \uAD50\uC0AC \uB300\uBE44 \uAE30\uC900`));let A=k("div",{class:"kv"});if(p.criteria.forEach((M,T)=>{T&&A.appendChild(k("div",{class:"divider"}));let w=k("div",{class:"row"}),y=k("div",{class:"grow"});y.append(k("div",{class:"title"},M.label),k("div",{class:"desc"},`${M.desc}${M.teacher!=null?` \xB7 \uAD50\uC0AC ${ye(M.teacher,1)}`:""}`)),w.append(y,k("div",{class:"val num"},`${ye(M.measured,3)} ${M.lower?"\u2264":"\u2265"} ${ye(M.threshold,2)}`),k("span",{class:`tag ${M.passed?"tag-green":"tag-red"}`},M.passed?"\uD1B5\uACFC":"\uBBF8\uB2EC")),A.appendChild(w)}),b.append(A,k("p",{class:"card-note"},"\uC870\uAC01\uACFC \uACF5\uACA9\uC774 \uAD50\uC0AC \uB300\uBE44 \uAE30\uC900\uC5D0 \uBABB \uBBF8\uCCD0 \uC5EC\uAE30\uC11C \uBA48\uCDC4\uC5B4\uC694. \uC21C\uC704 \uC9C0\uD45C\uB294 \uC62C\uB790\uB294\uB370 \uD50C\uB808\uC774 \uAE38\uC774\uB294 \uB530\uB77C\uC624\uC9C0 \uC54A\uC558\uB2E4\uB294 \uB73B\uC774\uC5D0\uC694.")),h.push(b),i.rounds.length){let M=k("div",{class:"card"});M.appendChild(k("div",{class:"card-title"},`DAgger \uB77C\uC6B4\uB4DC ${i.rounds.length}\uAC1C`));let T=k("table",{class:"mini-table"});T.innerHTML='<thead><tr><th>\uB77C\uC6B4\uB4DC</th><th class="r">\uC0C1\uB300 regret</th><th class="r">top-1</th><th class="r">\u03C4</th><th class="r">\uBE60\uB978 \uD50C\uB808\uC774 \uC870\uAC01</th><th class="r">\uC815\uCC45 \uC77C\uCE58\uC728</th></tr></thead>';let w=k("tbody");for(let _ of i.rounds){let E=k("tr");E.append(k("td",{},`r${_.round}`),k("td",{class:"r"},ye(_.relRegret,4)),k("td",{class:"r"},He(_.top1,1)),k("td",{class:"r"},ye(_.tau,3)),k("td",{class:"r"},`${_.quickPiecesMedian}`),k("td",{class:"r"},_.onPolicyAgreement==null?"\u2014":He(_.onPolicyAgreement,1))),w.appendChild(E)}T.appendChild(w);let y=k("div",{class:"table-wrap"});y.appendChild(T),M.append(y,k("p",{class:"card-note"},"\uC21C\uC704 \uC9C0\uD45C(regret\xB7top-1)\uB294 \uB77C\uC6B4\uB4DC\uB97C \uAC70\uCE58\uBA70 \uC870\uAE08\uC529 \uC88B\uC544\uC9C0\uC9C0\uB9CC \uBE60\uB978 \uD50C\uB808\uC774\uC758 \uC870\uAC01 \uC218\uB294 \uB530\uB77C \uC624\uB974\uC9C0 \uC54A\uC544\uC694.")),h.push(M)}}if(n.key==="B0"&&i.play.deaths50){let p=i.play.deaths50,b=k("div",{class:"card"});b.appendChild(k("div",{class:"card-title"},`\uC0AC\uB9DD \uC6D0\uC778 ${p.total} \uAC8C\uC784`));let A=k("div",{class:"kv"}),M={garbage:"\uAC00\uBE44\uC9C0\uC5D0 \uB20C\uB9BC","well-fill":"\uC6B0\uBB3C\uC744 \uC2A4\uC2A4\uB85C \uBA54\uC6C0",holes:"\uAD6C\uBA4D \uB204\uC801",stack:"\uC2A4\uD0DD\uC774 \uCC9C\uC7A5\uAE4C\uC9C0"};Object.entries(p.counts).forEach(([T,w],y)=>{y&&A.appendChild(k("div",{class:"divider"}));let _=k("div",{class:"row"}),E=k("div",{class:"grow"});E.appendChild(k("div",{class:"title"},M[T]??T)),_.append(E,k("div",{class:"val num"},`${w} / ${p.total} (${He(w/p.total,0)})`)),A.appendChild(_)}),b.append(A,k("p",{class:"card-note"},`\uC0DD\uC874 ${He(f.survival,0)} \xB7 \uAC00\uBE44\uC9C0 \uC0AC\uB9DD \uBE44\uC728 ${He(p.garbageDeathShare,0)} \xB7 hold \uC0AC\uC6A9 ${ye(i.play.holdsPerPiece.student50,3)}/\uC870\uAC01 (\uAD50\uC0AC ${ye(i.play.holdsPerPiece.teacher,3)}).`)),h.push(b)}let x=i.weights,m=k("div",{class:"detail-grid"});return m.append(c("\uD50C\uB808\uC774",[["\uAC8C\uC784 \uC218",`${f.games}`,`\uC0C1\uD55C ${i.play.gate20.games===f.games,"1000"} \uC870\uAC01`],["\uC870\uAC01 \uC911\uC559\uAC12",`${f.piecesMedian}`,`\uC0AC\uBD84\uC704 ${f.piecesQuartiles?.join(" \xB7 ")??"\u2014"}`],["\uACF5\uACA9 \uC911\uC559\uAC12",`${f.attackMedian}`,`1000 \uC870\uAC01\uB2F9 ${ye(f.attackPer1000,1)}`],["\uD14C\uD2B8\uB9AC\uC2A4",`${f.tetrises}\uD68C`,`\uC911\uC559\uAC12 ${f.tetrisMedian} \xB7 \uC904 \uC810\uC720 ${He(f.tetrisLineShare,1)}`],["\uC0DD\uC874\uC728",He(f.survival,0),`\uBB34\uC791\uC704 \uBC30\uCE58 \uAE30\uC900\uC120 \uC870\uAC01 ${i.play.random?.piecesMedian??"\u2014"}`]]),c("\uBC30\uC120\uC774 \uD559\uC2B5\uC73C\uB85C \uC6C0\uC9C1\uC778 \uC815\uB3C4",[["corr(\uCD08\uAE30, \uCD5C\uC885)",ye(x.corr,3),"\uCD08\uAE30\uAC12\uC740 \uCEE4\uB125\uD1B0 \uC2DC\uB0C5\uC2A4 \uC218\uB97C \uC815\uADDC\uD654\uD55C \uAC12\uC774\uC5D0\uC694"],["\uD3C9\uADE0 |\u0394w|",ye(x.meanAbsDelta,4),`\uCD08\uAE30 \uD3C9\uADE0 \uAC00\uC911\uCE58 ${ye(x.meanInit,5)}`],["\uC5B5\uC81C\uC131 \uBE44\uC728",He(x.inhibitoryFrac,1),"\uCEE4\uB125\uD1B0 \uAC00\uC911\uCE58\uB294 \uC804\uBD80 \uC591\uC218\uB77C \uCD08\uAE30\uC5D0\uB294 0%\uC600\uC5B4\uC694"],["\u2016W\u2016",`${ye(x.normInit,2)} \u2192 ${ye(x.normFinal,2)}`],["W_in \uBCF4\uB4DC \uC5F4 corr",ye(x.input.board.corr,3),"3\uB2E8\uACC4 \uAC00\uC6B0\uC2DC\uC548 RF \uCD08\uAE30\uAC12 \uB300\uBE44"]]),c("\uB370\uC774\uD130 \xB7 \uD558\uC774\uD37C",[["\uD559\uC2B5 \uACB0\uC815",i.data.trainDecisions.toLocaleString(),`\uAC80\uC99D ${i.data.valDecisions.toLocaleString()} \xB7 \uD14C\uC2A4\uD2B8 ${i.data.testDecisions.toLocaleString()}`],["\uC190\uC2E4",`${i.data.hyper.loss} (\u03BB ${i.data.hyper.lambda}, \u03BC ${i.data.hyper.mu})`,`K ${i.data.hyper.K} \xB7 DAgger ${i.data.hyper.daggerRounds}`],["\uC815\uADDC\uD654",`dropout ${i.data.hyper.dropoutZ} / ${i.data.hyper.dropoutH}`,`weight decay ${i.data.hyper.weightDecay}`],["\uC218\uC9D1 \uD30C\uC77C",i.data.dataFile],["\uAC78\uB9B0 \uC2DC\uAC04",`${ye(i.elapsedHours,2)} h`,new Date(i.ranAt).toLocaleString("ko-KR")]]),c("\uBAA8\uB378",[["\uB274\uB7F0 \xB7 \uAC04\uC120",`${i.model.N.toLocaleString()} \xB7 ${i.model.E.toLocaleString()}`],["\uC785\uB825 \xB7 \uCD9C\uB825",`${i.model.nInput.toLocaleString()} \xB7 ${i.model.nOutput}`,"LC/LPLC \u2192 DN"],["\uD30C\uB77C\uBBF8\uD130 P",i.model.P.toLocaleString(),`W ${i.model.sizes.W.toLocaleString()} \xB7 W_in ${i.model.sizes.Win.toLocaleString()} \xB7 b ${i.model.sizes.b.toLocaleString()} \xB7 \uB9AC\uB4DC\uC544\uC6C3 ${i.model.sizes.readout.toLocaleString()}`],["\uCC3D T \xB7 \u03C1_unit",`${i.model.T} \xB7 ${ye(i.model.rhoUnit,4)}`]])),h.push(m),a.replaceChildren(...h),!0}function Jv(i=location.hash){let e=i.replace(/^#\/?/,""),[t,n=""]=e.split("?"),s=t.split("/").filter(Boolean),r=Object.fromEntries(new URLSearchParams(n));return{segs:s,params:r,page:s[0]||"home"}}function Ep(i,{onChange:e}={}){let t=[...document.querySelectorAll(".page")],n=[...document.querySelectorAll(".nav a[data-route]")],s=null;function r(a){for(let h of t)h.hidden=h.id!==a;let c=document.getElementById(a),l=c?.dataset.page;for(let h of n)h.dataset.route===l?h.setAttribute("aria-current","page"):h.removeAttribute("aria-current");return document.title="Fly",c}function o(){let a=Jv(),l=(i[a.page]??i.home)(a)??"page-home",h=s;s=l,r(l),scrollTo({top:0,behavior:"instant"}),e?.(l,h,a)}return addEventListener("hashchange",o),o(),{resolve:o,get current(){return s}}}var Tp=matchMedia("(max-width: 767px)").matches||(navigator.hardwareConcurrency??8)<=4;if(location.search.includes("debug")){let i=document.createElement("pre");i.id="debug-log",document.body.appendChild(i);let e=`
`,t=(n,s)=>{i.textContent+=`[${n}] ${s.map(r=>r instanceof Error?`${r.message} ${r.stack}`:typeof r=="string"?r:JSON.stringify(r)).join(" ")}`+e};for(let n of["error","warn"]){let s=console[n].bind(console);console[n]=(...r)=>{t(n,r),s(...r)}}addEventListener("error",n=>t("uncaught",[n.message,n.filename,n.lineno])),addEventListener("unhandledrejection",n=>t("rejection",[String(n.reason?.stack??n.reason)])),addEventListener("load",()=>setTimeout(()=>{i.textContent+=`[ready] viewport ${innerWidth} scrollWidth ${document.documentElement.scrollWidth}`+e},3e3))}var ru=globalThis.__BUILD__??"",jv=ru?`?v=${ru}`:"";async function Ap(i){let e=await fetch(`data/${i}.json${jv}`);if(!e.ok)throw new Error(`${i}.json ${e.status}`);return e.json()}function Qv(i,e){let t=e.nodes.filter(r=>r.layer==="hidden"&&r.isKC).length,n={"m.N":i.model.N.toLocaleString(),"m.E":i.model.E.toLocaleString(),"m.P":i.model.P.toLocaleString(),"m.T":`${i.model.T}`,"m.nOut":`${i.model.nOutput}`,"m.phase":i.phase,"gate.pass":`${i.gate.passCount}/${i.gate.total}`,"rank.tau":ye(i.ranking.trained.tau,3),"rank.top1":He(i.ranking.trained.top1,1),"rank.regret":ye(i.ranking.trained.relRegret,3),"play.pieces":`${i.play.gate20.piecesMedian}`,"teacher.pieces":`${i.teacher.play.piecesMedian}`,"graph.nodes":e.nodes.length.toLocaleString(),"graph.edges":e.edges.length.toLocaleString(),"graph.input":`${e.meta.counts.input}`,"graph.hidden":`${e.meta.counts.hidden}`,"graph.output":`${e.meta.counts.output}`,"graph.kcPct":`${(100*t/e.meta.counts.hidden).toFixed(1)}%`};document.querySelectorAll("[data-num]").forEach(r=>{let o=r.dataset.num;o in n&&(r.textContent=n[o])});let s=document.getElementById("settings-generated");s&&(s.textContent=new Date(i.generatedAt).toLocaleString("ko-KR",{dateStyle:"medium",timeStyle:"short"}))}function eM(){let i=document.getElementById("settings-tuning"),e=Object.entries(mp).flatMap(([n,s],r)=>{let o=k("div",{class:"row lg"}),a=k("div",{class:"grow"});a.append(k("div",{class:"title"},s.label),k("div",{class:"desc"},s.desc));let c=k("div",{class:"slider"}),l=k("input",{type:"range",min:String(s.min),max:String(s.max),step:String(s.step),"data-tune":n,"aria-label":s.label});return c.append(k("output",{id:`${n}-out`,class:"num"}),l),o.append(a,c),r?[k("div",{class:"divider"}),o]:[o]});i.replaceChildren(...e),document.getElementById("settings-keys").replaceChildren(...gp.map(([n,s])=>{let r=k("span");for(let o of n)r.appendChild(k("kbd",{},o));return r.appendChild(k("em",{},s)),r}))}async function tM(){let[i,e]=await Promise.all([Ap("graph-viz"),Ap("stage7")]);Qv(e,i),eM(),await Df();let t=null,n=null,s=null,r=_p((p,b)=>{p==="autoRotate"&&t?.setAutoRotate(b),p==="darkViz"&&(t?.setTheme(b?"dark":"light"),document.getElementById("connectome-canvas")?.classList.toggle("dark",b))});s=Mp(e,i),Sp(e),vp(e);let o=document.getElementById("connectome-canvas");o.classList.toggle("dark",!!r.darkViz);try{t=Tf(o,i,{mobile:Tp,theme:r.darkViz?"dark":"light",autoRotate:r.autoRotate})}catch(p){console.warn("3D unavailable",p)}let a=document.getElementById("connectome-hint");if(!t)document.getElementById("connectome-fallback").hidden=!1,document.getElementById("connectome-controls").querySelectorAll("input, select").forEach(p=>{p.disabled=!0});else{let p=[...new Set(i.nodes.map(A=>A.roi).filter(Boolean))].sort(),b=document.getElementById("roi-filter");for(let A of p)b.appendChild(k("option",{value:A},A));b.addEventListener("change",()=>t.setRoi(b.value)),document.getElementById("kc-toggle").addEventListener("change",A=>t.setKC(A.target.checked)),document.getElementById("edge-toggle").addEventListener("change",A=>t.setEdges(A.target.checked)),document.getElementById("shell-toggle").addEventListener("change",A=>t.setShell(A.target.checked));for(let A of(Tp?["\uBAA8\uBC14\uC77C: \uC911\uAC04\uCE35 1/3 \xB7 \uC2DC\uB0C5\uC2A4 2,000"]:[]).concat(["\uB4DC\uB798\uADF8 \uD68C\uC804","\uD720 \uD655\uB300"]))a.appendChild(k("span",{class:"tag"},A))}try{n=Af(document.getElementById("hero-canvas"))}catch(p){console.warn("hero 3D unavailable",p)}let c=i.nodes.filter(p=>p.layer==="output").map(p=>p.type),l=zf(i,t),h=Bf(p=>{l.setDecision(p),f(p)});h.setDnTypes(c),l.bindControls(document.getElementById("act-play")),l.bindControls(document.getElementById("connectome-play"));let u=Vf(),d=Hf(e);function f(p){let b=document.getElementById("connectome-decision"),A=document.getElementById("connectome-empty"),M=document.getElementById("connectome-play");if(!b)return;if(A&&(A.hidden=!!p),M&&(M.hidden=!p),!p){b.hidden=!0,b.replaceChildren(),A&&A.replaceChildren(Rf({desc:"\uC544\uB798 3D \uB294 \uCEE4\uB125\uD1B0 \uC790\uCCB4(\uBC30\uC120)\uC608\uC694. \uC5EC\uAE30\uC5D0 \uC810\uB4F1\uD560 \uB274\uB7F0 \uD65C\uC131\uC740 \uB300\uC804\uC5D0\uC11C \uCD08\uD30C\uB9AC\uAC00 \uC218\uB97C \uB458 \uB54C \uC0DD\uACA8\uC694.",cta:"\uB300\uC804\uD558\uAE30",href:"#/versus",hint:"\uD55C \uD310 \uB450\uBA74 \uACB0\uC815\uB9C8\uB2E4 25 \uC2A4\uD15D\uC758 \uD65C\uC131\uC744 \uC7AC\uC0DD\uD560 \uC218 \uC788\uC5B4\uC694"}));return}b.hidden=!1;let T=p.trace;b.innerHTML=`<div class="card-title">\uC9C0\uAE08 \uC7AC\uC0DD \uC911\uC778 \uACB0\uC815</div>
      <div class="card-sub num">\uC870\uAC01 ${p.pieces+1}\uBC88\uC9F8 \xB7 \uD6C4\uBCF4 ${p.candidates.length}\uAC1C \xB7 \uC0DD\uAC01 ${p.ms} ms</div>
      <p class="card-note num">\uD45C\uBCF8 ${T?T.n.toLocaleString():"\u2014"} \uB274\uB7F0 \xB7 \uCC3D ${T?T.T:e.model.T} \uC2A4\uD15D \xB7 \uD65C\uC131 \uBC94\uC704 ${T?`${ye(T.min,3)} ~ ${ye(T.max,3)}`:"\u2014"}.
      \uC810\uC758 \uD06C\uAE30\uC640 \uC0C9\uC774 \uADF8 \uC2A4\uD15D\uC758 |\uD65C\uC131| \uC138\uAE30\uC608\uC694.</p>`}let g=yp({settings:r,sampled:i.nodes.map(p=>p.i),build:ru,onRecord:()=>{m()}}),x=0;function m(){x||(x=setTimeout(()=>{x=0,s.refresh(),h.refresh(),u.refresh(),d.refresh()},400))}Lf(()=>m()),h.render(),u.render(),d.render(),h.decision||(l.setDecision(null),f(null)),Ep({home:()=>"page-home",versus:()=>"page-versus",matches:()=>"page-matches",connectome:()=>"page-connectome",decision:()=>"page-decision",activity:()=>"page-activity",analysis:()=>"page-analysis",experiments:({segs:p})=>p[1]&&wp(e,p[1])?"page-experiment":"page-experiments",compare:()=>"page-compare",settings:()=>"page-settings"},{onChange(p){p==="page-connectome"?t?.resume():t?.pause(),p==="page-home"?n?.resume():n?.pause(),p==="page-versus"?g.activate():g.deactivate(),p==="page-activity"&&l.redraw(),p==="page-decision"&&h.refresh(),p==="page-matches"&&u.refresh(),p==="page-analysis"&&d.refresh()}})}tM().catch(i=>{console.error(i);let e=k("div",{class:"card",style:"margin:24px;color:var(--red-500);font-weight:600"},`\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD588\uC5B4\uC694: ${i.message}`);document.querySelector(".content").prepend(e),document.querySelectorAll(".page").forEach(t=>{t.hidden=!0})});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
