function generateMask() {
    let mask = new Mask();
    mask.setFeatures(randomNumber(0, 1), "extensions");
    mask.setFeatures(randomNumber(0, 2), "decorations");

    return mask.text;
}

class Mask {
    size: number;
    extensions: Item[];
    decorations: Item[];
    constructor() {
        this.size = randomNumber(0, data.size.length - 1);
        this.extensions = [];
        this.decorations = [];
    }
    setFeatures(count: number, type: string) {
        if (!count || !type) {
            return;
        }
        for (let i = 0; i < count; i++) {
            let selection = randomNumber(0, data[type].length - 1);
            this[type][i] = new Item(selection);
        }
    }

    get sizeText() {
        let result;
        switch (this.size) {
            case 0:
                result = "a small mask, covering little more than the eyes. Even then, there are holes for each eye, but what you glimpse through them doesn't look anything like an eye. You shudder - it's better not to think about it."
                break;
            case 1:
                result = "an ornate, patterned masquerade mask. But you can't quite tell what the patterns represent - they seem different every time you look. Rather than a festive party atmosphere, all this gives you is a feeling of unease."
                break;
            case 2:
                result = "a mask covering only the top half of the face, leaving the mouth exposed...not that you can make out the mouth anyway. That's probably for the best. What kind of mouth would a being like this have?"
                break;
            case 3:
                result = "a mask covering only the bottom half of the face. Yet it still seems to have more detail and personality than any face you've ever seen. Is it...is it watching you? Best not to stare too much."
                break;
            case 4:
                result = `a large ${textGen.ceremonial} ceremonial mask, covering the entire face and then some. It looks like the sort of thing that would be worn for some ancient dark ritual, but the mask exudes more power than any ritual could.`;
                if (Math.random() > 0.9) result += "Watch out for vampires!"
                break;
            case 5:
                result = "a large mask covering the entire face, not allowing a single bit of skin to be seen. It's almost comforting. The mask feels like more of a face than any face could ever be, and it feels disturbingly right."
                break;
            case 6:
                let animal = textGen.animal;
                result = `a large, baggy ${animal} mask covering the entire head. `
                if (animal == "crow" && Math.random() > 0.5) {
                    result += "This well-crafted crow mask grasps a twig in its beak, which makes it feel friendly, yet majestic. You don't dare to speak to it."
                } else if (animal == "horse" && Math.random() > 0.9) {
                    let horn = (Math.random() > 0.5) ? "horn" : "ear of corn";
                    result += `But wait - the ${horn} sticking out of its head is unmistakable. This is no mere horse - it's a unicorn! A mystical, cosmic being, beyond the likes of any mere human.`
                } else {
                    result += `It's crude and laughable, but you don't dare laugh. The animal is watching you, even when the wearer is looking elsewhere, and you know better than to taunt creatures of the wild.`
                }
                break;
            default:
                result = " default size ";
        }
        return result;
    }

    get extensionsText() {
        let output = "";
        this.extensions.forEach(element => {
            switch (element.class){
                case 0:
                    output += "The mask extends all the way around to the back of the head. It gives a powerful impression of speed, a streamlined feel that seems like it clears away all obstacles."
                    break;
                case 1:
                    output += `Imposing ${element.color.text} horns project from the top of the mask. It's unclear whether they're meant to evoke the feeling of animals or demons, but it's clear that they give a powerful impression of strength.`
                    break;
                case 2:
                    output += `Part of the mask stretches down below the chin, almost like a beard. It seems like this would interfere with the wearer's movements, but you don't get the slightest feeling that it actually would. It gives a powerful impression of dexterity.`
                    break;
                case 3:
                    output += `Parts of the mask extend out to the sides of the head. In another world this might seem almost comical, but for some reason, here it seems clever and refined. It gives a powerful impression of intelligence and wisdom.`
                    break;
                case 4:
                    output += `Parts of the mask stretch down and around to cover the neck completely. No matter how bizarre this might look, it can't possibly be as wrong as the world around it. It gives a powerful impression of defense, a fortress surrounding the wearer's neck`
                    break;
                default:
                    output += " default extension "
            }
            output += " ";
        });
        return output;
    }

    get decorationsText() {
        let output = "";
        this.decorations.forEach(element => {
            let color = element.color.text;
            let location = data.locations[element.location].toLowerCase();
            switch (element.class){
                case 0:
                    output += `Protruding from the ${location} of the mask are some ${color} feathers, unlike any you've seen before. You can't tell what kind of bird they came from...or even if they came from a bird at all.`
                    break;
                case 1:
                    output += `The ${location} of the mask is studded with ${color} jewels. They feel so incredibly precious that you can't bear the thought of comparing them to any jewels you know of.`
                    break;
                case 2:
                    output += `An unusual ${color} glow is emitted from the ${location} of the mask. It feels plainly unsafe, but this whole space feels so wrong that an ordinary sense of danger feels comfortably familiar.`
                    break;
                case 3:
                    output += `The ${location} of the mask is dotted with small decorative holes of different sizes. You can't see anything through these holes, just a nothing deeper than any void could ever be. Why did you expect otherwise?`
                    break;
                case 4:
                    output += `The ${location} of the mask is missing a piece. But you can't tell if it's an intentional design element or the result of damage. For that matter, is it even missing a piece? Or is it just that every other mask has a piece it shouldn't?` 
                    break;
                case 4:
                    output += `The ${location} of the mask is decorated with intricate ${color} patterns. The design is almost hypnotic; the more you look, the more they feel like they're the only thing in the universe that truly exists. Probably best not to look too hard.`
                    break;
                default:
                    output += " default decoration ";
            }
            output += " ";
        });
        return output;
    }

    get text() {
        let text = `You can't seem to make out any details about their appearance. Everything seems hazy and indistinct, save for a mask adorning their face. Your eyes can't help but be drawn to the ${textGen.spooky} thing, as if a subtle power dwells within. \n`;
        text += `${this.sizeText} \n`;
        text += `${this.extensionsText} \n`;
        text += `${this.decorationsText} \n`;

        return text;
    }
}

const textGen = {
    get spooky() {
        return (Math.random() > 0.5) ? "unearthly" : "eerie";
    },
    get ceremonial() {
        return (Math.random() > 0.5) ? "wooden" : "stone";
    },
    get animal() {
        let choices = [
            "dog",
            "cat",
            "horse",
            "crow",
            "dinosaur"
        ];
        return choices[randomNumber(0, choices.length - 1)];
    }
}

class Item {
    class: number;
    location: number;
    color: Color;
    
    constructor(selection: number) {
        this.class = selection;
        this.location = randomNumber(0, data.locations.length - 1);
        this.color = new Color();
    }
}

class Color {
    
    color: number;
    adjective: number;

    constructor() {
        this.color = randomNumber(0, colorData.colors.length - 1);
        this.adjective = randomNumber(0, colorData.adjectives.length - 1);
    }

    get text() {
        return colorData.adjectives[this.adjective] + colorData.colors[this.color];
    }
}

const colorData = {
    colors: [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple",
        "indigo",
        "brown",
        "white",
        "black"
    ],
    adjectives: [
        "none",
        "none",
        "none",
        "bright",
        "dark",
        "shiny",
        "metallic",
        "iridescent"
    ]
}

const data = {
    size: [
        "Eyemask",
        "Masquerade",
        "Half-FaceTop",
        "Half-FaceBottom",
        "Ceremonial",
        "FullFace",
        "AnimalMask"
    ],
    extensions: [
        "Helmet",
        "Horns",
        "Chin",
        "Sides",
        "Neck"
    ],
    decorations: [
        "Feathers",
        "Jewels",
        "Glow",
        "Holes",
        "MissingPiece",
        "Patterns"
    ],
    locations: [
        "Top",
        "Sides",
        "Bottom",
        "Center"
        //"Between Eyes",
        //"Mouth"
    ],
    colorRegions: [
        "Top",
        "Sides",
        "Bottom",
        "Center",
    ],
}

function randomNumber(min, max) {
    let number = Math.random();
    number = number * max-min;
    number = Math.round(number);
    number = number + min;
    return number;
}