// EXOhSPEC V25 - TPU DUAL SIDE-VENT FAN MOUNT v1.1
// Design: Biswajit Jana
// ALL DIMENSIONS IN MILLIMETRES (mm)
// v1.1 final-print revision:
//   1) Adds a continuous thin perimeter plenum skirt to close the exposed side gaps.
//      The central camera-vent chamber remains open; airflow is directed between
//      the fan throat and the camera ventilation grille rather than bypassing sideways.
//   2) Retains the compliant TPU sealing ribs at the camera interface.
//   3) Re-cuts the four clamp screw pilots after the complete union so the M3 nylon
//      screw paths cannot be partially closed by overlapping saddle geometry.
//   4) Re-cuts the four fan-boss pilots after the complete union for clean M3 entry.
//   5) Central Ø28 mm airflow bore remains a final global subtraction.
// Intended fan: Sunon MF30100V3-1000U-A99, 30 x 30 x 10 mm, 5 V.
// Intended material/colour: BLACK TPU ~95A.
// Positive retention: 4 x angled M3 nylon clamp screws per mount.
// NO drilling/tapping of camera body. Use soft silicone/TPU pads on screw tips.

$fn = 72;
DIR = "L"; // "L" = intake; "R" = exhaust

// --- CAMERA / MEASURED VENT -------------------------------------------------
camera_radius       = 45.0;
vent_axial          = 35.0;
vent_curved_arc     = 47.5;

// --- ONE-PIECE TPU SADDLE / SEALED PLENUM -----------------------------------
mount_axial         = 40.0;
mount_curved_span   = 54.0;
inner_radius        = 45.25;
outer_radius        = 49.25;
platform_t          = 3.0;
platform_z          = 3.2;

chamber_axial       = 36.0;
chamber_curved      = 49.0;
air_throat_d        = 28.0;
final_bore_d        = 28.0;

plenum_skirt_t      = 1.0;

seal_rib_interference = 0.35;
seal_rib_w          = 1.6;

// --- FAN INTERFACE -----------------------------------------------------------
fan_size            = 30.0;
fan_pitch           = 24.0;
fan_pilot_d         = 2.85;
fan_boss_d          = 7.2;
fan_boss_h          = 5.0;
fan_isolation_pad_h = 0.8;

// --- POSITIVE CAMERA RETENTION ----------------------------------------------
clamp_x             = 22.0;
clamp_angle         = 40.0;
clamp_boss_r_start  = 46.0;
clamp_boss_r_end    = 54.5;
clamp_boss_d        = 8.8;
clamp_pilot_d       = 2.85;
clamp_counter_d     = 6.2;
clamp_counter_depth = 1.0;

// --- LABELS ------------------------------------------------------------------
label_depth         = 0.50;

module xcyl(r,len){
    translate([-len/2,0,-camera_radius])
        rotate([0,90,0]) cylinder(h=len,r=r);
}

module saddle_shell(){
    difference(){
        intersection(){
            difference(){
                xcyl(outer_radius,mount_axial);
                xcyl(inner_radius,mount_axial+2);
            }
            translate([-mount_axial/2,-mount_curved_span/2,-13])
                cube([mount_axial,mount_curved_span,24]);
        }
        translate([-chamber_axial/2,-chamber_curved/2,-3])
            cube([chamber_axial,chamber_curved,platform_z+4]);
    }
}

module sealing_ribs(){
    for(sx=[-1,1]){
        intersection(){
            difference(){
                xcyl(inner_radius+0.55,mount_axial+1);
                xcyl(camera_radius-seal_rib_interference,mount_axial+2);
            }
            translate([sx*(mount_axial/2-seal_rib_w/2)-seal_rib_w/2,
                       -mount_curved_span/2+2,-13])
                cube([seal_rib_w,mount_curved_span-4,16]);
        }
    }
    for(sy=[-1,1]){
        intersection(){
            difference(){
                xcyl(inner_radius+0.55,mount_axial+1);
                xcyl(camera_radius-seal_rib_interference,mount_axial+2);
            }
            translate([-mount_axial/2+2, sy*(mount_curved_span/2-1.5)-1.5,-13])
                cube([mount_axial-4,3.0,16]);
        }
    }
}

module sealed_plenum_skirt(){
    difference(){
        difference(){
            translate([-mount_axial/2,-mount_curved_span/2,-13])
                cube([mount_axial,mount_curved_span,platform_z+13]);
            xcyl(inner_radius,mount_axial+2);
        }
        translate([-(mount_axial-2*plenum_skirt_t)/2,
                   -(mount_curved_span-2*plenum_skirt_t)/2,
                   -14])
            cube([mount_axial-2*plenum_skirt_t,
                  mount_curved_span-2*plenum_skirt_t,
                  platform_z+15]);
    }
}

module fan_deck(dir="L"){
    difference(){
        translate([-mount_axial/2,-mount_curved_span/2,platform_z])
            cube([mount_axial,mount_curved_span,platform_t]);
        translate([0,0,platform_z-1])
            cylinder(h=platform_t+2,d=air_throat_d);

        translate([0,-24.2,platform_z+platform_t-label_depth])
            linear_extrude(label_depth+0.05)
                text("EXOhSPEC",size=2.15,halign="center",valign="center",
                     font="Liberation Sans:style=Bold");

        translate([-17.3,0,platform_z+platform_t-label_depth])
            rotate([0,0,90])
                linear_extrude(label_depth+0.05)
                    text("B.JANA",size=1.75,halign="center",valign="center",
                         font="Liberation Sans:style=Bold");

        translate([17.3,0,platform_z+platform_t-label_depth])
            rotate([0,0,90])
                linear_extrude(label_depth+0.05)
                    text(dir=="L" ? "L-IN" : "R-OUT",size=1.85,
                         halign="center",valign="center",
                         font="Liberation Sans:style=Bold");
    }
}

module fan_boss(x,y){
    union(){
        translate([x,y,platform_z+platform_t])
            cylinder(h=fan_isolation_pad_h,d=fan_boss_d+1.8);
        translate([x,y,platform_z+platform_t+fan_isolation_pad_h])
            cylinder(h=fan_boss_h,d=fan_boss_d);
    }
}

module radial_cylinder(x, sy, r0, len, d){
    theta=clamp_angle;
    y0=sy*r0*sin(theta);
    z0=-camera_radius + r0*cos(theta);
    translate([x,y0,z0])
        rotate([-sy*theta,0,0]) cylinder(h=len,d=d);
}

module clamp_boss(x,sy){
    len=clamp_boss_r_end-clamp_boss_r_start;
    difference(){
        radial_cylinder(x,sy,clamp_boss_r_start,len,clamp_boss_d);
        radial_cylinder(x,sy,clamp_boss_r_end-clamp_counter_depth,
                        clamp_counter_depth+0.8,clamp_counter_d);
    }
}

module raw_mount(dir="L"){
    union(){
        saddle_shell();
        sealing_ribs();
        sealed_plenum_skirt();
        fan_deck(dir);
        for(x=[-fan_pitch/2,fan_pitch/2])
            for(y=[-fan_pitch/2,fan_pitch/2])
                fan_boss(x,y);
        for(x=[-clamp_x,clamp_x])
            for(sy=[-1,1])
                clamp_boss(x,sy);
    }
}

module final_fastener_bores(){
    for(x=[-fan_pitch/2,fan_pitch/2])
        for(y=[-fan_pitch/2,fan_pitch/2])
            translate([x,y,platform_z+platform_t-0.05])
                cylinder(h=fan_isolation_pad_h+fan_boss_h+1.1,d=fan_pilot_d);

    for(x=[-clamp_x,clamp_x])
        for(sy=[-1,1])
            radial_cylinder(x,sy,camera_radius-0.25,
                            clamp_boss_r_end-(camera_radius-0.25)+0.8,
                            clamp_pilot_d);
}

module mount(dir="L"){
    difference(){
        raw_mount(dir);
        translate([0,0,-6]) cylinder(h=22,d=final_bore_d);
        final_fastener_bores();
    }
}

mount(DIR);
