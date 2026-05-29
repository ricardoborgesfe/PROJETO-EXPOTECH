function StatsPanel({ efficiency, usedCapacity, selectedProducts }) {
  const totalUnits = selectedProducts.reduce((s, p) => s + (p.chosen_qty || 1), 0)
  const totalWeight = usedCapacity
  const avgPriority = selectedProducts.length
    ? (selectedProducts.reduce((s, p) => s + p.priority * (p.chosen_qty || 1), 0) / totalUnits).toFixed(1)
    : 0

  const stats = [
    { label: 'UNIDADES CARREGADAS', value: totalUnits, unit: 'un', color: '#4ade80' },
    { label: 'PESO TOTAL', value: totalWeight, unit: 'kg', color: '#60a5fa' },
    { label: 'PRIORIDADE MÉDIA', value: avgPriority, unit: 'pts', color: '#fbbf24' },
    { label: 'EFICIÊNCIA', value: `${efficiency}`, unit: '%', color: efficiency >= 70 ? '#4ade80' : efficiency >= 40 ? '#fbbf24' : '#f87171' },
  ]

  return (
    <div style={{ background: 'rgba(18,18,18,0.95)', border: '1px solid #2a2a2a', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #2a2a2a' }}>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.4rem', color: '#9ca3af', letterSpacing: '0.1em' }}>
          ESTATÍSTICAS
        </span>
      </div>

      <div style={{ padding: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {stats.map(({ label, value, unit, color }) => (
          <div key={label} style={{ padding: '8px 10px', borderRadius: '5px', background: '#111', border: '1px solid #222' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: '#6b7280', fontWeight: 700, letterSpacing: '0.04em', marginBottom: '4px' }}>{label}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.68rem', color, lineHeight: 1 }}>{value}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.58rem', color: '#4b5563', fontWeight: 600 }}>{unit}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div style={{ padding: '0 10px 10px' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: '#6b7280', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '6px' }}>
            TOP ITENS (por prioridade)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[...selectedProducts].sort((a, b) => b.priority - a.priority).slice(0, 3).map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '5px 8px', borderRadius: '4px', background: '#0e0e0e', border: '1px solid #1e1e1e' }}>
                <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.36rem', color: i === 0 ? '#fbbf24' : '#6b7280', width: '14px', flexShrink: 0 }}>#{i+1}</span>
                <img src={p.image} alt="" style={{ width: '22px', height: '22px', objectFit: 'contain', background: '#fff', borderRadius: '3px', padding: '1px', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.67rem', color: '#d1d5db', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.title.length > 18 ? p.title.slice(0, 18) + '…' : p.title}
                </span>
                <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.38rem', color: '#4ade80', flexShrink: 0 }}>×{p.chosen_qty}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StatsPanel