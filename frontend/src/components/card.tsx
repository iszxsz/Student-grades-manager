import { Box, Card as MuiCard, CardContent, Typography } from "@mui/material";

export function Card({ title, value }) {
    return (
        <MuiCard sx={{ minWidth: 100, marginBottom: 2 , flex: 1}}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{ fontSize: 13, color: 'gray' }}>
                    {title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontSize: 27, fontWeight: 'bold' }}>
                    {value}
                </Typography>
            </CardContent>
        </MuiCard>
    )
};