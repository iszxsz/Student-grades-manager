import { Box, Card as MuiCard, CardContent, Typography } from "@mui/material";

export function Card({ title, value }) {
    return (
        <MuiCard sx={{ 
            minWidth: 100, 
            marginBottom: 2, 
            flex: 1,
            borderRadius: '0.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: 'none'
        }}>
            <CardContent sx={{ padding: '1.5rem' }}>
                <Typography variant="body1" sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#64748b', marginBottom: '0.25rem' }}>
                    {title}
                </Typography>
                <Typography variant="h2" sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#0f172a' }}>
                    {value}
                </Typography>
            </CardContent>
        </MuiCard>
    )
};