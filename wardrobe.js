window.SpriteWorld=(()=>{
 const bg=new Image();bg.src=location.search.includes('author=1')?'assets/parts-v1/backgrounds.png':'assets/rig-v3/backgrounds.webp';
 const ready=Promise.all([new Promise((ok,no)=>{bg.onload=ok;bg.onerror=no}),fetch('data/visual-rules.json').then(r=>r.json()),location.search.includes('author=1')?Promise.resolve():SpriteRig.loadAtlas()]);let rules;
 ready.then(([,r])=>rules=r);
 function pick(a,n){return a[(n>>>0)%a.length]}
 function choose(result,world,role){const w=rules.worlds[Number(world.id.slice(1))];const r=Number(role.id.slice(1)),seed=result.seed>>>0;const candidates=w.clothes[r]||[rules.roleClothes[r]];const outfit=pick(candidates,seed);const hats=rules.clothesHeads[outfit]||w.hair;
 return{world:world.id,role:role.id,sex:result.sex,tone:(seed>>>8)%4,hair:pick(hats,seed>>>4),clothes:outfit,tool:pick(w.tools[r]||[rules.roleTools[r]],seed>>>12),gear:[0,1,2,10].includes(r)?'bag':[7,8].includes(r)?'cape':'none',background:w.bgByRole?.[r]??w.bg,backgroundUse:rules.backgrounds[w.bgByRole?.[r]??w.bg],outfitSource:w.clothes[r]?'세계관·직업 후보':'공통 직업 후보',hairSource:rules.clothesHeads[outfit]?'의상 호환 후보':'세계관 공통 후보'} }
 const backs=new Map();
 function background(id){if(!backs.has(id)){const b=document.createElement('canvas');b.width=256;b.height=192;const c=b.getContext('2d');c.imageSmoothingEnabled=false;c.drawImage(bg,(id%4)*(bg.width/4),Math.floor(id/4)*(bg.height/3),bg.width/4,bg.height/3,0,0,256,192);backs.set(id,b)}return backs.get(id)}
 function paint(canvas,result,world,role){const p=choose(result,world,role);canvas.width=256;canvas.height=192;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.drawImage(background(p.background),0,0);const sprite=SpriteRig.compose(p);c.drawImage(sprite,96,66);canvas.dataset.parts=JSON.stringify(p);return p}
 return{background,ready,choose,paint};
})();
