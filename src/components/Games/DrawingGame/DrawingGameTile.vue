<template>
    <div class="cell" :style="cellStyle">
        <div class="inner-cell-under" :style="underStyle"></div>
        <div class="inner-cell-over" :style="tileStyle"></div>
        <div class="inner-cell-over-all" :style="overStyle"></div>
    </div>
</template>

<script>
export default {
    props: {
        color: String,
        size: Number,
        borderLeft: Boolean,
        borderRight: Boolean,
        borderBottom: Boolean,
    },
    watch: {
        color(newColor){
            this.setColors();
            return newColor;
        },
        borderLeft(newValue){
            this.setColors();
            return newValue;
        },
        borderRight(newValue){
            this.setColors();
            return newValue;
        },
        borderBottom(newValue){
            this.setColors();
            return newValue;
        }
    },
    methods: {
        setColors(){
            let colBorderLeft;
            let colBorderRight;
            let colMain;
            let colReflect; // (also underBorderRight)
            let colUnderBorderLeft;
            let colUnderBottom;
            switch(this.color){
                case "aqua":
                    colMain = "#26b7ff";
                    colReflect = "#3080ff";
                    colUnderBottom = "#0046a4";
                    colUnderBorderLeft = "#032946";
                    colBorderLeft = "#0086ab";
                    colBorderRight = "#6ed6ff";
                    break;
                case "purple":
                    colMain = "#7e59f9";
                    colReflect = "#9d47f7";
                    colUnderBottom = "#5a1b9e";
                    colUnderBorderLeft = "#200f44";
                    colBorderLeft = "#473aa7";
                    colBorderRight = "#9888fb";
                    break;
                case "pink":
                    colMain = "#f959cf";
                    colReflect = "#f7479b";
                    colUnderBottom = "#9e1b5b";
                    colUnderBorderLeft = "#440f31";
                    colBorderLeft = "#a73a96";
                    colBorderRight = "#a73a96";
                    break;
                case "green":
                    colMain = "#0f1";
                    colReflect = "#4db812";
                    colUnderBottom = "#15971d";
                    colUnderBorderLeft = "#1b440f";
                    colBorderLeft = "#3aa73c";
                    colBorderRight = "#79ff00";
                    break;
                case "cyan":
                    colMain = "#59f9a8";
                    colReflect = "#63c6f7";
                    colUnderBottom = "#1b9e9c";
                    colUnderBorderLeft = "#0f443b";
                    colBorderLeft = "#3aa77d";
                    colBorderRight = "#88fbd2";
                    break;
                case "red":
                    colMain = "#f92937";
                    colReflect = "#f70811";
                    colUnderBottom = "#9e0116";
                    colUnderBorderLeft = "#440005";
                    colBorderLeft = "#a71318";
                    colBorderRight = "#fb5d61";
                    break;
                case "orange":
                    colMain = "#f98329";
                    colReflect = "#f77608";
                    colUnderBottom = "#9e3a01";
                    colUnderBorderLeft = "#441d00";
                    colBorderLeft = "#a75813";
                    colBorderRight = "#fba85d";
                    break;
                case "yellow":
                    colMain = "#f9dd29";
                    colReflect = "#e1cc19";
                    colUnderBottom = "#9e7e01";
                    colUnderBorderLeft = "#443a00";
                    colBorderLeft = "#a79813";
                    colBorderRight = "#fff66b";
                    break;
                case "blue":
                    colMain = "#293ef9";
                    colReflect = "#0819f7";
                    colUnderBottom = "#011c9e";
                    colUnderBorderLeft = "#000844";
                    colBorderLeft = "#131da7";
                    colBorderRight = "#5d67fb";
                    break;
                case "brown":
                    colMain = "#67361a";
                    colReflect = "#89583c";
                    colUnderBottom = "#57260a";
                    colUnderBorderLeft = "#0f0500";
                    colBorderLeft = "#57260a";
                    colBorderRight = "#7b4a2e";
                    break;
                case "magenta":
                    colMain = "#6e133b";
                    colReflect = "#90355d";
                    colUnderBottom = "#5e032b";
                    colUnderBorderLeft = "#100007";
                    colBorderLeft = "#5e032b";
                    colBorderRight = "#82274f";
                    break;
                case "gray":
                    colMain = "#3f3f3f";
                    colReflect = "#616161";
                    colUnderBottom = "#2f2f2f";
                    colUnderBorderLeft = "#080808";
                    colBorderLeft = "#2f2f2f";
                    colBorderRight = "#535353";
                    break;
                case "white":
                    colMain = "#e3e1e1";
                    colReflect = "#616161";
                    colUnderBottom = "#2f2f2f";
                    colUnderBorderLeft = "#080808";
                    colBorderLeft = "#2f2f2f";
                    colBorderRight = "#535353";
                    break;
                default:
                    throw new Error(`Tile color not implemented ${this.color}`)
            }

            // under
            this.underStyle.backgroundColor = colUnderBottom;
            this.underStyle.borderLeft = this.borderSize + "px solid " + colUnderBorderLeft;
            this.underStyle.borderRight = this.borderSize + "px solid " + colReflect;
            // tile
            this.tileStyle.backgroundColor = colMain;
            this.tileStyle.borderLeft = !this.borderLeft ? 'none' : this.borderSize + "px solid " + colBorderLeft;
            this.tileStyle.borderRight = !this.borderRight ? 'none' : this.borderSize + "px solid " + colBorderRight;
            this.tileStyle.borderBottom = !this.borderBottom ? 'none' : this.borderSize + "px solid " + colReflect;
            // over
            this.overStyle.backgroundColor = colMain;
        }
    },
    data() {
        return{
            borderSize: Math.ceil(this.size * 0.1),
            cellStyle: {
                width: this.size + "px",
                height: this.size + "px",
            },
            underStyle: {
                width: this.size + "px",
                height: this.size + "px",
                backgroundColor: "none",
                borderLeft: "none",
                borderRight: "none",
                marginTop: Math.ceil(this.size * 0.07) + "px",
                borderRadius: Math.ceil(this.size * 0.045) + "px",
            },
            tileStyle: {
                width: this.size + "px",
                height: this.size + "px",
                backgroundColor: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "none",
                borderRadius: Math.ceil(this.size * 0.07) + "px",
            },
            overStyle: {
                width: Math.ceil(this.size * 0.82) + "px",
                height: Math.ceil(this.size * 0.9) + "px",
                backgroundColor: "none",
                marginTop: -Math.ceil(this.size * 0.15) + "px",
                borderRadius: Math.ceil(this.size * 0.045) + "px",
            }
        }
    },
    mounted(){
        this.setColors();
    },
}
</script>

<style scoped>
.cell{
    display: grid;
}
.inner-cell-under
{
    grid-column: 1;
    grid-row: 1;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    /* margin-top: 5px; */
}
.inner-cell-over
{
    grid-column: 1;
    grid-row: 1;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.inner-cell-over-all
{
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    align-self: center;
    /* margin-top: -5px; */
}
</style>