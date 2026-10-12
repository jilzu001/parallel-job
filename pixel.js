/* Original reusable pixel layers. Coordinates share a 160 x 108 canvas.
 * No pre-rendered occupation images: scenery, body, hair, clothes and tools
 * are drawn independently and assembled for each saved character. */
window.PixelCard=(()=>{
 const palettes={inn:['#704b39','#c99a63','#245b60'],castle:['#596e72','#c3b790','#397165'],library:['#574b5d','#bc9974','#52638a'],space:['#172c46','#73899b','#377e98'],neon:['#252947','#5a4978','#b34878'],ruins:['#5c665e','#a49871','#64774b'],city:['#66807f','#cbb697','#386f73'],machine:['#555c61','#bca478','#9e6037'],forest:['#325c4b','#b9ab74','#497e5a'],sea:['#386a83','#d3b57d','#347c82'],desert:['#94664d','#d6b080','#a8583f']};
 function rng(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296}}
 function paint(canvas,result){canvas.width=160;canvas.height=108;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;const rand=rng(result.seed), p=palettes[result.scene]||palettes.inn;const rect=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),w,h)};const line=(x,y,w,color)=>rect(x,y,w,1,color);const dark='#182f36';
 // Background layer: eleven reusable locations, fixed horizon and character anchors.
 rect(0,0,160,108,p[0]);rect(0,70,160,38,p[1]);for(let y=74;y<108;y+=9){line(0,y,160,'#554a3d');for(let x=(y%2)*8;x<160;x+=24)rect(x,y,1,9,'#7f7055')}
 const wall=()=>{for(let y=0;y<70;y+=12){line(0,y,160,'#273e45');for(let x=(y%24?8:0);x<160;x+=24)rect(x,y,1,12,'#31464b')}};
 if(['castle','ruins','desert'].includes(result.scene)){wall();rect(101,15,30,55,dark);rect(105,19,22,50,'#283d41');rect(107,21,4,43,'#354e50');rect(10,58,24,15,'#727c6a');if(result.scene==='ruins'){rect(29,20,14,52,'#7e8270');rect(28,18,18,5,p[1]);rect(8,80,11,4,'#474f48')}}
 if(['inn','library','machine'].includes(result.scene)){for(let x=0;x<160;x+=20){rect(x,0,3,70,dark);rect(x+3,0,1,70,'#a4774e')}rect(7,10,40,45,dark);rect(10,13,34,37,'#354c51');rect(26,13,3,37,p[1]);rect(10,30,34,3,p[1]);rect(93,13,54,42,dark);for(let y=17;y<50;y+=15){rect(97,y+10,46,3,p[1]);for(let x=98;x<141;x+=7)rect(x,y,5,10,['#934d40','#b89c66','#557574'][Math.floor(rand()*3)])}rect(98,57,54,12,'#b7824b');rect(98,68,3,25,dark);rect(145,68,3,25,dark);rect(100,61,49,2,'#e0b477');if(result.scene==='inn'){rect(107,53,12,4,'#e7cf92');rect(137,49,3,7,'#e4b55d');rect(137,46,3,4,'#f5d177')}}
 if(['space','neon','city'].includes(result.scene)){rect(8,9,58,46,dark);rect(11,12,52,40,result.scene==='city'?'#a3c8bc':'#15223e');for(let i=0;i<20;i++)rect(13+rand()*47,14+rand()*32,1,1,'#cfdbbe');for(let x=18;x<59;x+=11){const h=8+Math.floor(rand()*23);rect(x,49-h,8,h,result.scene==='city'?'#637f81':'#2d3e60');rect(x+2,51-h,2,4,'#d5ba74')}rect(102,29,42,29,dark);rect(105,32,36,23,'#3d6268');for(let y=37;y<50;y+=5)rect(110,y,20,1,'#8fbca3');rect(119,58,7,12,dark);rect(97,70,53,5,'#536268');if(result.scene==='neon'){rect(73,12,3,40,'#db7488');rect(78,14,20,4,'#58a9a5')}}
 if(['forest','sea'].includes(result.scene)){rect(0,0,160,70,'#abc5ae');if(result.scene==='sea'){rect(0,31,160,40,'#528b9a');for(let y=35;y<67;y+=8)line(0,y,160,'#7cacb2');rect(108,50,4,32,dark);rect(103,54,14,3,'#bb9059')}else{for(const x of [7,30,121,146]){rect(x,30,5,43,'#78563c');rect(x-10,10,26,23,'#386752');rect(x-7,7,19,30,'#43785d');rect(x-4,9,12,14,'#568d68')}rect(10,77,21,8,'#4e7550');rect(131,78,25,9,'#5c8052')}}
 // Back accessory layer.
 const outfit=p[2],skin=['#eac49a','#d9a77c','#a87553','#815940'][Math.floor(rand()*4)];
 rect(61,52,13,26,dark);rect(64,54,10,23,'#8e693f');rect(65,56,2,14,'#c69d5d');
 // Body/legs layer: sex is a random character setting, never a stat input.
 const female=result.sex==='여성';rect(71,81,8,14,dark);rect(84,81,8,14,dark);rect(68,94,12,4,dark);rect(84,94,12,4,dark);
 rect(69,50,25,32,dark);rect(71,53,21,26,outfit);rect(74,55,5,23,'#79a9a1');rect(85,54,5,25,'#25515b');rect(79,55,5,24,'#e2cd9d');rect(70,76,23,4,'#3b4541');rect(78,76,5,3,'#e5b75d');if(female){rect(68,78,27,7,outfit);rect(73,78,5,7,'#7bafa1')}
 // Head + hair layers: interchangeable palettes and four silhouettes.
 const hair=['#252d32','#5a3b2e','#b18043','#ded5b2'][Math.floor(rand()*4)],style=Math.floor(rand()*4);
 if(style===1||female){rect(69,31,25,25,dark);rect(70,32,23,22,hair)}
 rect(73,32,18,20,dark);rect(75,34,14,16,skin);rect(73,40,3,6,skin);rect(88,40,3,6,skin);rect(76,32,12,5,hair);rect(72,33,6,8,hair);rect(86,32,6,6,hair);rect(79,30,11,4,hair);rect(78,42,2,2,dark);rect(86,42,2,2,dark);rect(83,48,3,1,'#875249');
 if(style===2){rect(69,32,26,4,dark);rect(74,25,17,8,dark);rect(75,27,15,5,outfit);rect(75,31,15,2,'#d1a65a')}
 if(style===3){rect(84,23,5,9,hair);rect(87,24,5,4,hair)}
 // Arms and shared hand anchors.
 rect(64,56,7,16,dark);rect(65,58,5,11,outfit);rect(65,69,6,6,skin);rect(92,55,7,14,dark);rect(93,57,5,9,outfit);rect(96,66,5,6,skin);
 // Equipment layer: one reusable silhouette per role.
 const tool=result.tool||'ledger';const x=104,y=64;
 if(tool==='sword'){rect(x,y-27,3,32,'#dfdbc1');rect(x-3,y+3,10,3,'#c39c51');rect(x,y+6,3,7,'#775239')}
 if(tool==='map'||tool==='scroll'||tool==='ledger'||tool==='board'){rect(x-3,y-7,17,17,dark);rect(x-2,y-6,15,14,'#e7d3a0');rect(x+2,y-4,1,11,'#af8250');for(let i=0;i<3;i++)rect(x+5,y-3+i*4,6,1,'#745d49');if(tool==='map')rect(x+8,y,3,3,'#b16c48')}
 if(tool==='wrench'||tool==='hammer'){rect(x,y-9,3,21,'#cfbc8e');rect(x-4,y-14,11,7,'#869c9c');if(tool==='wrench')rect(x-1,y-15,4,4,p[0]);rect(x-3,y-7,7,3,dark)}
 if(tool==='vial'||tool==='medicine'||tool==='crystal'){rect(x,y-8,8,15,dark);rect(x+1,y-6,6,11,tool==='crystal'?'#b58dc6':'#75a38b');rect(x+2,y-11,4,4,'#b39465');rect(x+2,y-4,2,6,'#d7e0c5');if(tool==='medicine'){rect(x+1,y,6,2,'#eee0ad');rect(x+3,y-2,2,6,'#eee0ad')}}
 if(tool==='seal'){rect(x-3,y-5,13,13,'#b65f49');rect(x-1,y-3,9,9,'#e5bd77');rect(x+2,y,3,3,'#984c38')}
 if(tool==='music'){rect(x+4,y-17,2,24,'#d7b977');rect(x-1,y-1,10,13,'#aa794e');rect(x+2,y+2,4,5,dark)}
 // Foreground props and tiny animated-looking (but static) effect parts.
 rect(16,88,21,13,'#5b4235');rect(18,90,17,2,'#aa8553');rect(18,100,3,5,dark);rect(31,100,3,5,dark);
 for(let i=0;i<3;i++){let sx=56+Math.floor(rand()*48),sy=16+Math.floor(rand()*10);rect(sx,sy,1,3,'#e6d18e');rect(sx-1,sy+1,3,1,'#e6d18e')}
 return canvas;
 }
 return{paint,palettes};
})();
