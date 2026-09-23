# 대전 화면의 두드리는 초파리: Flytris_tapping.blend → public/models/fly_tapping.glb (Blender 4.5 에서 실행).
#
#   blender -b Flytris_tapping.blend --python scripts/export-fly-tapping.py -- public/models/fly_tapping.glb [fly_ratio 0.15] [pad_ratio 0.12]
#
# 원본은 초파리 18.6만 면 + 패드 11.4만 면(GLB 22.6 MB)이라 빌드 한도(25 MB)를 혼자 넘는다. 화면에서는 폭 200~600 px 로만 보이므로
# Decimate(collapse)로 줄인다: 초파리 0.15 · 패드 0.12 → 약 5.6만 + 2.7만 삼각형, GLB 2.1 MB. 초파리 메시는 Armature 모디파이어가
# 걸려 있어 Decimate 를 맨 앞으로 옮겨 적용한다 (정점 그룹 가중치는 유지된다).
# 애니메이션: 액션 키는 -47~97 프레임에 걸쳐 있지만 루프 한 바퀴는 1~49 (49 = 1 과 같은 자세). 장면 범위를 1~49 로 두고
# SCENE 모드로 내보내면 초파리 · 패드 두 클립이 모두 0~2 s 가 되어 반복해도 서로 어긋나지 않는다.
# 무재질 · UV 없음 — 색은 웹에서 입힌다 (web/src/versus-fly.js). 원본 .blend 파일은 저장하지 않는다.

import sys
import bpy

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
if not argv:
    sys.exit('usage: blender -b Flytris_tapping.blend --python scripts/export-fly-tapping.py -- <out.glb> [fly_ratio] [pad_ratio]')
out = argv[0]
fly_ratio = float(argv[1]) if len(argv) > 1 else 0.15
pad_ratio = float(argv[2]) if len(argv) > 2 else 0.12


def decimate(name, ratio):
    o = bpy.data.objects[name]
    before = len(o.data.polygons)
    m = o.modifiers.new('Decimate', 'DECIMATE')
    m.decimate_type = 'COLLAPSE'
    m.ratio = ratio
    m.use_collapse_triangulate = True
    with bpy.context.temp_override(object=o, active_object=o, selected_objects=[o]):
        bpy.ops.object.modifier_move_to_index(modifier='Decimate', index=0)
        bpy.ops.object.modifier_apply(modifier='Decimate')
    print(f'{name}: {before} -> {len(o.data.polygons)} faces')


decimate('Fly', fly_ratio)
decimate('Joycon', pad_ratio)
sc = bpy.context.scene
sc.frame_start, sc.frame_end = 1, 49
bpy.ops.export_scene.gltf(
    filepath=out, export_format='GLB', export_texcoords=False, export_normals=True, export_materials='NONE',
    export_animations=True, export_animation_mode='SCENE', export_frame_range=True, export_force_sampling=True,
    export_anim_slide_to_zero=True, export_optimize_animation_size=True, export_skins=True, export_def_bones=False,
    export_yup=True, export_apply=False, export_cameras=False, export_lights=False, export_extras=False)
print(f'-> {out}')
