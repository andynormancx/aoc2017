var input = [
    2,
    0,
    0,
    -2,
    0,
    1,
    -2,
    -1,
    -6,
    2,
    -1,
    2,
    0,
    2,
    -13,
    0,
    -2,
    -15,
    -15,
    -3,
    -10,
    -11,
    1,
    -5,
    -20,
    -21,
    -14,
    -21,
    -4,
    -9,
    -29,
    2,
    -10,
    -5,
    -33,
    -33,
    -9,
    0,
    2,
    -24,
    0,
    -26,
    -24,
    -38,
    -28,
    -42,
    -14,
    -42,
    2,
    -2,
    -48,
    -48,
    -17,
    -19,
    -26,
    -39,
    0,
    -15,
    -42,
    -3,
    -19,
    -19,
    -7,
    -1,
    -11,
    -5,
    -17,
    -46,
    -15,
    -43,
    -22,
    -31,
    -60,
    -59,
    -71,
    -58,
    -39,
    -66,
    -74,
    -11,
    -18,
    -68,
    1,
    -70,
    -79,
    -18,
    -56,
    -17,
    0,
    -52,
    -79,
    -86,
    -90,
    -74,
    -89,
    -20,
    -30,
    -65,
    -2,
    -47,
    -42,
    -33,
    -35,
    -61,
    -4,
    -101,
    -38,
    -8,
    -26,
    -37,
    -56,
    -30,
    -36,
    -55,
    -87,
    -85,
    -58,
    -22,
    -9,
    -81,
    -119,
    -94,
    -81,
    -83,
    -24,
    -105,
    -21,
    -69,
    -11,
    -7,
    -114,
    -60,
    -74,
    -19,
    -126,
    -66,
    -106,
    -5,
    -112,
    0,
    -58,
    -18,
    -122,
    -50,
    -72,
    -83,
    -15,
    -93,
    -60,
    -17,
    -37,
    -55,
    -119,
    -118,
    -12,
    -101,
    -65,
    -35,
    -122,
    -149,
    -97,
    -140,
    -62,
    -101,
    -85,
    -23,
    -43,
    -141,
    -158,
    -37,
    -103,
    -142,
    1,
    -112,
    -55,
    -139,
    -90,
    -5,
    -75,
    -73,
    -171,
    -4,
    -39,
    -4,
    -135,
    -126,
    -40,
    -74,
    -161,
    -125,
    -174,
    -90,
    -129,
    -126,
    -166,
    -106,
    -16,
    -51,
    -54,
    -135,
    -37,
    -21,
    -103,
    -73,
    -64,
    -59,
    -88,
    -153,
    -196,
    -123,
    -98,
    -36,
    -193,
    -164,
    -111,
    -81,
    -49,
    -87,
    -91,
    -191,
    -219,
    -103,
    -217,
    -107,
    -87,
    -82,
    -23,
    -157,
    -56,
    -20,
    -149,
    -133,
    -53,
    -37,
    -199,
    -85,
    -133,
    -12,
    -228,
    -15,
    -217,
    -106,
    -52,
    -179,
    -118,
    -54,
    -70,
    -99,
    -160,
    -24,
    -71,
    -55,
    -7,
    -105,
    -174,
    -187,
    -226,
    -210,
    -55,
    -130,
    -137,
    -255,
    -259,
    -117,
    -10,
    -162,
    -61,
    -19,
    -54,
    -225,
    -23,
    -84,
    -183,
    -262,
    -44,
    -215,
    -268,
    -201,
    -89,
    -3,
    -241,
    -277,
    -8,
    -177,
    -31,
    -269,
    -35,
    -132,
    -175,
    -253,
    -85,
    -286,
    -265,
    -292,
    -196,
    -132,
    -212,
    -131,
    -117,
    -196,
    -245,
    -294,
    -32,
    -20,
    -184,
    -246,
    -171,
    -64,
    -220,
    -3,
    -179,
    -186,
    -51,
    -276,
    -203,
    -191,
    -205,
    -141,
    -304,
    -186,
    -273,
    -299,
    -17,
    -46,
    -254,
    -126,
    -268,
    -163,
    -69,
    -326,
    -192,
    -279,
    -293,
    -220,
    -20,
    -137,
    -330,
    -8,
    -53,
    -49,
    2,
    -149,
    -181,
    -298,
    -297,
    -66,
    -136,
    -166,
    -146,
    -28,
    -146,
    -226,
    -270,
    -349,
    -216,
    -348,
    -184,
    -298,
    -348,
    -323,
    -244,
    -207,
    -22,
    -172,
    -359,
    -188,
    -1,
    -278,
    -76,
    -216,
    -343,
    -29,
    -37,
    -257,
    -357,
    -226,
    -19,
    -246,
    -76,
    -105,
    -312,
    -219,
    -268,
    0,
    -230,
    -379,
    -357,
    -69,
    -1,
    -30,
    -321,
    -212,
    -262,
    -297,
    -86,
    -102,
    -390,
    -384,
    -98,
    -294,
    -359,
    -326,
    -58,
    -296,
    -104,
    -309,
    -244,
    -308,
    -116,
    -148,
    -134,
    -307,
    -307,
    -207,
    -391,
    -312,
    -209,
    -334,
    -225,
    -193,
    -345,
    -224,
    -299,
    -110,
    -414,
    -252,
    -302,
    -142,
    -239,
    -376,
    -54,
    -227,
    -126,
    -154,
    -263,
    -18,
    -387,
    -214,
    -129,
    -163,
    -151,
    -325,
    -401,
    -382,
    -329,
    -288,
    -283,
    -376,
    -211,
    -221,
    -448,
    -292,
    -187,
    -76,
    -84,
    -342,
    -162,
    -251,
    -110,
    -66,
    -349,
    -435,
    -380,
    -82,
    -281,
    -29,
    -61,
    -402,
    -287,
    -118,
    -428,
    -429,
    -403,
    -324,
    -391,
    -203,
    -374,
    -397,
    -352,
    -462,
    -440,
    -89,
    -209,
    -133,
    -436,
    -187,
    -142,
    -299,
    -402,
    -210,
    -217,
    -50,
    -456,
    -177,
    -335,
    -204,
    -338,
    -146,
    -82,
    -379,
    -332,
    -148,
    -370,
    -188,
    -42,
    -351,
    -219,
    -89,
    -129,
    -388,
    -42,
    -338,
    -169,
    -104,
    -508,
    -43,
    -432,
    -99,
    -484,
    2,
    -461,
    -469,
    -151,
    -279,
    -309,
    -121,
    -306,
    -210,
    -302,
    -100,
    -415,
    -307,
    2,
    -111,
    -432,
    -457,
    -299,
    -95,
    -327,
    -508,
    -327,
    -211,
    -319,
    -83,
    -340,
    -474,
    -160,
    -494,
    -351,
    -177,
    -514,
    -198,
    -177,
    -45,
    -364,
    -232,
    -432,
    -137,
    -467,
    -11,
    -253,
    -237,
    -367,
    -42,
    -442,
    -14,
    -323,
    -489,
    -466,
    -389,
    -362,
    -195,
    -110,
    -170,
    -394,
    -234,
    -296,
    -296,
    -469,
    -275,
    -2,
    -413,
    -149,
    -477,
    -543,
    -435,
    -255,
    -259,
    -152,
    -73,
    -47,
    -72,
    -252,
    -499,
    -305,
    -169,
    -406,
    -280,
    -287,
    -43,
    -20,
    -242,
    -271,
    -336,
    -500,
    -341,
    -354,
    -559,
    -364,
    -126,
    -173,
    -444,
    -555,
    -532,
    -532,
    -369,
    -468,
    -315,
    -469,
    -506,
    -151,
    -202,
    -459,
    -139,
    -434,
    -383,
    -353,
    -13,
    -272,
    -517,
    -629,
    -573,
    -502,
    -337,
    -454,
    -376,
    -288,
    -430,
    -503,
    -482,
    -327,
    -418,
    -623,
    -576,
    -412,
    -416,
    -457,
    -84,
    -251,
    -466,
    -520,
    -262,
    -642,
    -329,
    -308,
    -145,
    -391,
    -189,
    -226,
    -48,
    -167,
    -626,
    -325,
    -288,
    -432,
    -615,
    -149,
    -414,
    -387,
    -622,
    -260,
    -200,
    -483,
    -531,
    -22,
    -82,
    -308,
    -593,
    -271,
    -134,
    -431,
    -190,
    -460,
    -434,
    -558,
    -166,
    -136,
    -404,
    -10,
    -225,
    -397,
    -375,
    -371,
    -654,
    -374,
    -137,
    -659,
    -413,
    -117,
    -602,
    -585,
    -601,
    -451,
    -171,
    -296,
    -437,
    -505,
    -675,
    -153,
    -286,
    -28,
    -515,
    -221,
    -124,
    -662,
    -516,
    -119,
    -390,
    -78,
    -372,
    -490,
    -403,
    -341,
    -623,
    -264,
    -672,
    -94,
    -238,
    -250,
    -382,
    -526,
    -360,
    -170,
    -109,
    -228,
    -226,
    -70,
    -519,
    -481,
    -174,
    -471,
    -9,
    -497,
    -488,
    -337,
    -729,
    -72,
    -489,
    -717,
    -426,
    -159,
    -436,
    -600,
    -84,
    -1,
    -742,
    -258,
    -346,
    -205,
    -427,
    -479,
    -243,
    -358,
    -90,
    -482,
    -471,
    -234,
    -131,
    -108,
    -670,
    -740,
    -748,
    -427,
    -563,
    -691,
    -354,
    -427,
    -755,
    -708,
    -389,
    -741,
    -125,
    -723,
    -274,
    -464,
    -223,
    -497,
    -182,
    -167,
    -83,
    -387,
    -464,
    -195,
    -131,
    -161,
    -213,
    -671,
    -491,
    -66,
    -138,
    -121,
    -498,
    -408,
    -429,
    -643,
    -803,
    -118,
    -561,
    -217,
    -282,
    -400,
    -396,
    -434,
    -501,
    -134,
    -409,
    -162,
    -696,
    -14,
    -269,
    -663,
    -531,
    -620,
    -208,
    -71,
    -511,
    -421,
    -371,
    -797,
    -454,
    -273,
    -167,
    -261,
    -618,
    -769,
    -738,
    -71,
    -239,
    -117,
    -204,
    -149,
    -820,
    -222,
    -337,
    -383,
    -181,
    -433,
    -765,
    -367,
    -286,
    -152,
    -59,
    -673,
    -333,
    -238,
    -121,
    -16,
    -614,
    -630,
    -196,
    -306,
    -703,
    -363,
    -296,
    -366,
    -515,
    -673,
    -90,
    -421,
    -474,
    -794,
    -522,
    -842,
    -185,
    -732,
    -642,
    -830,
    -19,
    -735,
    -153,
    -814,
    -654,
    -550,
    -175,
    -626,
    -148,
    -661,
    -876,
    -601,
    -822,
    -692,
    -784,
    -761,
    -738,
    -144,
    -672,
    -16,
    -572,
    -484,
    -851,
    -849,
    -41,
    -59,
    -700,
    -586,
    -323,
    -504,
    -156,
    -755,
    -408,
    -10,
    -228,
    -116,
    -174,
    -860,
    -837,
    -796,
    -392,
    -380,
    -403,
    -886,
    -360,
    -200,
    -38,
    -544,
    -448,
    -281,
    -218,
    -132,
    -571,
    -650,
    -666,
    -332,
    -130,
    -618,
    -306,
    -272,
    -95,
    -110,
    -804,
    -25,
    -61,
    -114,
    -369,
    -675,
    -58,
    -341,
    -543,
    -477,
    -936,
    -617,
    -684,
    -803,
    -40,
    -285,
    -919,
    -72,
    -685,
    -318,
    -107,
    -210,
    -926,
    -600,
    -130,
    -707,
    -355,
    -221,
    -951,
    -687,
    -599,
    -745,
    -889,
    -10,
    -188,
    -687,
    -191,
    -789,
    -44,
    -774,
    -53,
    -738,
    -889,
    -332,
    -575,
    -838,
    -975,
    -224,
    -720,
    -910,
    -478,
    -35,
    -740,
    -549,
    -911,
    -624,
    -596,
    -865,
    -485,
    -476,
    -348,
    -664,
    -674,
    -597,
    -839,
    -698,
    -746,
    -527,
    -95,
    -623,
    -662,
    -795,
    -287,
    -969,
    -21,
    -730,
    -191,
    -866    
]

var testInput = [
    0,
    3,
    0,
    1,
    -3,
];

//solve(testInput);
solve(input);

function solve(input) {
    var location = 0;
    var steps = 0;

    while (true) {
        let nextLocation = location + input[location];
        //console.log(input.length);
        //console.log("location: " + location + " nextLocation: " + nextLocation + " input[location]: " + input[location] + " steps: " + steps);
        if (nextLocation < 0 || nextLocation > input.length - 1) {
            break;
        }
        if (input[location] > 2) {
            input[location] = input[location] - 1;                        
        } else {
            input[location] = input[location] + 1;            
        }
        location = nextLocation;
        steps++;
        //console.log(input);
    }
    //console.log(location + " " + input[location]);
    console.log("steps: " + (steps + 1));
    console.log("input length: " + input.length);
}