<template>
    <div class="custom-box">
        {{ text }}
    </div>
</template>

<script setup lang="ts">
defineProps({
    text: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.custom-box {
    background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-quaternary) 100%);
    border-radius: var(--border-radius-lg);
    height: 2.5rem;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0 1rem;
    width: 100%;
    color: var(--text-primary);
    border: 1px solid var(--border-light);
    transition: var(--transition-fast);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
}

.custom-box:hover {
    background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
    transform: translateY(-1px) scale(1.02);
    box-shadow: var(--shadow-md), 0 0 15px rgba(59, 130, 246, 0.4);
    color: var(--text-primary);
}

.custom-box:active {
    transform: translateY(0) scale(1);
    transition: var(--transition-fast);
}
</style>