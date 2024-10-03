// Keyboard note values

import { NoteKey } from '@/types/keyboard-option-types';

// Each note value is an object containing a letter note and a frequency value
// Note indicates which note on the keyboard it will represent within an octave, there are only 12 options
// Frequency is the number value provided to the Web Audio API
interface NoteValue {
	note: NoteKey;
	frequency: number;
}

// Each octave is made up of 12 note values
type OctaveKeys = [
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
	NoteValue,
];

// The keyboard is made up of seven octaves
type KeyboardValues = [
	OctaveKeys,
	OctaveKeys,
	OctaveKeys,
	OctaveKeys,
	OctaveKeys,
	OctaveKeys,
	OctaveKeys,
];

export const noteValues: KeyboardValues = [
	//****************************************************************************
	//Octave 1
	[
		{
			note: 'C',
			frequency: 32.703195662574829,
		},
		{
			note: 'D♭',
			frequency: 34.647828872109012,
		},
		{
			note: 'D',
			frequency: 36.708095989675945,
		},
		{
			note: 'E♭',
			frequency: 38.890872965260113,
		},
		{
			note: 'E',
			frequency: 41.203444614108741,
		},
		{
			note: 'F',
			frequency: 43.653528929125485,
		},
		{
			note: 'G♭',
			frequency: 46.249302838954299,
		},
		{
			note: 'G',
			frequency: 48.999429497718661,
		},
		{
			note: 'A♭',
			frequency: 51.913087197493142,
		},
		{
			note: 'A',
			frequency: 55.0,
		},
		{
			note: 'B♭',
			frequency: 58.270470189761239,
		},
		{
			note: 'B',
			frequency: 61.735412657015513,
		},
	],

	//****************************************************************************
	//Octave 2
	[
		{
			note: 'C',
			frequency: 65.406391325149658,
		},
		{
			note: 'D♭',
			frequency: 69.295657744218024,
		},
		{
			note: 'D',
			frequency: 73.41619197935189,
		},
		{
			note: 'E♭',
			frequency: 77.781745930520227,
		},
		{
			note: 'E',
			frequency: 82.406889228217482,
		},
		{
			note: 'F',
			frequency: 87.307057858250971,
		},
		{
			note: 'G♭',
			frequency: 92.498605677908599,
		},
		{
			note: 'G',
			frequency: 97.998858995437323,
		},
		{
			note: 'A♭',
			frequency: 103.826174394986284,
		},
		{
			note: 'A',
			frequency: 110.0,
		},
		{
			note: 'B♭',
			frequency: 116.540940379522479,
		},
		{
			note: 'B',
			frequency: 123.470825314031027,
		},
	],

	//****************************************************************************
	//Octave 3
	[
		{
			note: 'C',
			frequency: 130.812782650299317,
		},
		{
			note: 'D♭',
			frequency: 138.591315488436048,
		},
		{
			note: 'D',
			frequency: 146.83238395870378,
		},
		{
			note: 'E♭',
			frequency: 155.563491861040455,
		},
		{
			note: 'E',
			frequency: 164.813778456434964,
		},
		{
			note: 'F',
			frequency: 174.614115716501942,
		},
		{
			note: 'G♭',
			frequency: 184.997211355817199,
		},
		{
			note: 'G',
			frequency: 195.997717990874647,
		},
		{
			note: 'A♭',
			frequency: 207.652348789972569,
		},
		{
			note: 'A',
			frequency: 220.0,
		},
		{
			note: 'B♭',
			frequency: 233.081880759044958,
		},
		{
			note: 'B',
			frequency: 246.941650628062055,
		},
	],

	//****************************************************************************
	//Octave 4
	[
		{
			note: 'C',
			frequency: 261.625565300598634,
		},
		{
			note: 'D♭',
			frequency: 277.182630976872096,
		},
		{
			note: 'D',
			frequency: 293.66476791740756,
		},
		{
			note: 'E♭',
			frequency: 311.12698372208091,
		},
		{
			note: 'E',
			frequency: 329.627556912869929,
		},
		{
			note: 'F',
			frequency: 349.228231433003884,
		},
		{
			note: 'G♭',
			frequency: 369.994422711634398,
		},
		{
			note: 'G',
			frequency: 391.995435981749294,
		},
		{
			note: 'A♭',
			frequency: 415.304697579945138,
		},
		{
			note: 'A',
			frequency: 440.0,
		},
		{
			note: 'B♭',
			frequency: 466.163761518089916,
		},
		{
			note: 'B',
			frequency: 493.883301256124111,
		},
	],

	//****************************************************************************
	//Octave 5
	[
		{
			note: 'C',
			frequency: 523.251130601197269,
		},
		{
			note: 'D♭',
			frequency: 554.365261953744192,
		},
		{
			note: 'D',
			frequency: 587.32953583481512,
		},
		{
			note: 'E♭',
			frequency: 622.253967444161821,
		},
		{
			note: 'E',
			frequency: 659.255113825739859,
		},
		{
			note: 'F',
			frequency: 698.456462866007768,
		},
		{
			note: 'G♭',
			frequency: 739.988845423268797,
		},
		{
			note: 'G',
			frequency: 783.990871963498588,
		},
		{
			note: 'A♭',
			frequency: 830.609395159890277,
		},
		{
			note: 'A',
			frequency: 880.0,
		},
		{
			note: 'B♭',
			frequency: 932.327523036179832,
		},
		{
			note: 'B',
			frequency: 987.766602512248223,
		},
	],

	//****************************************************************************
	//Octave 6
	[
		{
			note: 'C',
			frequency: 1046.502261202394538,
		},
		{
			note: 'D♭',
			frequency: 1108.730523907488384,
		},
		{
			note: 'D',
			frequency: 1174.659071669630241,
		},
		{
			note: 'E♭',
			frequency: 1244.507934888323642,
		},
		{
			note: 'E',
			frequency: 1318.510227651479718,
		},
		{
			note: 'F',
			frequency: 1396.912925732015537,
		},
		{
			note: 'G♭',
			frequency: 1479.977690846537595,
		},
		{
			note: 'G',
			frequency: 1567.981743926997176,
		},
		{
			note: 'A♭',
			frequency: 1661.218790319780554,
		},
		{
			note: 'A',
			frequency: 1760.0,
		},
		{
			note: 'B♭',
			frequency: 1864.655046072359665,
		},
		{
			note: 'B',
			frequency: 1975.533205024496447,
		},
	],

	//****************************************************************************
	//Octave 7
	[
		{
			note: 'C',
			frequency: 2093.004522404789077,
		},
		{
			note: 'D♭',
			frequency: 2217.461047814976769,
		},
		{
			note: 'D',
			frequency: 2349.318143339260482,
		},
		{
			note: 'E♭',
			frequency: 2489.015869776647285,
		},
		{
			note: 'E',
			frequency: 2637.020455302959437,
		},
		{
			note: 'F',
			frequency: 2793.825851464031075,
		},
		{
			note: 'G♭',
			frequency: 2959.955381693075191,
		},
		{
			note: 'G',
			frequency: 3135.963487853994352,
		},
		{
			note: 'A♭',
			frequency: 3322.437580639561108,
		},
		{
			note: 'A',
			frequency: 3520.0,
		},
		{
			note: 'B♭',
			frequency: 3729.310092144719331,
		},
		{
			note: 'B',
			frequency: 3951.066410048992894,
		},
	],
];
