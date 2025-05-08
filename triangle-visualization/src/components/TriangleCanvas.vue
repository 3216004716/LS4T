<script setup lang="ts">
import * as d3 from 'd3'
import { ref, onMounted, watch } from 'vue'

interface Triangle {
  id: number
  size: number
  color: string
  x?: number
  y?: number
}

const props = defineProps<{
  triangles: Triangle[]
  spacing: number
}>()

const svgRef = ref<SVGSVGElement | null>(null)

function drawTriangles() {
  if (!svgRef.value) return

  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()

  const { width } = svgRef.value.getBoundingClientRect()
  const centerX = width / 2
  let currentY = props.spacing

  // Process triangles and calculate right mid points
  const triangles = props.triangles.map(d => {
    const halfSize = d.size / 2
    const points = [
      [centerX, currentY], // Top point
      [centerX - halfSize, currentY + d.size], // Bottom left 
      [centerX + halfSize, currentY + d.size] // Bottom right
    ]
    const rightMid: [number, number] = [
      centerX + halfSize/2, 
      currentY + d.size/2
    ]
    const triangle = {
      points,
      rightMid,
      size: d.size,
      color: d.color,
      id: d.id
    }
    currentY += d.size + props.spacing
    return triangle
  })

  // Draw triangles
  svg
    .selectAll('polygon')
    .data(triangles)
    .enter()
    .append('polygon')
    .attr('points', d => d.points.map(p => p.join(',')).join(' '))
    .attr('fill', d => d.color)
    .attr('stroke', '#000')
    .attr('stroke-width', 1)
    .on('mouseover', function() {
      d3.select(this).attr('stroke-width', 3)
    })
    .on('mouseout', function() {
      d3.select(this).attr('stroke-width', 1)
    })

  // Draw perfectly symmetrical C-shaped arcs
  for (let i = 0; i < triangles.length - 1; i++) {
    const current = triangles[i]
    const next = triangles[i+1]
    
    const sizeDiff = Math.abs(next.size - current.size)
    const arcHeight = sizeDiff * 1.5
    const arcX = current.rightMid[0] + arcHeight
    
    // 对称控制点
    const cp1y = current.rightMid[1] + (next.rightMid[1] - current.rightMid[1]) * 0.25
    const cp2y = current.rightMid[1] + (next.rightMid[1] - current.rightMid[1]) * 0.5
    const cp3y = current.rightMid[1] + (next.rightMid[1] - current.rightMid[1]) * 0.75
    
    // 创建对称路径
    const pathStr = `M${current.rightMid[0]},${current.rightMid[1]}
                   C${arcX},${cp1y} ${arcX},${cp2y} ${arcX},${cp2y}
                   C${arcX},${cp3y} ${next.rightMid[0]},${next.rightMid[1]} ${next.rightMid[0]},${next.rightMid[1]}`

    svg.append('path')
      .attr('d', pathStr)
      .attr('fill', 'none')
      .attr('stroke', '#888')
      .attr('stroke-width', 1)
  }
}

onMounted(drawTriangles)
watch(() => props.triangles, drawTriangles)
watch(() => props.spacing, drawTriangles)
</script>

<template>
  <svg ref="svgRef" width="100%" height="100%"></svg>
</template>
