import React from 'react'

type FamilyBadgeProps = {
    families?: string[]

}



function FamilyBadge({ families=[""] }:FamilyBadgeProps) {


    return (
        <>
           {families && families.map((family, i) => (
                <span 
                    key={i}
                    className="text-xs uppercase tracking-widest font-mono w-fit px-2 py-0.5 rounded-full"
                    style={{ color: "#6b7280" }}
                >
                    {family}
                </span>
            ))}
        </>
    )
}

export default FamilyBadge
