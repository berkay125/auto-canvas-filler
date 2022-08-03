import {onMounted, ref, type PropType, onUpdated} from "vue";


interface Chart {
    type: Type,
    list: number[]
    color?: string
}

enum Type {
    line = 'line',
    bar = 'bar',
}


export default {
    props: {
        chart: {
            type: Array as PropType<Chart[]>
        },
        w: {
            type: Number,
            required: true
        },
        h: {
            type: Number,
            required: true
        }
    },
    setup(props: any) {
        let largest = 0;
        // @ts-ignore
        let myCanvas = ref<HTMLCanvasElement>(null)

        const drawBarChart = (ctx: CanvasRenderingContext2D) => {
            props.chart?.forEach((chart: any) => {
                chart.list.forEach((el: any) => {
                    if (largest < el) {
                        largest = el;
                    }
                });
                const constantForElement = props.h / largest
                if (chart.type == Type.bar) {

                    const barWidth = props.w / 20
                    ctx.fillStyle = chart.color;
                    for (let i = 0; i <= chart.list.length - 1; i++) {
                        const widthForBarElement = (props.w - chart.list.length * barWidth) / (chart.list.length * 2) * (2 * i + 1) + (barWidth * i)
                        ctx.fillRect(widthForBarElement, props.h, barWidth, -constantForElement * chart.list[i])
                    }
                }
            })
        }
        const drawLineChart = (ctx: CanvasRenderingContext2D) => {
            props.chart?.forEach((chart: any) => {
                chart.list.forEach((el: any) => {
                    if (largest < el) {
                        largest = el;
                    }
                });
                const constantForElement = props.h / largest
                if (chart.type == Type.line) {
                    const widthPerElement = props.w / (chart.list.length - 1)
                    for (let i = 0; i <= chart.list.length - 1; i++) {
                        if (i == 0) {
                            ctx.moveTo(widthPerElement * i, props.h - constantForElement * chart.list[i])
                        } else {
                            ctx.lineTo(widthPerElement * i, props.h - constantForElement * chart.list[i])
                        }
                    }
                    ctx.strokeStyle = chart.color;
                    ctx.stroke()

                }

            })

        }
        onMounted(() => {
            const ctx = myCanvas.value.getContext('2d') as CanvasRenderingContext2D
            drawBarChart(ctx)
            drawLineChart(ctx)
        })
        onUpdated(() => {
            const ctx = myCanvas.value.getContext('2d') as CanvasRenderingContext2D
            ctx.clearRect(0, 0, props.w, props.h)
            drawBarChart(ctx)
            drawLineChart(ctx)
        })
        return {
            myCanvas
        }
    }
}
