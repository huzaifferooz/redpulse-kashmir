const famBtn = document.getElementById('roleFamily');
  const provBtn = document.getElementById('roleProvider');
  [famBtn, provBtn].forEach(btn=>{
    btn.addEventListener('click', ()=>{
      famBtn.setAttribute('aria-pressed', btn===famBtn);
      provBtn.setAttribute('aria-pressed', btn===provBtn);
    });
  });

  const SUPABASE_URL = 'https://guygfafweunlnoxcddnr.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ob_-jGyV675Ufp6Hmk6efA_-z-02D_M';

  const form = document.getElementById('waitlistForm');
  const success = document.getElementById('formSuccess');
  const submitBtn = form.querySelector('.waitlist-submit');

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting…';

    const payload = {
      name: form.name.value,
      phone: form.phone.value,
      area: form.area.value,
      role: provBtn.getAttribute('aria-pressed') === 'true' ? 'provider' : 'patient'
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Submit failed');
      form.style.display = 'none';
      success.style.display = 'block';
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Notify me';
      alert('Something went wrong — please check your connection and try again.');
    }
  });
