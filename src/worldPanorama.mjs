var pano = null;
var timeout;

export function setup(ctx) {
  const assets = ctx.assets;
  const geometry = new THREE.SphereBufferGeometry(5000, 60, 40);
  geometry.scale( 1, -1, 1 );
  assets['pano1'].encoding = THREE.sRGBEncoding;
  const material = new THREE.MeshBasicMaterial( { map: assets['pano1'] } );
  pano = new THREE.Mesh(geometry, material);

}

export function enter(ctx) {
  ctx.renderer.setClearColor(0x000000);
  ctx.scene.add(pano);
  timeout = null;
}

export function exit(ctx) {
  ctx.scene.remove(pano);
}

export function execute(ctx, delta, time) {
  if (timeout == null) { timeout = time; }
  else if (time - timeout > 3) {
    console.log(ctx.camera.position);
    ctx.camera.position.set(1.5, 1.6, 2.3);
    ctx.goto = 'hall';
  }
}
