import Link from "next/link"

interface LINKAPPPROPS {
  label?: string,
  icon?: string
}

export const LinkApp = ({ label, icon }: LINKAPPPROPS) => {
  return (
    <Link href='#'>
      <a>
        {label}
        {icon}
      </a>
    </Link>
  )
}

