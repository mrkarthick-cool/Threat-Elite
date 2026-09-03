// Threat-Elite Unlimited API - All-in-One Backend
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { ip, domain } = req.query;
  const target = ip || domain || '8.8.8.8';

  try {
    // OTX AlienVault Free API
    const otx = await fetch(`https://otx.alienvault.com/api/v1/indicators/IPv4/${target}/general`)
      .then(r => r.json()).catch(()=>({}));

    res.json({
      success: true,
      tool: "Threat-Elite Unlimited",
      target: target,
      threat_score: otx.pulse_info ? otx.pulse_info.count : 0,
      pulses: otx.pulse_info ? otx.pulse_info.pulses?.slice(0,3) : [],
      whois: otx.whois || "N/A",
      message: "Powered by TE"
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
