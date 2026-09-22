// EXOhSPEC V25 modular fan mount v0.6 — Biswajit Jana
// Units mm. 3.0 mm camera clearance + separate 3.0 mm soft gasket.
// B. JANA and L IN / R OUT are recessed engravings in the platform.
$fn=128;
PART="all"; DIR="L";
camera_radius=45.0; vent_axial_width=35.0; vent_curved_span=47.5;
mount_axial_width=40.0; mount_chord_span=40.0; rigid_gap=3.0; shell=3.0;
platform_t=2.8; platform_xy=36.0; fan_size=30.0; fan_pitch=24.0;
air_top_d=28.0; air_plenum_d=34.0; boss_d=7.2; boss_h=4.8; insert_d=4.6; insert_depth=4.2;
ear_ext=5.0; ear_y=8.0; preload_d=3.4; camera_gasket_t=3.0; fan_gasket_t=1.5;
inner_r=camera_radius+rigid_gap; outer_r=inner_r+shell; platform_z=rigid_gap+shell-0.6;
module xcyl(r,len){translate([-len/2,0,-camera_radius]) rotate([0,90,0]) cylinder(h=len,r=r);}
module base(){difference(){intersection(){difference(){xcyl(outer_r,mount_axial_width);xcyl(inner_r,mount_axial_width+2);} translate([-mount_axial_width/2,-mount_chord_span/2,-15]) cube([mount_axial_width,mount_chord_span,28]);} translate([0,0,-20]) cylinder(h=35,d=air_plenum_d);}}
module platform(dir="L"){difference(){translate([-platform_xy/2,-platform_xy/2,platform_z]) cube([platform_xy,platform_xy,platform_t]);translate([0,0,platform_z-1])cylinder(h=12,d=air_top_d);translate([0,-16.65,platform_z+platform_t-0.29])linear_extrude(0.31)text("B. JANA",size=1.20,halign="center",valign="center",font="Liberation Sans:style=Bold");translate([0,16.65,platform_z+platform_t-0.29])linear_extrude(0.31)text(dir=="L"?"L IN":"R OUT",size=1.50,halign="center",valign="center",font="Liberation Sans:style=Bold");}}
module boss(x,y){difference(){translate([x,y,platform_z+platform_t])cylinder(h=boss_h,d=boss_d);translate([x,y,platform_z+platform_t+boss_h-insert_depth])cylinder(h=insert_depth+1,d=insert_d);}}
module ear(sx,sy){x=sx*(mount_axial_width/2+ear_ext/2);y=sy*(platform_xy/2-ear_y/2);difference(){translate([x,y,platform_z+1.55])cube([ear_ext,ear_y,5.5],center=true);translate([x,y,platform_z-8])cylinder(h=20,d=preload_d);}}
module camera_gasket(){difference(){intersection(){difference(){xcyl(camera_radius+camera_gasket_t,mount_axial_width);xcyl(camera_radius,mount_axial_width+2);}translate([-mount_axial_width/2,-mount_chord_span/2,-14])cube([mount_axial_width,mount_chord_span,25]);}translate([0,0,-20])cylinder(h=35,d=air_plenum_d);}}
module fan_gasket(){difference(){translate([-15,-15,platform_z+platform_t])cube([30,30,fan_gasket_t]);translate([0,0,platform_z+platform_t-1])cylinder(h=8,d=air_top_d);for(x=[-12,12])for(y=[-12,12])translate([x,y,platform_z+platform_t-1])cylinder(h=8,d=3.4);}}
module rigid(dir="L"){base();platform(dir);for(x=[-12,12])for(y=[-12,12])boss(x,y);for(sx=[-1,1])for(sy=[-1,1])ear(sx,sy);}
if(PART=="all"){rigid(DIR);camera_gasket();fan_gasket();}else if(PART=="base")base();else if(PART=="platform")platform(DIR);else if(PART=="camera_gasket")camera_gasket();else if(PART=="fan_gasket")fan_gasket();
